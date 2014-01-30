"use strict";

var forEach = require('./lib/utils').forEach;

var EventualSchema = function (rules) {
  this._collatedInstances = {};

  this._rules = rules || [];

  this._eventualSchema = null;
  this.frozen = false;
};

EventualSchema.prototype.initEventualSchema = function (eventualSchema, isFrozen) {
  if (isFrozen) {
    this._eventualSchema = eventualSchema || {};
    this.frozen = isFrozen;
  }
}

EventualSchema.prototype._checkIfFrozen = function () {
    if (this.frozen) {
        throw new Error("Once frozen EventualSchema#get() is the only callable method.")
    }
};

EventualSchema.prototype.get = function (routeName) {
    if (!this.frozen) {
        throw new Error("You cannot get the _eventualSchema until the necessary rules have been passed.");
    }
    return this._eventualSchema;
}

EventualSchema.prototype.add = function (instance) {
    this._checkIfFrozen();

    // Place instance inside the data.
};

EventualSchema.prototype._flattenProperties = function (obj, propertyDelimiter, arrayIdentifier) {
    // Nested with . and []
    delimiter = delimiter || '.';
    arrayIdentifier = arrayIdentifier || '[]';
};

EventualSchema.prototype._isReadyToFreeze = function () {
    return false;
};

EventualSchema.prototype.freeze = function () {
    this._checkIfFrozen();
};

EventualSchema.prototype._generateEventualSchema = function (collatedInstances) {

};

exports = module.exports = EventualSchema;