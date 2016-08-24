/**
 * Diagram Component
 * 
 * The base component that glues all the modules and services together.
 * 
 * @class DiagramComponent
 * @author Brandon Sherette
 * 
 * @version 0.0.1
 * @since 0.0.1
 */
var DiagramComponent = (function (DiagramControlPanelModule, DiagramModule) {
  // return API
  return {
    init: init
  };

  /**
   * Initializes the compenent. Also, initializes all the modules associated to the component.
   * 
   * @method init
   * @since 0.0.1
   */
  function init() {
    DiagramControlPanelModule.init();
    DiagramModule.init();
  }
} (DiagramControlPanelModule, DiagramModule));
