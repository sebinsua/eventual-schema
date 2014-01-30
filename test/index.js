"use strict";

var should = require('chai').should();

var EventualSchema = require('../');

/*

1. How to create route schemas.
   Create rules for query, body and reaction:
     Make sure each of the rules passed in is generated with the correct options.
   On executing a route for the first time create a route schema which is just a key-value entry containing this:
  this._instantiatedDate = new Date();
  this._instanceCount = 0;
  and

    {
        query: new EventualSchema(ruleConfig),
        body: new EventualSchema(ruleConfig),
        reaction: new EventualSchema(ruleConfig)
    }
2. This RouteSchema thing should have its own add method, it's own rules, etc.
var hasMaxInstances = function (eventualSchema) {
  var NUMBER_OF_INSTANCES_BEFORE_FREEZE = 500;    
};

var isBeyondMaxNumberOfDates = function (eventualSchema) {
  var NUMBER_OF_DAYS_BEFORE_FREEZE = 7;
};


There should be a methdo which gets out lists, with something like this:

Object.keys(eventualSchema.get())

This is somewhere else.
EventualSchema.prototype.save = function () {
    
};

var collatedInstances = {
 'property-name-a': {
  propertyCount: 1
},
'property-name-b': {
  propertyCount: 10
},
'property-name-c': {
  propertyCount: 78
}
};

*/

var hasMaximumProperties = function (eventualSchema) {
  var MAX_PROPERTIES = 30;
};

var isAboveMinPropertyCount = function (eventualSchema) {
  var MIN_PROPERTY_QUANTITY = 1;
};

describe("EventualSchema", function () {
  // These will get moved elsewhere, and tested elsewhere at some point.
  var rules = [hasMaximumProperties, hasMaxInstances, isAboveMinPropertyCount, isBeyondMaxNumberOfDates];

  describe('#constructor', function () {

    it('should set its defaults correctly', function () {

    });

    it('should take a list of rules', function () {

    });

    it('should not accept a rules object which does not resemble a list of functions', function () {

    });

  });

  describe('#initEventualSchema', function () {
    
    it('should set frozen to false and an empty object against _eventualSchema by default', function () {

    });

    it('should be able to set frozen to true and set _eventualSchema if that is the case', function () {

    });

  });

  describe('#_checkIfFrozen', function () {

    it('should throw an exception if the property frozen is set to true', function () {

    });

    it('should not throw an exception if the property frozen is set to false', function () {

    });

  });

  describe('#get' function () {
    
    it('should throw an exception if the property frozen is set to false', function () {

    });

    it('should return a valid eventualSchema if frozen is set to true', function () {

    });

  });

  describe('#add', function () {
 
    it('should set to the first instance with a propertyCount of one', function () {

    });

    it('should collate the instances and increase the properties count', function () {

    });

    it('should increase the instance count by one on adding an instance', function () {

    });

    it('should not freeze the EventualSchema by default', function () {

    });

    it('should freeze the EventualSchema if _isReadyToFreeze responds with true', function () {

    });

  });

  describe('#_flattenProperties', function () {

    it('should flatten properties given a nested object', function () {

    });

    it('should flatten properties including arrays with a special notation given a nested object', function () {

    });

  });

  describe('#_isReadyToFreeze', function () {

    it('should be able to execute the list of rules against the correct contexts to return false', function () {

    });

    it('should be able to execute the list of rules against the correct contexts to return true', function () {

    });

  });

  describe('#freeze', function () {
    
    it('should throw an exception if the property frozen is set to true', function () {

    });

    it('should generate a _eventualSchema on execution', function () {

    });

    it('should set frozen to true on execution', function () {

    });

  });

  describe("#_generateEventualSchema", function () {

    it('should generate a valid _eventualSchema from _collatedInstances', function () {

    });

  });

});