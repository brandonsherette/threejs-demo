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
var DiagramControlPanelModule = (function ($, DiagramService) {
  var _$el, _$colorSelector, _$confirmModal, _$confirmModalText;
  var _$selectColor, _$selectShape, _$selectTexture;

  var EL_SELECTOR = '#diagram-control-panel';

  var CONFIRM_MODAL_SELECTOR = '#select-confirm-modal';
  var CONFIRM_MODAL_TEXT_SELECTOR = '#select-confirm-text';
  var SELECT_COLOR_SELECTOR = '#select-color';
  var SELECT_SHAPE_SELECTOR = '#select-shape';
  var SELECT_TEXTURE_SELECTOR = '#select-texture';

  // return API
  return {
    /* Properties */
    events: {
      '#select-color change': 'onSelectColor',
      '#select-shape change': 'onSelectShape',
      '#select-texture change': 'onSelectTexture',
      '#select-product click': 'onSelectProduct'
    },
    model: null,
    /* Methods */
    init: init,
    applyEventBindings: applyEventBindings,
    bindElements: bindElements,
    bindEvents: bindEvents,
    buildDynamicHtmlComponents: buildDynamicHtmlComponents,
    buildDynamicSelectColorHtml: buildDynamicSelectColorHtml,
    buildDynamicSelectShapeHtml: buildDynamicSelectShapeHtml,
    buildDynamicSelectTextureHtml: buildDynamicSelectTextureHtml,
    onSelectColor: onSelectColor,
    onSelectProduct: onSelectProduct,
    onSelectShape: onSelectShape,
    onSelectTexture: onSelectTexture,
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
    this.bindElements();
    this.buildDynamicHtmlComponents();

    this.model = DiagramService.get();
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
   * Binds the elements for this module.
   * 
   * @method bindElements
   * @chainable
   * @since 0.0.1
   */
  function bindElements() {
    _$el = $(EL_SELECTOR);
    _$confirmModal = _$el.find(CONFIRM_MODAL_SELECTOR);
    _$confirmModalText = _$confirmModal.find(CONFIRM_MODAL_TEXT_SELECTOR);
    _$selectColor = _$el.find(SELECT_COLOR_SELECTOR);
    _$selectShape = _$el.find(SELECT_SHAPE_SELECTOR);
    _$selectTexture = _$el.find(SELECT_TEXTURE_SELECTOR);

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
   * Builds out the dynamic html component elements for this module.
   * 
   * @method buildDynamicHtmlComponents
   * @chainable
   * @since 0.0.1
   */
  function buildDynamicHtmlComponents() {
    this.buildDynamicSelectShapeHtml();
    this.buildDynamicSelectTextureHtml();
    this.buildDynamicSelectColorHtml();

    return this;
  }

  /**
   * Builds out the dynamic html option for the select color select element.
   * 
   * @method buildDynamicSelectColorHtml
   * @chainable
   * @since 0.0.1
   */
  function buildDynamicSelectColorHtml() {
    var html = '';

    for (key in DiagramService.COLORS) {
      let color = DiagramService.COLORS[key];

      html += '<option value="' + key + '">' + color.name + '</option>';
    }

    _$selectColor.html(html);

    return this;
  }

  /**
   * Dynamically builds out the option html for the select shape element.
   * 
   * @method buildDynamicSelectShapeHtml
   * @chainable
   * @since 0.0.1
   */
  function buildDynamicSelectShapeHtml() {
    var html = '';

    for (key in DiagramService.SHAPES) {
      let shape = DiagramService.SHAPES[key];

      html += '<option value="' + key + '">' + shape.name + '</option>';
    }

    _$selectShape.html(html);

    return this;
  }

  /**
   * Builds out the dynamic html options for the select texture select element.
   * 
   * @method buildDynamicSelectTextureHtml
   * @chainable
   * @since 0.0.1
   */
  function buildDynamicSelectTextureHtml() {
    var html = '';

    for (key in DiagramService.TEXTURES) {
      let texture = DiagramService.TEXTURES[key];

      html += '<option value="' + key + '">' + texture.name + '</option>';
    }

    _$selectTexture.html(html);

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
    this.model.color = DiagramService.COLORS[val] || DiagramService.DEFAULT_COLOR;
    // let all the modules know that the model has been changed
    DiagramService.publish('model:change', this.model);
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
   * The event that the select shape option has been changed.
   * 
   * @method onSelectShape
   * @param {Event} event the triggered event
   * @since 0.0.1
   */
  function onSelectShape(event) {
    var val = $(event.currentTarget).val();

    this.model.shape = DiagramService.SHAPES[val] || DiagramService.DEFAULT_SHAPE;
    // let all the modules know that the model has been changed
    DiagramService.publish('model:change', this.model);
  }

  /**
   * The event that the select texture has been changed.
   * 
   * @method onSelectTexture
   * @param {event} event the triggered event
   * @since 0.0.1
   */
  function onSelectTexture(event) {
    var val = $(event.currentTarget).val();

    // revert to default value if texture was not found
    this.model.texture = DiagramService.TEXTURES[val] || DiagramService.DEFAULT_TEXTURE;
    // let all the modules know that the model has been changed
    DiagramService.publish('model:change', this.model);
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
