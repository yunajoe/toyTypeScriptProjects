function Player() {
  class Player {
    width: number;
    height: number;
    position: {
      x: number;
      y: number;
    };
    movements: {
      x: number;
      y: number;
    };
    gravity: number;

    constructor() {
      this.width = 50;
      this.height = 50;

      this.position = {
        x: 30,
        y: 20,
      };

      this.movements = {
        x: 0,
        y: 0,
      };
      this.gravity = 0.3;
    }

    //  현재 요소의 position을 그린다
    draw(ctx: CanvasRenderingContext2D) {
      // 지울 사각형의 왼쪽 상단 모서리의 x좌표
      // 지울 사각형의 왼쪽 상단 모서리의 y좌표
      // 지울 사각형의 너비
      // 지울 사각형의 높이
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx: CanvasRenderingContext2D) {
      console.log("this.position", this.position.y);
      this.draw(ctx);
      this.position.x += this.movements.x;
      this.position.y += this.movements.y;

      // object의 position이 canvas를 벗어나지 않을경우
      if (
        this.position.y + this.height + this.movements.y <=
        ctx.canvas.height
      ) {
        if (this.position.y < 0) {
          this.position.y = 0;
          this.movements.y = this.gravity;
        }
        this.movements.y += this.gravity;
      } else {
        // object의 position이 canvas를 벗어낫을경우
        console.log("벗어나따", ctx.canvas.height, this.height);
        this.movements.y = 0;
        // this.position.y -= this.height;

        return;
      }
    }
  }

  return Player;
}

export default Player;
