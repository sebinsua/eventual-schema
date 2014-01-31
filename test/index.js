"use strict";

var should = require('chai').should();

var EventualSchema = require('../');

/*
An eventual schema exists for one key-value object.

It does have to recurse when adding. If I can find out a way of stopping this I will, but alas I probably cannot escape it. So I document it.

Look into underscore deep.extend?
Python object counters?
JSON property counters?

What format is the data stored as first?

Given three of these: 

{
    a: {
        num: 7,
        arr: []
    },
    b: {
        arr: [
            {
                name: 'hello world'
            }
        ],
        value: {
            type: 'person',
            name: 'gilly'
        }
    },
    c: {
        arr: []
    }
}

Create this:

{
    a: {
        _propertyCount: 3,
        num: { _propertyCount: 3 },
        arr: { _propertyCount: 3 }
    },
    b: {
        _propertyCount: 3,
        arr: [
            {
                name: { _propertyCount: 3 }
            }
        ],
        value: {
            _propertyCount: 3,
            type: { _propertyCount: 3 },
            name: { _propertyCount: 3 }
        }
    },
    c: {
        _propertyCount: 3,
        arr: { _propertyCount: 3 }
    }
}

This representation is better because even-though I need to recurse to create it, when I try to recurse later on to simplify the structure based on rules I can do so easily. It also allows more information and does not impart a syntax onto the idea of deep property hierarchies and is therefore generalised to more use cases.

We don't create something like this (yet.):

{
    a.num: { _propertyCount: 3 },
    a.arr: { _propertyCount: 3 },
    b.arr[].name: { _propertyCount: 3 },
    b.arr[].types: { _propertyCount: 3 },
    b.value.type: { _propertyCount: 3 },
    b.value.name: { _propertyCount: 3 },
    c.arr: { _propertyCount: 3 }
}
*/

// The will be injected in anyways.
var hasMaximumProperties = function (eventualSchema) {
  var MAX_PROPERTIES = 30;
};

var isAboveMinPropertyCount = function (eventualSchema) {
  var MIN_PROPERTY_QUANTITY = 1;
};

var hasMaxInstances = function (routeSchema) {
  var NUMBER_OF_INSTANCES_BEFORE_FREEZE = 500;    
};

var isBeyondMaxNumberOfDates = function (routeSchema) {
  var NUMBER_OF_DAYS_BEFORE_FREEZE = 7;
};

describe("EventualSchema", function () {
  // These will get moved elsewhere, and tested elsewhere at some point.
  // @todo: Test simpler rules, and then test these rules elsewhere.
  // @todo: However be careful to let the rule execution interface pass in data that allows these.
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