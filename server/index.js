const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.get("/retrieve-fuel-data", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.gaspy.nz/stats.html", {
      waitUntil: "networkidle2", // waits for network to calm down
    });

    await page.waitForFunction(() => {
      const el = document.querySelector("#data-average-91");
      return el && el.innerText !== "Test"; // Waits for data to load before displaying it
    });

    const data = await page.evaluate(() => {
      const unleadedPrice91 = document
        .querySelector("#data-average-91")
        ?.innerText.replace("$", "");
      const unleadedPrice95 = document
        .querySelector("#data-average-95")
        ?.innerText.replace("$", "");
      const unleadedPrice98 = document
        .querySelector("#data-average-98")
        ?.innerText.replace("$", "");
      const dieselPrice = document
        .querySelector("#data-average-diesel")
        ?.innerText.replace("$", "");

      return {
        91: unleadedPrice91,
        95: unleadedPrice95,
        98: unleadedPrice98,
        Diesel: dieselPrice,
      };
    });

    await browser.close();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Scrape failed" });
  }
});

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});
