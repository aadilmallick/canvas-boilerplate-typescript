type Style = "center" | "full";

export default class CanvasCreator {
  public canvas: HTMLCanvasElement;
  private style?: Style;
  constructor(id: string, width?: number, height?: number) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = id;
    document.body.appendChild(this.canvas);
    width && height && this.setDimensions(width, height);
  }

  public getImage() {
    const image = this.canvas.toDataURL();

    const imageObj = new Image();
    imageObj.src = image;
    return imageObj;
  }

  public addSaveImageButton() {
    const link = document.createElement("a");
    link.innerText = "Save Image";
    link.classList.add("save-image");
    link.id = `${this.canvas.id}-save-image`;

    const rect = this.canvas.getBoundingClientRect();
    link.style.top = `${rect.top}px`;
    link.style.left = `${rect.left}px`;

    // if canvas is full screen, move button to top left
    if (this.style && this.style === "full") {
      link.style.top = "10px";
      link.style.left = "10px";
    }

    link.setAttribute("download", "canvas.png");
    const image = this.canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.setAttribute("href", image);
    document.body.appendChild(link);
  }

  public setDimensions(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public onResize(callback: () => void) {
    window.addEventListener("resize", () => {
      if (this.style && this.style === "full") {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
      callback();
    });
  }

  public getCanvas() {
    return this.canvas;
  }

  public getContext() {
    return this.canvas.getContext("2d")!;
  }

  public setCanvasStyle(style: Style | (string & {})) {
    this.style = style as Style;
    switch (style) {
      case "center":
        this.canvas.classList.add(`canvas-${style}`);
        break;
      case "full":
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.classList.add(`canvas-${style}`);
        break;
      default:
        this.canvas.classList.add(style);
    }
  }
}
