/**
 * Application bootsrap.
 * 
 * Initializes all components for the application.
 * 
 * @class App
 * @author Brandon Sherette
 * 
 * @version 0.0.1
 * @since 0.0.1
 */
var App = (function (DiagramComponent) {
  return {
    init: init
  };

  /**
   * Initializes the App and all application componenents.
   * 
   * @method init
   * @since 0.0.1
   */
  function init() {
    DiagramComponent.init();
  }
} (DiagramComponent));
