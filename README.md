# MMM-ChatGPTVoice

A [MagicMirror²](https://magicmirror.builders/) module that adds a **ChatGPT-powered always-listening voice assistant**.

Instead of tapping a mic icon, you just say:

> **“hey gpt …” + your question**

Example:
> “hey gpt what’s the weather today?”

The module:

1. Uses the browser’s **Web Speech API** in continuous mode.
2. Listens for a configurable wake phrase (default: `hey gpt`).
3. Sends everything **after** the wake phrase to OpenAI ChatGPT.
4. Displays the reply and **speaks it aloud** using browser text-to-speech.

---

## Features

- **Wake phrase activation** (default: `hey gpt`)
- Continuous listening (auto-restarts if recognition stops)
- Uses **OpenAI Chat Completions API** (`gpt-4o-mini` by default)
- Spoken responses via browser **speechSynthesis**
- Simple UI showing:
  - Status (“Listening for ‘hey gpt’…” / errors)
  - Last user question (without the wake phrase)
  - Last ChatGPT reply

---

## Requirements

- A working MagicMirror² installation
- Node.js version compatible with MagicMirror
- An OpenAI API key:
  - Get one from your OpenAI account
  - Use **environment variable** `OPENAI_API_KEY` (recommended)
  - Or put it into `config.js` (less secure)

Browser/Electron must support:

- `window.SpeechRecognition` / `webkitSpeechRecognition`
- `window.speechSynthesis`

---

## Installation

From your MagicMirror root directory (usually `~/MagicMirror`):

```bash
cd ~/MagicMirror/modules
git clone https://github.com/<your-github-username>/MMM-ChatGPTVoice.git
cd MMM-ChatGPTVoice
npm install
