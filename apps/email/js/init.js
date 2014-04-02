define(function() {

  function init(App) {
    function EmailApp() {
    }

    App.extend(EmailApp);

    EmailApp.prototype.emit = function emailapp_emit(type) {
      switch (type) {
        case 'init':
          console.log('init');
          break;
      }
    }

    return new EmailApp();
  }

  return {
    init: init
  };
});
