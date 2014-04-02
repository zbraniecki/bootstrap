define(function() {

  function init(App) {
    function EmailApp() {
    }

    App.extend(EmailApp);

    EmailApp.prototype.stage1 = function emailapp_stage1() {
      console.log('stage 1 init');
    }

    return new EmailApp();
  }

  return {
    init: init
  };
});
