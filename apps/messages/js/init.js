define(function() {

  function init(App, manifest, id) {
    function MessagesApp() {
      this.manifest = manifest;
      this.id = id;
      this.timeouts = [];
    }

    App.extend(MessagesApp);

    MessagesApp.prototype.stage4 = function messagesapp_stage4() {
      var doc = this.window.document.body;

      loadFirst10Messages.call(this);
    }

    MessagesApp.prototype.close = function messagesapp_close() {
      for (var i=0; i < 10; i++) {
        clearTimeout(this.timeouts[i]);
      }
      this.timeouts = [];
    }

    function loadFirst10Messages() {
      var msgs = 0;
      var doc = this.window.document;

      function onMsgLoaded(i) {
        var ul = doc.getElementById('message_list');
        if (msgs === 0) {
          ul.removeChild(ul.firstElementChild);
        }
        var li = doc.createElement('li');
        li.textContent = 'Message '+i;
        ul.appendChild(li);
        msgs++;
        if (msgs === 10) {
          onMsgsLoaded.call(this);
        }
      }

      var d = 0;
      for (var i = 0; i < 10; i++) {
        d += getRandomInt(50,500);
        this.timeouts[i] = setTimeout(onMsgLoaded.bind(this, i), d);
      }
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function onMsgsLoaded() {
      this.emit('stage4complete');
    }

    return new MessagesApp();
  }

  return {
    init: init
  };
});
