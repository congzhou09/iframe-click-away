declare global {
  interface Window {
    debug?: boolean;
  }
}

const printDebug = window?.debug;
const log = printDebug
  ? (...args: any) => {
      console.debug(...args);
    }
  : () => {};

export { log };
