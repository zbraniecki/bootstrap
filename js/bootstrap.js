define(['io', 'app'], function(io, App) {
  var start = null;
  var currentApp = null;

  document.getElementById('app_select').selectedIndex = 0;
  document.getElementById('app_select').addEventListener('change', onAppSelected);
  document.getElementById('screen').addEventListener('load', onScreenLoaded);

  
  function onAppSelected(e) {
    cleanSystem();
    if (e.target.value) {
      loadApp(e.target.value);
    }
  }

  function cleanSystem() {
    start = null;
    setTitle('');
    document.getElementById('screen').src = "about:blank";
    document.getElementById('stage1time').textContent = "---";
    document.getElementById('stage2time').textContent = "---";
    document.getElementById('stage3time').textContent = "---";
    document.getElementById('stage4time').textContent = "---";
    document.getElementById('stage5time').textContent = "---";
    document.getElementById('readytime').textContent = "---";
    if (currentApp) {
      currentApp.window.removeEventListener('stage2complete', onStage2Complete);
      currentApp.window.removeEventListener('stage3complete', onStage3Complete);
      currentApp.window.removeEventListener('stage4complete', onStage4Complete);
      currentApp.window.removeEventListener('stage5complete', onStage5Complete);
    }
    if (currentApp && currentApp.close) {
      currentApp.close();
    }
    currentApp = null;
    currentStage();
  }

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
        currentApp = app_init.init(App, manifest, id);
        initStage1();
        return;
      })
    } else {
      currentApp = new App(manifest, id);
      initStage1();
    }
  }

  function initStage1() {
    currentStage(1);
    start = window.performance.now();
    if (!currentApp || !currentApp.stage1) {
      onStage1Complete();
    }
  }

  function onStage1Complete() {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage1time').textContent = time;
    currentStage();
    initStage2();
  }

  function initStage2(app) {
    currentStage(2);
    var screen = document.getElementById('screen');
    if (currentApp.manifest.launch_path) {
      screen.src = './apps/' + currentApp.id + currentApp.manifest.launch_path;
    } else {
      screen.src = 'about:blank';
    }
  }

  function onScreenLoaded(e) {
    if (!currentApp) {
      return;
    }
    currentApp.window = e.target.contentWindow;
    currentApp.window.addEventListener('stage2complete', onStage2Complete);
    currentApp.window.addEventListener('stage3complete', onStage3Complete);
    currentApp.window.addEventListener('stage4complete', onStage4Complete);
    currentApp.window.addEventListener('stage5complete', onStage5Complete);
    if (currentApp.stage2) {
      currentApp.stage2();
    }
    currentApp.window.document.body.style.visibility = 'visible';
    onStage2Complete();
  }

  function onStage2Complete() {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage2time').textContent = time;
    currentStage();
    initStage3();
  }

  function initStage3() {
    currentStage(3);
    if (currentApp.stage3) {
      currentApp.stage3();
    } else {
      onStage3Complete();
    }
  }

  function onStage3Complete() {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage3time').textContent = time;
    currentStage();
    initStage4();
  }

  function initStage4() {
    currentStage(4);
    if (currentApp.stage4) {
      currentApp.stage4();
    } else {
      onStage4Complete();
    }
  }

  function onStage4Complete() {
    var time = parseInt(window.performance.now() - start);
    document.getElementById('stage4time').textContent = time;
    currentStage();
    initStage5();
  }

  function initStage5() {
    currentStage(5);
    if (currentApp.stage5) {
      currentApp.stage5();
    } else {
      onStage5Complete();
    }
  }

  function onStage5Complete() {
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
