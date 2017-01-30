var modules = ['jquery', 'runner', 'draw', 'control'];
define(modules, function(jQ, runner, draw, control) {

  describe('Test to check initialization', function() {
    var el;
    beforeEach(function() {
      // создаем елемент canvas
      // create element canvas
     el = jQ(" <canvas id='myCanvas' width='640' height='400'></canvas>");
      // кидаем этот виртуальный элемент в DOM
      // push element canvas to DOM
      jQ('body').append(el);
    });
// Why don't work "this" in draw.js?
// Why don't work  "toHaveBeenCalled()" for action method
    it('works runner', function() {
      var drawTest = {}
      drawTest = {
        init: function() {},
        action: function() {}
      }
      spyOn(drawTest, 'init');
      spyOn(drawTest, 'action');
      runner.init(drawTest.init, drawTest.action)
      expect(drawTest.init).toHaveBeenCalled();
      //expect(drawTest.action).toHaveBeenCalled(); //?
    })


    it("Test for bricks", function() {
      draw.init();
      draw.initBricks();
      expect(draw.bricks[1][1]).toEqual(1);
    });


    it("Control default parametr", function() {
      control.init();
      expect(control.canvasMinX).toBeGreaterThan(0);
      expect(control.canvasMaxX).toBeGreaterThan(0);
      expect(control.rightDown).toEqual(false);
      expect(control.leftDown).toEqual(false);
    });

    it("Listener for control",function(){

      spyOn(jQ(document), 'keydown');
      //control.init();
      jQ(document).keydown(controlObj.keyDown)
       // jQuery('body').keydown();
       // expect(jQuery.keydown).toHaveBeenCalled();
       expect(jQ(document).keydown).toHaveBeenCalled();
    });

  });
});
