define(['io', 'app'], function(io, App) {
  function loadApp(id) {
    var url = './apps/'+id+'/manifest.webapp';

    function onJSONLoaded(err, manifest) {
      setTitle(manifest.name);
      initialize(id, manifest);
    }

    io.loadJSON(url, onJSONLoaded);
  }

  function initialize(id, manifest) {
    if (manifest.startup &&
      manifest.startup.init_script) {

      var init_script = './apps/'+id+'/'+manifest.startup.init_script;
      require([init_script], function(app_init) {
        var app = app_init.init(App, manifest, id);
        initStage1(app);
        return;
      })
    } else {
      initStage1();
    }
  }

  function initStage1(app) {
    if (!app || !app.stage1) {
      initStage2(app);
    }
  }

  function initStage2(app) {
    if (app.manifest.launch_path) {
      var screen = document.getElementById('screen');
      screen.addEventListener('load', onScreenLoaded.bind(null, app));
      screen.src = './apps/'+app.id+app.manifest.launch_path;
    }
  }

  function onScreenLoaded(app, e) {
    app.window = e.target.contentWindow;
    if (app.stage2) {
      app.stage2();
    }
    app.window.document.body.style.visibility = 'visible';
    initStage3(app);
  }

  function initStage3(app) {
    if (app.stage3) {
      console.log('stage 3 init');
      app.window.addEventListener('stage3complete', onStage3Complete.bind(null, app));
      app.stage3();
    } else {
      initStage4(app);
    }
  }

  function onStage3Complete(app) {
    console.log('stage 3 complete');
    initStage4(app);
  }

  function initStage4(app) {
    if (app.stage4) {
      console.log('stage 4 init');
      app.window.addEventListener('stage4complete', onStage4Complete.bind(null, app));
      app.stage4();
    } else {
      initStage5(app);
    }
  }

  function onStage4Complete(app) {
    console.log('stage 4 complete');
  }

  function initStage5(app) {
    if (app.stage5) {
      console.log('stage 5 init');
      app.window.addEventListener('stage5complete', onStage5Complete.bind(null, app));
      app.stage5();
    }
  }

  function onStage5Complete(app) {
    console.log('stage 5 complete');
  }

  function setTitle(title) {
    document.getElementById('title').textContent = title;
  }

  return {
    loadApp: loadApp,
  };
});
