define(['io', 'app'], function(io, App) {
  function loadApp(id) {
    var url = './apps/'+id+'/manifest.webapp';

    function onJSONLoaded(err, manifest) {
      setTitle(manifest.name);
      initializeStage1(id, manifest);
    }

    io.loadJSON(url, onJSONLoaded);
  }

  function initializeStage1(id, manifest) {
    if (manifest.startup &&
      manifest.startup.stage1 &&
      manifest.startup.stage1.init_script) {

        var init_script = './apps/'+id+'/'+manifest.startup.stage1.init_script;
        require([init_script], function(app_init) {
          var app = app_init.init(App);
          app.emit('init');
        })
      }
    if (manifest.launch_path) {
      document.getElementById('screen').src = './apps/'+id+manifest.launch_path;
    }
  }

  function setTitle(title) {
    document.getElementById('title').textContent = title;
  }

  return {
    loadApp: loadApp,
  };
});
