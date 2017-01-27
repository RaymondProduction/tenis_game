var modules = ['jquery', 'runner', 'draw', 'control'];
define(modules, function(jQ, runner, draw, control) {

  describe('Test to check initialization', function() {
    it('works runner', function() {


      var drawTest = {}

      drawTest = {
        init: function() {},
        action: function() {}
      }
      spyOn(drawTest, 'init');
      spyOn(drawTest, 'action');
      runner.init(drawTest.init,drawTest.action)
      expect(drawTest.init).toHaveBeenCalled();
      //expect(drawTest.action).toHaveBeenCalled();
    })



  });

});
