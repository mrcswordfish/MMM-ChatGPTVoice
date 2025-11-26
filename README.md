# MMM-ChatGPTVoice

A [MagicMirror²](https://magicmirror.builders/) module that adds a **ChatGPT-powered voice assistant**:

- Tap a mic icon on your mirror
- Speak your question
- It sends text to OpenAI (ChatGPT)
- Response is displayed **and spoken** (via browser text-to-speech)

---

## Features

- Voice input via **Web Speech API** (SpeechRecognition) in the MagicMirror browser (Electron)
- Uses **OpenAI Chat Completions API** (`gpt-4o-mini` by default)
- Spoken responses via browser **speechSynthesis**
- Simple UI showing:
  - Mic state (listening / idle)
  - Last user utterance
  - Last ChatGPT reply
- Configurable system prompt, model, language, etc.

---

## Requirements

- A working MagicMirror² installation
- Node.js version compatible with MagicMirror (Node 16/18/20+ is fine)
- An OpenAI API key:
  - Get one from your OpenAI account
  - Use **environment variable** `OPENAI_API_KEY` **or** put into `config.js` (less secure)

---

## Installation

From your MagicMirror root directory (usually `~/MagicMirror`):

```bash
cd ~/MagicMirror/modules
git clone https://github.com/<your-github-username>/MMM-ChatGPTVoice.git
cd MMM-ChatGPTVoice
npm install

