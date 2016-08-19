/**
  * Diagram service
  * 
  * Provides service for Diagram Model Operations through out the component.
  *
  * @class DiagramService
  * @author Brandon Sherette
  * @version 0.0.1
  * @since 0.0.1
  */
var DiagramService = (function (Model) {
  'use strict';

  // Define constant values to be used thorugh out this service
  var SHAPES = {
    CUBE: 'cube',
    SPHERE: 'sphere'
  };

  var DEFAULT_COLOR = '#538FC6';
  var DEFAULT_SHAPE = SHAPES.CUBE;

  // Return API
  return {
    /* Constant Like Values */
    DEFAULT_COLOR: DEFAULT_COLOR,
    DEFAULT_SHAPE: DEFAULT_SHAPE,
    SHAPES: SHAPES,
    /* Properties */
    _cache: null,
    _subscriptions: {},
    /* Methods */
    createModel: createModel,
    get: get,
    publish: publish,
    subscribe: subscribe,
    updateCache: updateCache,
    unsubscribe: unsubscribe
  };

  /**
   * Creates a new Model instance.
   * 
   * @method createModel
   * @return the newly created model instance.
   * @since 0.0.1
   */
  function createModel() {
    var model = new Model();

    // give model the default values provided by the service
    model.shape = DEFAULT_SHAPE;
    model.color = DEFAULT_COLOR;

    return model;
  }

  /**
   * Gets the currently cached model, otherwise creates a new instance.
   * 
   * TODO: Add functionality for page / model state.
   * 
   * @method get
   * @return {DiagramModel} an instance of DiagramModel.
   * @since 0.0.1
   */
  function get() {
    // TODO: Add functionality for fetching model state from localstorge / session

    // check to use the cached model or not
    if (!this._cache) {
      this._cache = this.createModel();
    }

    return this._cache;
  }

  /**
   * Publishes the specific type of subscription.
   * All subscriptions with the specified type will be called in the order they were added.
   * 
   * @method publish
   * @param {String} type the type of event to publish.
   * @chainable
   * @since 0.0.1
   */
  function publish(type, data) {
    var subs = this._subscriptions[type] || [];

    subs.forEach((sub) => {
      sub.callback.call(sub.context, data);
    });

    return this;
  }

  /**
   * Subscribes to the sevice's events.
   * This is a very basic version of pub / sub style of handling events.
   * 
   * Examples:
   *  DiagramService.subscribe('model:change', (model) => {
   *    // where model is the updated model
   *  }, this);
   * 
   * @method subscribe
   * @param {String} type the type of event to subscribe to.
   * @param {Function} callback the callback function to call if the specified event is triggered.
   * @param {Object} context the context in which the callback is being called upon (this is usually the 'this' keyword).
   * @return {Number} the id for the subscription, used to unsubscribe. 
   * @since 0.0.1
   */
  function subscribe(type, callback, context) {
    // check to see if already has a match
    var subs = this._subscriptions[type] || [];

    subs.push({
      callback: callback,
      context: context
    });

    // update subscriptions
    this._subscriptions[type] = subs;

    // for a temp and quick solution use the index the recently added callback
    return subs.length - 1;
  }

  /**
   * Unsubscribes to the service's events.
   * This is a very basic version of pub / sub style of handling events.
   * 
   * @method unsubscribe
   * @param {String} type the type of event to unsubscribe to.
   * @param {Number} id the id for the subscription to unsubscribe to.
   * @chainable
   * @since 0.0.1
   */
  function unsubscribe(type, id) {
    var subs = this._subscriptions[type] || null;

    if (!subs) {
      // no need to do anything since subscription didn't exist to begin with
      return this;
    }

    // make sure id is valid option, need better checking, but fine for now
    if (id >= 0 && id < subs.length) {
      subs.splice(id, 1);
    }

    return this;
  }

  /**
   * Updates the cache to the specified model.
   * Triggers:
   *  'model:changed' event.
   * 
   * @method updateCache
   * @param {Object} the model to update the cache to.
   * @chainable
   * @since 0.0.1
   */
  function updateCache(model) {
    this._cache = model;
    this.publish('model:change');
  }
} (DiagramModel));
