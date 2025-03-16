import { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Outer } from "iframe-click-away/index";

const Exterior = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      console.log(`exterior click on: (${e.clientX}, ${e.clientY})`);
    };
    document.addEventListener("click", onClick);

    let outer: Outer;
    if (iframeRef.current?.contentWindow) {
      outer = new Outer(iframeRef.current.contentWindow, window);
      outer.init();
    }

    return () => {
      document.removeEventListener("click", onClick);

      if (iframeRef.current?.contentWindow) {
        outer.deInit();
      }
    };
  }, []);
  return (
    <div>
      <div className={styles.outerRegion}>
        <span>Outer</span>
      </div>
      <div className={styles.embedRegion}>
        <iframe ref={iframeRef} src="/inner" />
      </div>
    </div>
  );
};

export default Exterior;
