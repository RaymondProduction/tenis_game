define(
  'draw', ['jquery', 'control'],
  function(jQ, control, bricks) {
    var drawObj = {};

    drawObj.init = function(W, H, intId) {
      x = 150;
      y = 150;
      dx = 2;
      dy = 4;
      WIDTH = W;
      HEIGHT = H;
      intervalId = intId
      control.paddlex = WIDTH / 2;
      paddleh = 10;
      paddlew = 75;

      drawObj.initBricks();
    }

    drawObj.initBricks = function() {
      NROWS = 5;
      NCOLS = 5;
      BRICKWIDTH = (WIDTH / NCOLS) - 1;
      BRICKHEIGHT = 15;
      PADDING = 1;
      bricks = new Array(NROWS);
      for (i = 0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j = 0; j < NCOLS; j++) {
          bricks[i][j] = 1;
        }
      }
    }

    drawObj.showBricks = function() {
      //draw bricks
      for (i = 0; i < NROWS; i++) {
        for (j = 0; j < NCOLS; j++) {
          if (bricks[i][j] == 1) {
            drawObj.rect((j * (BRICKWIDTH + PADDING)) + PADDING,
              (i * (BRICKHEIGHT + PADDING)) + PADDING,
              BRICKWIDTH, BRICKHEIGHT);
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
      if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
        dy = -dy;
        bricks[row][col] = 0;
      }
    }
    drawObj.action = function() {
      drawObj.clear();
      drawObj.circle(x, y, 10);

      if (control.rightDown) control.paddlex += 5;
      else if (control.leftDown) control.paddlex -= 5;
      drawObj.rect(control.paddlex, HEIGHT - paddleh, paddlew, paddleh);

      //bricks.show();
      drawObj.checkBricks();

      if (x + dx > WIDTH || x + dx < 0)
        dx = -dx;

      if (y + dy < 0)
        dy = -dy;
      else if (y + dy > HEIGHT) {
        if (x > control.paddlex && x < control.paddlex + paddlew)
          dy = -dy;
        else
          //dy = -dy;
        clearInterval(intervalId);
      }

      x += dx;
      y += dy;;
    }

    drawObj.circle = function(x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    drawObj.rect = function(x, y, w, h) {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
    }

    drawObj.clear = function() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }


    return drawObj;
  });