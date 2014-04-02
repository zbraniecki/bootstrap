define(function() {

  function init(App, manifest, id) {
    function EmailApp() {
      this.manifest = manifest;
      this.id = id;
    }

    App.extend(EmailApp);

    EmailApp.prototype.stage2 = function emailapp_stage2() {
      this.emit('stage2complete');
    }

    return new EmailApp();
  }

  return {
    init: init
  };
});
