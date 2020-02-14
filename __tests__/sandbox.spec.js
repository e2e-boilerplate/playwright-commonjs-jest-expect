const puppeteer = require("puppeteer");

let page;
let browser;

describe("Sandbox", () => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("https://e2e-boilerplates.github.io/sandbox/", {
        waitUntil: "networkidle0"
      })
      .catch(() => {});
  });

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  test("should be on the sandbox", async () => {
    await page.waitFor("h1");
    const title = await page.$eval("h1", el => el.textContent);

    expect(await page.title()).toEqual("Sandbox");
    expect(title).toEqual("Sandbox");
  });
});
