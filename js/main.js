require(['jquery','init', 'control','draw'], function(jQ,init,control,draw) {
  control.init();
  init.init(draw.init,draw.action)
});
