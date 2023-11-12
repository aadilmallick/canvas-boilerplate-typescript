export function timeDeltaHandler({
  callback,
  deltaTime,
  fps,
  timer,
  interval,
}: {
  deltaTime: number;
  timer: number;
  fps?: number;
  callback: () => void;
  interval?: number;
}) {
  if (fps && fps < 1) {
    throw new Error("fps must be greater than 0");
  }
  const timeInterval = fps ? 1000 / fps : interval;

  // basic checks because why not
  if (!timeInterval) {
    throw new Error("timeInterval is undefined");
  }
  if (deltaTime < 0) {
    throw new Error("deltaTime must be greater than 0");
  }
  if (timeInterval < 0) {
    throw new Error("timeInterval must be greater than 0");
  }
  if (timer > timeInterval) {
    callback();
    timer = 0;
  } else {
    timer += deltaTime;
  }
  return timer;
}

export function createRainbowGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const grd = ctx.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0, "red");
  grd.addColorStop(0.17, "orange");
  grd.addColorStop(0.34, "yellow");
  grd.addColorStop(0.51, "green");
  grd.addColorStop(0.68, "blue");
  grd.addColorStop(0.85, "indigo");
  grd.addColorStop(1, "violet");
  return grd;
}

export const canvasDimensions = {
  width: 0,
  height: 0,
};
