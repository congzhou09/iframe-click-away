import { useEffect } from "react";
import styles from "./index.module.css";
import { Inner } from "iframe-click-away/index";

const Interior = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      console.log(`interior click on: (${e.clientX}, ${e.clientY})`);
    };
    document.addEventListener("click", onClick);

    let inner: Inner;
    const hasParentWindow = window.parent !== window;
    if (hasParentWindow) {
      inner = new Inner(window, window.parent);
      inner.init();
    }

    return () => {
      document.removeEventListener("click", onClick);

      if (hasParentWindow) {
        inner.deInit();
      }
    };
  }, []);
  return <div className={styles.innerRegion}>Inner</div>;
};

export default Interior;
