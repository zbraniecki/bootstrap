// https://etherpad.mozilla.org/Nh150fk5QY
requirejs.config({
  urlArgs: "bust=" +  (new Date()).getTime()
});

require(["bootstrap"], function(bootstrap) {
});
