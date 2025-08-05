// auto-post-tk.ts
import { AtpAgent } from '@atproto/api';
import * as dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { generateTKText } from './generateTK.js';
dotenv.config();

const handle = process.env.BSKY_HANDLE!;
const password = process.env.BSKY_PASSWORD!;

const agent = new AtpAgent({ service: 'https://bsky.social' });

async function post() {
  const text = generateTKText();

  try {
    await agent.login({ identifier: handle, password: password });

    await agent.post({ text });
    console.log(`[投稿成功] ${text}`);
  } catch (err) {
    console.error("[投稿失敗]", err);
  }
}

async function startLoop() {
  await post();

  setInterval(() => {
    post();
  }, 10 * 60 * 1000);
}

startLoop();


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});