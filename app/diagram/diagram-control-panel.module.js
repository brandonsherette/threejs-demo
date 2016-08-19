/**
 * Diagram Control Panel Module
 * 
 * Module for the control panel aspect of the Diagram Component.
 * Deals with any interactions from the user and publishes change events to the other modules.
 * 
 * @class DiagramControlPanelModule
 * @author Brandon Sherette
 * 
 * @version 0.0.1
 * @since 0.0.1
 */
var DiagramControlPanelModule = (function ($, service) {
  var _$el, _$colorSelector, _$confirmModal, _$confirmModalText, _$shapeSelector;
  var EL_SELECTOR = '#diagram-control-panel';
  var CONFIRM_MODAL_SELECTOR = '#select-confirm-modal';
  var CONFIRM_MODAL_TEXT_SELECTOR = '#select-confirm-text';

  // return API
  return {
    /* Properties */
    events: {
      '#select-color change': 'onSelectColor',
      '#select-shape change': 'onSelectShape',
      '#select-product click': 'onSelectProduct'
    },
    model: null,
    /* Methods */
    init: init,
    applyEventBindings: applyEventBindings,
    bindEvents: bindEvents,
    onSelectColor: onSelectColor,
    onSelectProduct: onSelectProduct,
    onSelectShape: onSelectShape,
    unbindEvents: unbindEvents
  };

  /**
   * Initializes the module and binds any events.
   * 
   * @method init
   * @chainable
   * @since 0.0.1
   */
  function init() {
    _$el = $(EL_SELECTOR);
    _$confirmModal = _$el.find(CONFIRM_MODAL_SELECTOR);
    _$confirmModalText = _$confirmModal.find(CONFIRM_MODAL_TEXT_SELECTOR);

    this.model = service.get();
    this.bindEvents();

    return this;
  }

  /**
   * Applys event binding to all the events.
   * 
   * @method applyEventBindings
   * @param bindingType determines if 'on' or 'off' should be called.
   * @chainable
   * @since 0.0.1
   */
  function applyEventBindings(bindingType) {
    for (let key in this.events) {
      // selector and events are separated by space
      let parts = key.split(' ');
      // first element will always be selector
      let selector = parts[0];
      // second element will always be the type of event
      let event = parts[1];
      // the method will be the value of the event
      let method = this.events[key];

      //console.info('selector: ' + selector + ' \n binding type: ' + bindingType + '\n event:' + event + '\n method: ' + method);
      _$el.find(selector)[bindingType](event, (event) => {
        this[method].call(this, event);
      });
    }

    return this;
  }

  /**
   * Binds this modules events.
   * 
   * @method bindEvents
   * @chainable
   * @since 0.0.1
   */
  function bindEvents() {
    this.applyEventBindings('on');

    return this;
  }

  /**
   * The event that the select color has been changed.
   * 
   * @method onSelectColor
   * @param {event} event the trigger event
   * @since 0.0.1
   */
  function onSelectColor(event) {
    var val = $(event.currentTarget).val();

    // TODO: add some validation
    this.model.color = val;
    service.publish('model:change', this.model);
  }

  /**
   * The event that the select button has been pressed.
   * 
   * @method onSelectProduct
   * @since 0.0.1
   */
  function onSelectProduct() {
    _$confirmModalText.text(JSON.stringify(this.model));
    _$confirmModal.modal();
  }

  /**
   * The event that the select shape has been changed.
   * 
   * @method onSelectShape
   * @param {event} event the trigger event
   * @since 0.0.1
   */
  function onSelectShape(event) {
    var val = $(event.currentTarget).val();

    // TODO: add some validation
    this.model.shape = val;
    service.publish('model:change', this.model);
  }

  /**
   * Unbind this modules events.
   * 
   * @method unbindEvents
   * @chainable
   * @since 0.0.1
   */
  function unbindEvents() {
    this.applyEventBinding('off');

    return this;
  }
} (jQuery, DiagramService));
