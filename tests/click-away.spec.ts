import { test, expect } from "@playwright/test";
import { exec, ChildProcess } from "child_process";

let viteProcess: ChildProcess;
test.beforeAll(async () => {
  viteProcess = exec("vite ./playground", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting Vite: ${err}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
});

test.afterAll(() => {
  if (viteProcess) {
    viteProcess.kill();
  }
});

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:2025");
  const iframeElement = await page.$("iframe");
  const iframe = await iframeElement!.contentFrame();

  const body = iframe!.locator("body");
  await body.waitFor({ state: "attached" });
});

test.describe("click away", () => {
  test("from outer", async ({ page }) => {
    let innerLogCorrect = false;
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        const logMsg = msg.text();
        if (logMsg.startsWith("interior click")) {
          if (logMsg.match(/.+\(2, 2\)$/)) {
            innerLogCorrect = true;
          }
        }
      }
    });

    await page.mouse.click(50, 50);

    setTimeout(() => {
      expect(innerLogCorrect).toBe(true);
    }, 100);
  });
  test("from inner", async ({ page }) => {
    let outerLogCorrect = false;
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        const logMsg = msg.text();
        if (logMsg.startsWith("exterior click")) {
          if (logMsg.match(/.+\(2, 2\)$/)) {
            outerLogCorrect = true;
          }
        }
      }
    });

    await page.mouse.click(50, 150);

    setTimeout(() => {
      expect(outerLogCorrect).toBe(true);
    }, 100);
  });
});
