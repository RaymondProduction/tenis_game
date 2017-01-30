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

    it('works runner', function(done) {
      var drawTest = {}
      var test = 0;
      drawTest = {
        init: function() {},
        action: function() {
          test = 42;
        }
      }
      spyOn(drawTest, 'init');
      spyOn(drawTest, 'action').and.callThrough();
      runner.init(drawTest.init, drawTest.action)
      expect(drawTest.init).toHaveBeenCalled();
      var intervalId = setInterval(function() {
        if (test == 42) {
          expect(drawTest.action).toHaveBeenCalled();
          clearInterval(intervalId);
          done();
        }
      }, 10);

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
    it("Listener for control", function() {
      spyOn(control, 'keyDown');
      control.init();
      jQ(document).trigger("keydown");
      expect(control.keyDown).toHaveBeenCalled();
    });

  });
});
