define(
  'restart', ['jquery','init'],
  function(jQ,init) {
    restartObj = {};
    restartObj.init = function(id){
      intervalId = id;
      start=-1;
    };

    restartObj.restart = function() {
      clearInterval(intervalId);
      jQ("div").append("<div><button class='button' name='reset'>Reset</button></div>");
      jQ("button").click(function(event) {
        nameButton = jQuery(this).attr("name");
        if (nameButton == 'reset' && start==-1) {
          start=3;
          jQ('.button').text("3");
          beforeStartId=setInterval(restartObj.beforeStart, 1000);
        }
      });
    };

    restartObj.beforeStart = function(){
      start-=1;
      if (start==-1) {
        jQ('button.button').remove()
        clearInterval(beforeStartId);
        init.initRepeat();
      } else
      jQ('.button').text(start);
    }

    return restartObj;
  });
