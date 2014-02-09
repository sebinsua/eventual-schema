[eventual-schema](http://sebinsua.github.io/eventual-schema/)
===============

[![Build Status](https://travis-ci.org/sebinsua/eventual-schema.png)](https://travis-ci.org/sebinsua/eventual-schema)

Combine multiple objects into a record of property counts. Apply rules to describe when and how to freeze the result into a generalised schema of accepted properties.

Note
----

This was made for [express-keenio](https://github.com/sebinsua/express-keenio) and therefore the interfaces and data structure provided match what is expected by this. I might later on try to record other information into the structure and to allow it to generate schemas that could be used by some popular ORMs or request validators.

I've also heard that there has been academic research into this topic, but I could not for the life of me find it so I just created something fit for my purposes and nothing further.

Usage
-----

```javascript
var EventualSchema = require('eventual-schema');

var eventualSchema = new EventualSchema([function (ctx) { return this._instanceCount >= 5; }]);

console.log(eventualSchema.frozen);
// => false

eventualSchema.add({ a: { b: 7 }, c: 9 });
eventualSchema.add({ a: { b: 7 }, c: 9 });
eventualSchema.add({ a: { b: 7 }, c: 9 });
eventualSchema.add({ a: { b: 7 }, c: 9 });
eventualSchema.add({ a: { b: 7 }, c: 9 });

console.log(eventualSchema.frozen);
// => true

console.log(eventualSchema.get());
// =>
// { a: { _propertyCount: 5, b: { _propertyCount: 5 } }, c: { _propertyCount: 5 } }
```
