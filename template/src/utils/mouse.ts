interface Mouse {
  x: number | null;
  y: number | null;
  isDown: boolean;
}

export const mouse: Mouse = {
  x: null,
  y: null,
  isDown: false,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousedown", () => {
  mouse.isDown = true;
});

window.addEventListener("mouseup", () => {
  mouse.isDown = false;
});
