require(['runner', 'control','draw'], function(runner,control,draw) {
  control.init();
  runner.init(draw.init,draw.action);
});
