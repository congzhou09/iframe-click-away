import { INTER_MSG } from "./constant";

export class Outer {
  constructor(
    private readonly clickEventMap = new WeakMap(),
    private readonly innerWindow: Window,
    private readonly outerWindow: Window
  ) {}

  private onOuterClick(e: MouseEvent) {
    if (!this.clickEventMap.has(e) && this.innerWindow) {
      console.debug("outer click");
      this.innerWindow.postMessage({ message: INTER_MSG.outerClick }, "*");
    } else {
      console.debug("outer click from inner msg");
    }
  }

  private onInnerClickMsg(e: MessageEvent) {
    if (e.data.message === INTER_MSG.innerClick) {
      console.debug("get innerClick msg");
      const element = this.outerWindow.document.elementFromPoint(2, 2);
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
  }

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
