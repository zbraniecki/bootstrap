define(function() {
  function App(manifest, id) {
    this.manifest = manifest;
    this.id = id;
  }

  App.prototype.emit = function app_emit(type) {
    var event = new CustomEvent(type);
    this.window.dispatchEvent(event);
  }

  App.extend = function(subClass){
    subClass.prototype = Object.create(App.prototype);
    subClass.prototype.constructor = subClass;
  }

  return App;
});
