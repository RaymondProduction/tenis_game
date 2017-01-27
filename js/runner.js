define(
  'runner', ['jquery'],
  function(jQ) {
    var runnerObj = {
    };
    runnerObj.init = function(drawInit,action) {
        start=-1;
        this.action=action;
        this.drawInit=drawInit;
        this.drawInit();
        intervalId = setInterval(this.action, 10);
    }

    runnerObj.initRepeat = function(){
      runnerObj.init(this.drawInit,this.action);
    }

    runnerObj.restart = function() {
      clearInterval(intervalId);
      var button;
      button ="<div id='button'><button class='button' name='restart'>";
      button+="Restart</button></div>";
      jQ("div").append(button);
      jQ(".button").click(function(event) {
        nameButton = jQuery(this).attr("name");
        if (nameButton == 'restart' && start==-1) {
          start=3;
          jQ('.button').text("3");
          beforeStartId=setInterval(runnerObj.beforeStart, 1000);
        }
      });
    };

    runnerObj.beforeStart = function(){
      start-=1;
      if (start==-1) {
        jQ('#button').remove()
        clearInterval(beforeStartId);
        runnerObj.initRepeat();
      } else
      jQ('.button').text(start);
    }
    return runnerObj;
  });
