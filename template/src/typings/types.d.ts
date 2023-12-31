/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

interface Renderable {
  update(deltaTime?: number): void;
  draw(ctx: CanvasRenderingContext2D, deltaTime?: number): void;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DrawUIManager {
  update(deltaTime?: number): void;
  draw(ctx: CanvasRenderingContext2D, deltaTime?: number): void;
}

declare module "*.png";
declare module "*.wav";
