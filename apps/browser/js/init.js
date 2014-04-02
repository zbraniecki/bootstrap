define(function() {

  function init(App, manifest, id) {
    function BrowserApp() {
      this.manifest = manifest;
      this.id = id;
    }

    App.extend(BrowserApp);

    BrowserApp.prototype.stage5 = function browserapp_stage5() {
      setTimeout(LoadBookmarks.bind(this), 3000);
    }

    var bms = [
      ['Google', 'http://www.google.com'],
      ['Yahoo', 'http://www.yahoo.com'],
      ['Amazon', 'http://www.amazon.com'],
      ['Mozilla', 'http://www.mozilla.com']
    ];
    function LoadBookmarks() {
      var doc = this.window.document;
      var bookmarks = doc.getElementById('bookmarks');

      for (var bm of bms) {
        var option = doc.createElement('option');
        option.textContent = bm[0];
        bookmarks.appendChild(option);
      }
      this.emit('stage5complete');
    }


    return new BrowserApp();
  }

  return {
    init: init
  };
});
