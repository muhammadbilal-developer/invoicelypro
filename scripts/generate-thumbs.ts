import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";
import { TEMPLATE_LIST } from "../src/components/templates/_registry";

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, "public", "templates", "thumbs");
const PORT = 3111;
const BASE = `http://localhost:${PORT}`;

async function waitForServer(url: string, retries = 60) {
  for (let i = 0; i < retries; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("Server did not start in time");
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const dev = spawn("npm", ["run", "dev", "--", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "pipe",
    shell: true,
  });

  try {
    await waitForServer(`${BASE}/templates/thumbnail-preview`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 2200, deviceScaleFactor: 1 });

    for (const tpl of TEMPLATE_LIST) {
      const url = `${BASE}/templates/thumbnail-preview?id=${tpl.id}`;
      await page.goto(url, { waitUntil: "networkidle0" });
      const frame = await page.$("[data-invoice-frame]");
      if (!frame) throw new Error(`Invoice frame missing for ${tpl.id}`);
      await frame.screenshot({ path: path.join(OUT_DIR, `${tpl.id}.png`) });
      console.log(`Generated ${tpl.id}.png`);
    }

    await browser.close();
  } finally {
    dev.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
