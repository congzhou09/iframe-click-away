import { INTER_MSG } from "./constant";

export class Inner {
  private clickEventMap = new WeakMap();
  constructor(
    private readonly innerWindow: Window,
    private readonly outerWindow: Window
  ) {}

  private onInnerClick = (e: MouseEvent) => {
    if (!this.clickEventMap.has(e) && this.outerWindow) {
      console.debug("inner click");
      this.outerWindow.postMessage({ message: INTER_MSG.innerClick }, "*");
    } else {
      console.debug("inner click from outer msg");
    }
  };

  private onOuterClickMsg = (e: MessageEvent) => {
    if (e.data.message === INTER_MSG.outerClick) {
      console.debug("get outerClick msg");
      const element = this.innerWindow.document.elementFromPoint(2, 2);
      const events = ["mousedown", "mouseup", "click"];
      events.forEach((eventType) => {
        const event = new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          clientX: 2,
          clientY: 2,
        });
        this.clickEventMap.set(event, true);
        element?.dispatchEvent(event);
      });
    }
  };

  init() {
    this.innerWindow.document.addEventListener(
      "click",
      this.onInnerClick,
      true
    );
    this.innerWindow.addEventListener("message", this.onOuterClickMsg);
  }

  deInit() {
    this.innerWindow.document.removeEventListener(
      "click",
      this.onInnerClick,
      true
    );
    this.innerWindow.removeEventListener("message", this.onOuterClickMsg);
  }
}
