"use strict";

var utils = require('./lib/utils'),
    extend = utils.extend,
    forEach = utils.forEach,
    isEnumerable = utils.isEnumerable,
    isArrayOfObjects = utils.isArrayOfObjects,
    isArrayOfFunctions = utils.isArrayOfFunctions,
    isArrayOfNonEnumerables = utils.isArrayOfNonEnumerables;

// An eventual schema exists for a key-value object.
var EventualSchema = function (rules) {
  this._instantiatedDate = new Date();
  this._instanceCount = 0;

  this._collatedInstances = {};

  this._rules = (rules && this._checkRules(rules)) || [];

  this.initEventualSchema();
};

EventualSchema.prototype._checkRules = function (rules) {
  var isRulesListOfFunctions = isArrayOfFunctions(rules);
  if (!isRulesListOfFunctions) {
    throw new Error("EventualSchema's rules argument should only be passed a list of functions.");
  }

  return rules;
};

EventualSchema.prototype.initEventualSchema = function (eventualSchema, isFrozen) {
  this._eventualSchema = null;
  this.frozen = false;
  
  if (isFrozen) {
    this._eventualSchema = eventualSchema || {};
    this.frozen = isFrozen;
  }
};

EventualSchema.prototype.get = function () {
  if (!this.frozen) {
    throw new Error("You cannot get the _eventualSchema until the necessary rules have been passed.");
  }
  return this._eventualSchema;
};

// It does have to recurse when adding.
// 
// Given three of these:
// ```json
// {
//   a: {
//     num: 7,
//     arr: []
//   },
//   b: {
//       arr: [
//         {
//             name: 'hello world'
//         }
//       ],
//       value: {
//         type: 'person',
//         name: 'gilly'
//       }
//   },
//   c: {
//     arr: []
//   }
// }
// ```
// Create this:
// ```json
// {
//   a: {
//     _propertyCount: 3,
//     num: { _propertyCount: 3 },
//     arr: { _propertyCount: 3 }
//   },
//   b: {
//     _propertyCount: 3,
//     arr: [
//       {
//         name: { _propertyCount: 3 }
//       }
//     ],
//     value: {
//       _propertyCount: 3,
//       type: { _propertyCount: 3 },
//       name: { _propertyCount: 3 }
//     }
//   },
//   c: {
//     _propertyCount: 3,
//     arr: { _propertyCount: 3 }
//   }
// }
// ```
// I chose this representation because even-though I need to recurse to create it, 
// when I try to recurse later on to simplify the structure I can do so easily.
// It also allows more information and does not impart a syntax onto the idea of deep
// property hierarchies and is therefore generalised to more use-cases.
EventualSchema.prototype.add = function (instance) {
  this._checkIfFrozen();

  this._eventualSchema = this._addInstance(this._eventualSchema, instance);
  this._instanceCount += 1;

  if (this._isReadyToFreeze()) {
    this._freeze();
  }

  return this;
};

EventualSchema.prototype.freeze = function () {
  this._checkIfFrozen();

  this._freeze();

  return this;
};

EventualSchema.prototype._checkIfFrozen = function () {
  if (this.frozen) {
    throw new Error("Once frozen EventualSchema#get() is the only callable method.");
  }
};

EventualSchema.prototype._addInstance = function (eventualSchema, instance) {
  var self = this;

  eventualSchema = eventualSchema || {};

  if (!isEnumerable(instance)) {
    return eventualSchema;
  }

  forEach(instance, function (instanceValue, instanceKey) {
    var currentEventualSchemaLevel = eventualSchema[instanceKey];
    if (isArrayOfObjects(instanceValue)) {
      var _insideArrayObjects = self._addInstance(currentEventualSchemaLevel, instanceValue);
      
      var objs = [{}];
      forEach(_insideArrayObjects, function (v) {
        objs.push(v);
      });
      var _arrayObjects = extend.apply(extend, objs);
      delete _arrayObjects._propertyCount;

      currentEventualSchemaLevel = {};
      currentEventualSchemaLevel._arrayObjects = _arrayObjects;
    } else if (isArrayOfNonEnumerables(instanceValue)) {
      // e.g. [1, 2, 4] or ['word', 'hey', 'this was a bit of work']
      currentEventualSchemaLevel = {};
    } else {
      // Normal values and enumerables may be treated in the same way...
      currentEventualSchemaLevel = self._addInstance(currentEventualSchemaLevel, instanceValue);
    }
    currentEventualSchemaLevel._propertyCount = currentEventualSchemaLevel._propertyCount + 1 || 1;

    eventualSchema[instanceKey] = currentEventualSchemaLevel;
  });

  return eventualSchema;
};

EventualSchema.prototype._isReadyToFreeze = function (ctx) {
  var self = this;

  ctx = ctx || {};
  
  var isReadyToFreeze = this._rules.reduce(function (acc, fn) {
    return acc && fn.call(self, ctx);
  }, true) || false;

  return isReadyToFreeze;
};

EventualSchema.prototype._freeze = function () {
  this._generateEventualSchema(this._collatedInstances);
  this.frozen = true;

  return this.frozen;
};

EventualSchema.prototype._generateEventualSchema = function (collatedInstances) {
  this._eventualSchema = collatedInstances;

  return this._eventualSchema;
};

exports = module.exports = EventualSchema;