define(
  'bricks', ['jquery','draw'],
  function(jQ,draw) {
    bricksObj = {};
    bricksObj.init = function() {
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

    bricksObj.show = function() {
      //draw bricks

      for (i = 0; i < NROWS; i++) {
        for (j = 0; j < NCOLS; j++) {
          if (bricks[i][j] == 1) {
            draw.rect((j * (BRICKWIDTH + PADDING)) + PADDING,
              (i * (BRICKHEIGHT + PADDING)) + PADDING,
              BRICKWIDTH, BRICKHEIGHT);
          }
        }
      }
    }

    bricksObj.check = function() {
      bricksObj.show();
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

    return bricksObj;

  });
