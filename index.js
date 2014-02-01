"use strict";

var utils = require('./lib/utils'),
    forEach = utils.forEach,
    isArrayOfFunctions = utils.isArrayOfFunctions;

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

EventualSchema.prototype._checkIfFrozen = function () {
  if (this.frozen) {
    throw new Error("Once frozen EventualSchema#get() is the only callable method.");
  }
};

EventualSchema.prototype.get = function (routeName) {
  if (!this.frozen) {
    throw new Error("You cannot get the _eventualSchema until the necessary rules have been passed.");
  }
  return this._eventualSchema;
};

EventualSchema.prototype.add = function (instance) {
  this._checkIfFrozen();

  // Place instance inside the data.
};

/*
todo: Move to the route thing in keenio.
EventualSchema.prototype._flattenProperties = function (obj, propertyDelimiter, arrayIdentifier) {
    // Nested with . and []
    delimiter = delimiter || '.';
    arrayIdentifier = arrayIdentifier || '[]';
};
*/

EventualSchema.prototype._isReadyToFreeze = function () {
  return false;
};

EventualSchema.prototype.freeze = function () {
  this._checkIfFrozen();

  this._generateEventualSchema(this._collatedInstances);
  this.frozen = true;
};

EventualSchema.prototype._generateEventualSchema = function (collatedInstances) {
  this._eventualSchema = collatedInstances;
};

exports = module.exports = EventualSchema;