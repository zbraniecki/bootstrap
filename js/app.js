define(function() {
  function App() {
  }

  App.prototype.addEventListener = function app_addEventListener(type, cb) {
    console.log('cb');
  }

  App.extend = function(subClass){
    subClass.prototype = Object.create(App.prototype);
    subClass.prototype.constructor = subClass;
  }

  return App;
});
