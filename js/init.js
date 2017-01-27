define(
  'init', ['jquery','control'],
  function(jQ,draw,control,restart) {
    var iniObj = {
    };
    iniObj.init = function(drIn,act) {
        start=-1;
        action=act;
        drawInit=drIn;
        drawInit();
        intervalId = setInterval(action, 10);
    }

    iniObj.initRepeat = function(){
      iniObj.init(drawInit,action);
    }

    iniObj.restart = function() {
      clearInterval(intervalId);
      jQ("div").append("<div id='button'><button class='button' name='reset'>Reset</button></div>");
      jQ("button").click(function(event) {
        nameButton = jQuery(this).attr("name");
        if (nameButton == 'reset' && start==-1) {
          start=3;
          jQ('.button').text("3");
          beforeStartId=setInterval(iniObj.beforeStart, 1000);
        }
      });
    };

    iniObj.beforeStart = function(){
      start-=1;
      if (start==-1) {
        jQ('#button').remove()
        clearInterval(beforeStartId);
        iniObj.initRepeat();
      } else
      jQ('.button').text(start);
    }
    return iniObj;
  });
