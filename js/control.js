define(
  'control', ['jquery'],
  function(jQ) {

    controlObj = {};

    controlObj.init = function() {
      controlObj.canvasMinX = jQ("#myCanvas").offset().left;
      controlObj.canvasMaxX = controlObj.canvasMinX + jQ("#myCanvas").width();
      controlObj.rightDown = false;
      controlObj.leftDown = false;
      jQ(document).keydown(controlObj.keyDown);
      jQ(document).keyup(controlObj.keyUp);
      jQ(document).mousemove(controlObj.onMouseMove);
    };

    controlObj.keyDown = function(evt) {
      if (evt.keyCode == 39) controlObj.rightDown = true;
      else if (evt.keyCode == 37) controlObj.leftDown = true;
    }
    controlObj.keyUp = function(evt) {
      if (evt.keyCode == 39) controlObj.rightDown = false;
      else if (evt.keyCode == 37) controlObj.leftDown = false;
    }
    controlObj.onMouseMove = function(evt) {
      if (evt.pageX > controlObj.canvasMinX && evt.pageX < controlObj.canvasMaxX) {
        controlObj.paddlex = evt.pageX - controlObj.canvasMinX;
      }
    }


    return controlObj;
  });
