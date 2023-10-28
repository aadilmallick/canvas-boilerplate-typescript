import p5 from "p5";

const p5Manager = new p5((p: p5) => {
  // 1. runs first before setup(), use to download files
  p.preload = () => {};
  // 2. runs once before draw(), use to initialize variables and setup canvas
  p.setup = () => {
    p.createCanvas(400, 400);
  };
  // 3. draw() runs each frame, use to update variables and draw to canvas
  p.draw = () => {
    p.background(220);
  };
});
