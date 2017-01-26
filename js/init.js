define(
  'init', ['jquery','draw','control'],
  function(jQ,draw,control,bricks) {
    var iniObj = {
    };
    iniObj.init = function() {
        ctx = jQ('#myCanvas')[0].getContext("2d");
        iniObj.WIDTH = jQ("#myCanvas").width();
        iniObj.HEIGHT = jQ("#myCanvas").height();
        control.init();
        draw.init(iniObj.WIDTH,iniObj.HEIGHT,setInterval(draw.action, 10));
    }
    return iniObj;
  });
