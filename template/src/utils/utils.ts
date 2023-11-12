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
