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

exports = module.exports = {};
module.exports.forEach = forEach;