eventual-schema
===============

[![Build Status](https://travis-ci.org/sebinsua/eventual-schema.png)](https://travis-ci.org/sebinsua/eventual-schema)

Combine multiple objects into a record of the most-used properties. Apply rules to describe when and how to freeze the result into a generalised schema of accepted properties.

Note
----

Currently this is only in use by [express-keenio](https://github.com/sebinsua/express-keenio) and therefore the interfaces and data structure provided match what is expected by this. I might later on try to record other information into the structure and to allow it to generate schemas that could be used by some popular ORMs.

Additionally, I do not think that my approach is very good. I have heard that there has been academic research into this topic, but I could not for the life of me find it so I just created something fit for my purposes and nothing further.