// See [underscore#forEach](http://underscorejs.org/docs/underscore.html#section-13)
var forEach = function (obj, iterator, context) {
  var nativeForEach = Array.prototype.forEach,
      breaker = {};

  var i, length;
  if (obj === null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    var keys = Object.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
    }
  }
};

// See [underscore#extend](http://underscorejs.org/docs/underscore.html#section-78)
var extend = function (obj) {
  var nativeSlice = Array.prototype.slice;
  forEach(nativeSlice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

var isArray = function (value) {
  return !!value && Object.prototype.toString.call(value) === '[object Array]';
};

var isObject = function (value) {
  return !!value && Object.prototype.toString.call(value) === '[object Object]';
};

var isEnumerable = function (value) {
  return isArray(value) || isObject(value);
};

var isFunction = function (value) {
  return !!value && Object.prototype.toString.call(value) === '[object Function]';
};

var isArrayOfFunctions = function (value) {
  return isArray(value) && !!value.length && value.map(isFunction).reduce(function (acc, value) { return acc && value; }, true);
};

var isArrayOfObjects = function (value) {
  return isArray(value) && !!value.length && value.map(isObject).reduce(function (acc, value) { return acc && value; }, true);
};

var isArrayOfNonEnumerables = function (value) {
  return isArray(value) && !!value.length && !value.map(isEnumerable).reduce(function (acc, value) { return acc && value; }, true);
};

exports = module.exports = {};
module.exports.extend = extend;
module.exports.forEach = forEach;
module.exports.isArray = isArray;
module.exports.isObject = isObject;
module.exports.isEnumerable = isEnumerable;
module.exports.isFunction = isFunction;
module.exports.isArrayOfFunctions = isArrayOfFunctions;
module.exports.isArrayOfObjects = isArrayOfObjects;
module.exports.isArrayOfNonEnumerables = isArrayOfNonEnumerables;