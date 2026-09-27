const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(function() { return !document.querySelector(".preloader-root"); }, { timeout: 120000 });
  await page.waitForTimeout(3000);
  // scroll deep enough to reach stats section (after hero + ourwork + about)
  await page.evaluate(function() { window.scrollTo({ top: 22000, behavior: "instant" }); });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "stats-bg.png" });
  await page.evaluate(function() { window.scrollTo({ top: 24000, behavior: "instant" }); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "stats-bg2.png" });
  await browser.close();
  console.log("done");
})();
