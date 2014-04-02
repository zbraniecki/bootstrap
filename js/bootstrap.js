define(['io', 'app'], function(io, App) {
  var start = null;

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
      initStage1(app);
    }
  }

  function initStage1(app) {
    currentStage(1);
    start = window.performance.now();
    if (!app || !app.stage1) {
      initStage2(app);
    }
  }

  function initStage2(app) {
    currentStage(2);
    var screen = document.getElementById('screen');
    screen.addEventListener('load', onScreenLoaded.bind(null, app));
    if (app.manifest.launch_path) {
      screen.src = './apps/'+app.id+app.manifest.launch_path;
    } else {
      screen.src = 'about:blank';
    }
  }

  function onScreenLoaded(app, e) {
    app.window = e.target.contentWindow;
    if (app.stage2) {
      app.window.addEventListener('stage2complete', onStage2Complete.bind(null, app));
      app.stage2();
    }
    app.window.document.body.style.visibility = 'visible';
    initStage3(app);
  }

  function onStage2Complete(app) {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage2time').textContent = time;
    currentStage();
    initStage3(app);
  }

  function initStage3(app) {
    currentStage(3);
    if (app.stage3) {
      app.window.addEventListener('stage3complete', onStage3Complete.bind(null, app));
      app.stage3();
    } else {
      onStage3Complete(app);
    }
  }

  function onStage3Complete(app) {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage3time').textContent = time;
    currentStage();
    initStage4(app);
  }

  function initStage4(app) {
    currentStage(4);
    if (app.stage4) {
      app.window.addEventListener('stage4complete', onStage4Complete.bind(null, app));
      app.stage4();
    } else {
      onStage4Complete(app);
    }
  }

  function onStage4Complete(app) {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage4time').textContent = time;
    currentStage();
    initStage5(app);
  }

  function initStage5(app) {
    currentStage(5);
    if (app.stage5) {
      app.window.addEventListener('stage5complete', onStage5Complete.bind(null, app));
      app.stage5();
    } else {
      onStage5Complete(app);
    }
  }

  function onStage5Complete(app) {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage5time').textContent = time;
    currentStage();
    onAppReady();
  }

  function onAppReady() {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('readytime').textContent = time;
  }

  function setTitle(title) {
    document.getElementById('title').textContent = title;
  }

  function currentStage(i) {
    document.getElementById('stage1').classList.remove('active'); 
    document.getElementById('stage2').classList.remove('active'); 
    document.getElementById('stage3').classList.remove('active'); 
    document.getElementById('stage4').classList.remove('active'); 
    document.getElementById('stage5').classList.remove('active'); 
    if (i) {
      document.getElementById('stage'+i).classList.add('active'); 
    }
  }

  return {
    loadApp: loadApp,
  };
});
