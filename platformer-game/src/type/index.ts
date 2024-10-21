export type Player = {
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
  draw(ctx: CanvasRenderingContext2D): void;
  update(ctx: CanvasRenderingContext2D): void;
};
