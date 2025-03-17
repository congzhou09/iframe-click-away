import { INTER_MSG } from "./constant";
import { log } from "./util";

export class Inner {
  private clickEventMap = new WeakMap();
  constructor(
    private readonly innerWindow: Window,
    private readonly outerWindow: Window,
    private readonly clientX: number = 2,
    private readonly clientY: number = 2
  ) {}

  private onInnerClick = (e: MouseEvent) => {
    if (!this.clickEventMap.has(e) && this.outerWindow) {
      log("inner click");
      this.outerWindow.postMessage({ message: INTER_MSG.innerClick }, "*");
    } else {
      log("inner click from outer msg");
    }
  };

  private onOuterClickMsg = (e: MessageEvent) => {
    if (e.data.message === INTER_MSG.outerClick) {
      log("get outerClick msg");
      const element = this.innerWindow.document.elementFromPoint(2, 2);
      const events = ["mousedown", "mouseup", "click"];
      events.forEach((eventType) => {
        const event = new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          clientX: this.clientX,
          clientY: this.clientY,
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
