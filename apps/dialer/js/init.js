define(function() {

  function init(App, manifest, id) {
    function EmailApp() {
      this.manifest = manifest;
      this.id = id;
    }

    App.extend(EmailApp);

    EmailApp.prototype.stage3 = function emailapp_stage3() {
      var doc = this.window.document.body;

      var tds = doc.getElementsByTagName('td');

      function onClick(e) {
        var val = e.target.textContent;
        this.window.document.getElementById('textbox').value += val;
      }

      for (var td of tds) {
        td.addEventListener('click', onClick.bind(this));
      }

      this.emit('stage3complete');
    }

    return new EmailApp();
  }

  return {
    init: init
  };
});
