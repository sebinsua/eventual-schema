"use strict";

var should = require('chai').should(),
    sinon = require('sinon');

var EventualSchema = require('../');

describe("EventualSchema", function () {

  describe('#constructor', function () {

    it('should set its defaults correctly', function () {
      var eventualSchema = new EventualSchema();
      eventualSchema._instantiatedDate.should.be.instanceof(Date);
      eventualSchema._instanceCount.should.be.equal(0);
      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema._rules.should.be.eql([]);
      should.not.exist(eventualSchema._eventualSchema);
      eventualSchema.frozen.should.be.false;
    });

    it('should take a list of rules', function () {
      var someRule = function () {},
          rules = [someRule];
      var eventualSchema = new EventualSchema(rules);
      eventualSchema._rules.should.be.eql(rules);
    });

    it('should not accept a rules object which does not resemble a list of functions', function () {
      var someRule = 'not-a-rule',
          rules = [someRule];
      (function () {
        var eventualSchema = new EventualSchema(rules);
      }).should.throw(Error, "EventualSchema's rules argument should only be passed a list of functions.");
    });

  });

  describe('#initEventualSchema', function () {
    var eventualSchema;
    beforeEach(function () {
      eventualSchema = new EventualSchema();
    });
    
    it('should set frozen to false and an empty object against _eventualSchema by default', function () {
      eventualSchema.initEventualSchema();
      should.not.exist(eventualSchema._eventualSchema);
      eventualSchema.frozen.should.be.false;
    });

    it('should be able to set frozen to true and set _eventualSchema if that is the case', function () {
      var schema = {
        a: { _propertyCount: 5 }
      };
      eventualSchema.initEventualSchema(schema, true);
      eventualSchema._eventualSchema.should.be.eql(schema);
      eventualSchema.frozen.should.be.true;
    });

  });

  describe('#_checkIfFrozen', function () {
    var eventualSchema;
    beforeEach(function () {
      eventualSchema = new EventualSchema();
    });

    it('should throw an exception if the property frozen is set to true', function () {
      eventualSchema.frozen = true;
      (function () {
        eventualSchema._checkIfFrozen();
      }).should.throw(Error, "Once frozen EventualSchema#get() is the only callable method.");
    });

    it('should not throw an exception if the property frozen is set to false', function () {
      eventualSchema.frozen = false;
      (function () {
        eventualSchema._checkIfFrozen();
      }).should.not.throw(Error, "Once frozen EventualSchema#get() is the only callable method.");
    });

  });

  describe('#get', function () {
    var eventualSchema;
    beforeEach(function () {
      eventualSchema = new EventualSchema();
    });
    
    it('should throw an exception if the property frozen is set to false', function () {
      eventualSchema.frozen = false;
      (function () {
        eventualSchema.get();
      }).should.throw(Error, "You cannot get the _eventualSchema until the necessary rules have been passed.");
    });

    it('should return a valid eventualSchema if frozen is set to true', function () {
      eventualSchema.frozen = true;
      eventualSchema._eventualSchema = { a: 5 };
      var es;
      (function () {
        es = eventualSchema.get();
      }).should.not.throw(Error, "You cannot get the _eventualSchema until the necessary rules have been passed.");
      es.should.eql({ a: 5 });
    });

  });

  describe('#add', function () {
    var eventualSchema;
    beforeEach(function () {
      var oneRuleToFreeze = function checkCount() { return this._instanceCount >= 5; }
      eventualSchema = new EventualSchema([oneRuleToFreeze]);
    });

    it('should throw an exception if the property frozen is set to true', function () {
      eventualSchema.frozen = true;
      (function () {
        eventualSchema.add({});
      }).should.throw(Error, "Once frozen EventualSchema#get() is the only callable method.");
    });

    it('should set to the first instance with a propertyCount of one', function () {
      var instance = {
        a: {
          b: 'word',
          c: 11
        }
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema._collatedInstances.should.eql({
        a: {
          _propertyCount: 1,
          b: {
            _propertyCount: 1
          },
          c: {
            _propertyCount: 1
          }
        }
      });
    });

    it('should collate the instances and increase the properties count', function () {
      var instance = {
        a: {
          b: 'word',
          c: 11
        }
      };
      var otherInstance = {
        a: {
          notB: {
            type: 'giraffe'
          },
          c: 5
        }
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema.add(otherInstance);
      eventualSchema._collatedInstances.should.eql({
        a: {
          _propertyCount: 2,
          b: {
            _propertyCount: 1
          },          
          notB: {
            _propertyCount: 1,
            type: {
              _propertyCount: 1
            }
          },
          c: {
            _propertyCount: 2
          }
        }
      });
    });

    it("should accept an array of non-enumerables and do its thing", function () {
      var instance = {
        arr: [ 1, 2, 3 ]
      };
      var otherInstance = {
        arr: [ 4, 5, 6 ]
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema.add(otherInstance);

      eventualSchema._collatedInstances.should.eql({
        arr: {
          _propertyCount: 2
        }
      });
    });

    it("should accept an array of objects and property count correctly", function () {
      var instance = {
        arr: [ { name: 'wtf' }, { name: 'wtf' } ]
      };
      var otherInstance = {
        arr: [ { name: 'wtf' }, { name: 'wtf' }, { name: 'wtf' } ]
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema.add(otherInstance);

      // The behaviour might not be expected, but it is that the property name increases with the rate it appears in arrays
      // and not just the rate in which it appears in a per-instance array.
      // This may change in future - I hadn't meant for this to be the case originally.
      eventualSchema._collatedInstances.should.eql({
        arr: {
          _arrayObjects: {
            name: { _propertyCount: 5 }
          },
          _propertyCount: 2
        }
      });
    });

    it('should increase property counts correctly when they belong to objects within arrays', function () {
      var instance = {
        a: {
          arrOfObjs: [
            { name: 'seb', type: 'engineer' },
            { name: 'seth', type: 'writer' },
            { name: 'bry', type: 'psychiatrist' }
          ],
          c: 11
        },
        array: [1, 2, 3],
        deep: {
          arr: [ { deeper: 5, deepest: [ { key: 'is here' } ] }, { deeper: 5 } ]
        }
      };
      var otherInstance = {
        a: {
          c: 5
        }
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema.add(otherInstance);

      eventualSchema._collatedInstances.should.eql({
        a: {
          _propertyCount: 2,
          arrOfObjs: {
            _propertyCount: 1,
            _arrayObjects: { name: { _propertyCount: 3 }, type: { _propertyCount: 3 } }
          },
          c: {
            _propertyCount: 2
          }
        },
        array: { _propertyCount: 1 },
        deep: {
          _propertyCount: 1,
          arr: {
            _propertyCount: 1,
            _arrayObjects: {
              deeper: { _propertyCount: 2 },
              deepest: {
                _propertyCount: 1,
                _arrayObjects: {
                  key: { _propertyCount: 1 }
                }
              }
            }
          }
        }
      });
    });

    it('array of objects, adding on properties to each other multiple times', function () {
      var instance = {
        arr: [
          { name: 'Thing', type: 'word', category: { name: 'Abstractions', type: 'general', tags: [ { name: 'these confuse people' }] } },
          { name: 'Thingamajig', type: 'word', tag: ['legit'], category: { name: 'Abstractions' } }
        ]
      };
      var otherInstance = {
        arr: [
          { name: 'Thing', type: 'word' },
          { name: 'Giraffe', type: 'long-necked animal', category: { name: 'Animals' }}
        ]
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema.add(otherInstance);

      eventualSchema._collatedInstances.should.eql({
        arr: {
          _arrayObjects: {
            name: { _propertyCount: 4 },
            type: { _propertyCount: 4 },
            category: {
              name: { _propertyCount: 3 },
              type: { _propertyCount: 1 },
              tags: {
                _arrayObjects: {
                  name: { _propertyCount: 1 }
                },
                _propertyCount: 1
              },
              _propertyCount: 3
            },
            tag: { _propertyCount: 1 }
          },
          _propertyCount: 2
        }
      });
    });

    it('should increase the instance count by one on adding an instance', function () {
      var instance = {
        a: {
          b: 'word',
          c: 11
        }
      };

      should.not.exist(eventualSchema._collatedInstances);
      eventualSchema.add(instance);
      eventualSchema._instanceCount.should.equal(1);
    });

    it('should correctly increase the property count of the eventual schema by a number of properties', function () {
      var instance = {
        a: {
          b: 'word',
          c: 11,
          d: {
            e: 14,
            f: {
              g: [ { name: 'hey', code: 'hi' }, { code: 'hi', name: 'hey', type: 'mystery' }, { code: 'hi', name: 'hey', type: 'mystery' } ]
            }
          }
        }
      };
      var otherInstance = {
        a: {},
        z: {
          code: 'hey'
        }
      }

      eventualSchema.add(instance);
      eventualSchema.add(instance);
      eventualSchema.add(instance);
      eventualSchema.add(instance);
      eventualSchema.add(otherInstance);
      eventualSchema._propertyCount.should.equal(12);
    });

    it('should not freeze the EventualSchema by default', function () {
      var freezeSpy = sinon.spy();
      eventualSchema.freeze = freezeSpy;
      
      var instance = {
        a: {
          b: 'word',
          c: 11
        }
      };

      eventualSchema.add(instance);

      freezeSpy.called.should.be.false;
    });

    it('should freeze the EventualSchema if _isReadyToFreeze responds with true', function () {
      var freezeSpy = sinon.spy();
      eventualSchema._freeze = freezeSpy;
      
      var instance = {
        a: {
          b: 'word',
          c: 11
        }
      };

      eventualSchema.add(instance);
      eventualSchema.add(instance);
      eventualSchema.add(instance);
      eventualSchema.add(instance);
      eventualSchema.add(instance);

      freezeSpy.called.should.be.true;
    });

  });

  describe('#_isReadyToFreeze', function () {
    var eventualSchema;
    beforeEach(function () {
      var checkContext = function (ctx) { return !!ctx.key; },
          checkDate = function () { return new Date() > this._instantiatedDate; },
          checkCount = function () { return this._instanceCount >= 10; };
      eventualSchema = new EventualSchema([checkContext, checkDate, checkCount]);
    });

    it('should be able to execute the list of rules against the correct contexts to return false', function () {
      eventualSchema._isReadyToFreeze().should.be.false;
    });

    it('should be able to execute the list of rules against the correct contexts to return true', function () {
      var today = new Date();
      eventualSchema._instanceCount = 10;
      eventualSchema._instantiatedDate = new Date(today.setDate(today.getDate() - 7));
      eventualSchema._isReadyToFreeze({ key: true }).should.be.true;
    });

  });

  describe('#freeze', function () {
    var eventualSchema;
    beforeEach(function () {
      eventualSchema = new EventualSchema();
    });
    
    it('should throw an exception if the property frozen is set to true', function () {
      eventualSchema.frozen = true;
      (function () {
        eventualSchema.freeze();
      }).should.throw(Error, "Once frozen EventualSchema#get() is the only callable method.");
    });

    it('should generate a _eventualSchema on execution', function () {
      var generateSpy = sinon.spy();
      eventualSchema._generateEventualSchema = generateSpy;
      eventualSchema.freeze();

      generateSpy.called.should.be.true;
    });

    it('should set frozen to true on execution', function () {
      eventualSchema.frozen.should.be.false;
      eventualSchema.freeze();
      eventualSchema.frozen.should.be.true;
    });

  });

  describe("#_generateEventualSchema", function () {
    var eventualSchema;
    beforeEach(function () {
      eventualSchema = new EventualSchema();
    });

    it('should generate a valid _eventualSchema from _collatedInstances', function () {
      var collatedInstances = {
        a: { _propertyCount: 3 },
        b: { _propertyCount: 5 }
      };
      eventualSchema._generateEventualSchema(collatedInstances).should.eql(collatedInstances);
    });

  });

});