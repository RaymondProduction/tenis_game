define(
  'draw', ['jquery', 'control','runner'],
  function(jQ, control, runner) {
    var drawObj = {};

    drawObj.init = function() {
      ctx = jQ('#myCanvas')[0].getContext("2d");
      WIDTH = jQ("#myCanvas").width();
      HEIGHT = jQ("#myCanvas").height();
      x = 150;
      y = 150;
      dx = 2;
      dy = 4;
      control.paddlex = WIDTH / 2;
      paddleh = 10;
      paddlew = 75;
      ballr = 10;
      rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
      paddlecolor = "#FFFAAA";
      ballcolor = "#FFF000";
      backcolor = "#000000";
      drawObj.initBricks();
    }

    drawObj.initBricks = function() {
      NROWS = 5;
      NCOLS = 5;
      BRICKWIDTH = (WIDTH / NCOLS) - 1;
      BRICKHEIGHT = 15;
      PADDING = 1;
      drawObj.bricks = new Array(NROWS);
      for (i = 0; i < NROWS; i++) {
        drawObj.bricks[i] = new Array(NCOLS);
        for (j = 0; j < NCOLS; j++) {
          drawObj.bricks[i][j] = 1;
        }
      }
    }

    drawObj.showBricks = function() {
      //draw bricks
      for (i = 0; i < NROWS; i++) {
        for (j = 0; j < NCOLS; j++) {
          if (drawObj.bricks[i][j] == 1) {
            drawObj.rect((j * (BRICKWIDTH + PADDING)) + PADDING,
              (i * (BRICKHEIGHT + PADDING)) + PADDING,
              BRICKWIDTH, BRICKHEIGHT, rowcolors[i]);
          }
        }
      }
    }

    drawObj.checkBricks = function() {
      drawObj.showBricks();
      //have we hit a brick?
      rowheight = BRICKHEIGHT + PADDING;
      colwidth = BRICKWIDTH + PADDING;
      row = Math.floor(y / rowheight);
      col = Math.floor(x / colwidth);
      //if so, reverse the ball and mark the brick as broken
      if (y < NROWS * rowheight && row >= 0 && col >= 0 && drawObj.bricks[row][col] == 1) {
        dy = -dy;
        drawObj.bricks[row][col] = 0;
      }
    }
    drawObj.action = function() {
      drawObj.clear(backcolor);
      drawObj.circle(x, y, ballr, ballcolor);
      if (control.rightDown) control.paddlex += 5;
      else if (control.leftDown) control.paddlex -= 5;
      drawObj.rect(control.paddlex, HEIGHT - paddleh, paddlew, paddleh, paddlecolor);

      //bricks.show();
      drawObj.checkBricks();

      if (x + dx > WIDTH || x + dx < 0)
        dx = -dx;

      if (y + dy < 0)
        dy = -dy;
      else if (y + dy > HEIGHT) {
        if (x > control.paddlex && x < control.paddlex + paddlew)
          dy = -dy;
        else {
          runner.restart();
        }

      }

      x += dx;
      y += dy;;
    }

    drawObj.circle = function(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    drawObj.rect = function(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
    }

    drawObj.clear = function(color) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawObj.rect(0, 0, WIDTH, HEIGHT, color)
    }


    return drawObj;
  });
