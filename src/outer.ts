import { INTER_MSG } from "./constant";
import { log } from "./util";

export class Outer {
  private clickEventMap = new WeakMap();
  constructor(
    private readonly innerWindow: Window,
    private readonly outerWindow: Window,
    private readonly clientX: number = 2,
    private readonly clientY: number = 2
  ) {}

  private onOuterClick = (e: MouseEvent) => {
    if (!this.clickEventMap.has(e) && this.innerWindow) {
      log("outer click");
      this.innerWindow.postMessage({ message: INTER_MSG.outerClick }, "*");
    } else {
      log("outer click from inner msg");
    }
  };

  private onInnerClickMsg = (e: MessageEvent) => {
    if (e.data.message === INTER_MSG.innerClick) {
      log("get innerClick msg");
      const element = this.outerWindow.document.elementFromPoint(2, 2);
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
    this.outerWindow.document.addEventListener(
      "click",
      this.onOuterClick,
      true
    );
    this.outerWindow.addEventListener("message", this.onInnerClickMsg);
  }

  deInit() {
    this.outerWindow.document.removeEventListener(
      "click",
      this.onOuterClick,
      true
    );
    this.outerWindow.removeEventListener("message", this.onInnerClickMsg);
  }
}
