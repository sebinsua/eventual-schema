var EventualSchema = function () {
  this.MAX_QUERY_PROPERTIES = 30;
  this.MAX_INTENTION_BODY_PROPERTIES = 100;
  this.MAX_REACTION_PROPERTIES = 100;
  this.NUMBER_OF_REQUESTS_BEFORE_LOCK = 500;
  this.NUMBER_OF_DAYS_BEFORE_LOCK = 7;
  this.MIN_PROPERTY_QUANTITY = 1;

  this.schemaKeys = ['query', 'body', 'reaction'];

  this.data = {
        locked: false,
        schema: {
            query: {
                'property-name-a': 1,
                'property-name-b': 10,
                'property-name-c': 78
            },
            body: {
                'deep.property-name-d': 3,
                'deep.deeper.property-name-e': 77,
                'deep.deeper.property-name-f': 456
            },
            reaction: {
                'property-name-g': 101,
                'deep.deeper.deepest.property-name-h': 34,
                'property-name-i': 384
            }
        } 
    };
};

EventualSchema.prototype.save = function () {
    
};

EventualSchema.prototype.load = function () {
    
};

EventualSchema.prototype.get = function (routeName) {
    var eventualSchemaConfig = this._eventualSchemaConfig,
        eventualSchema = {};
    if (eventualSchemaConfig[routeName]) {

    }
    return eventualSchema;
}

EventualSchema.prototype.add = function (instance) {
    
};


