{
  module: "MMM-ChatGPTVoice",
  position: "bottom_center", // choose any region you like
  config: {
    // Recommended: leave apiKey empty and set OPENAI_API_KEY in the environment
    apiKey: "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",        // "sk-xxxx..." (only if you accept putting it in this file)
    model: "gpt-4o-mini",
    language: "en-US",
    wakePhrase: "hey gpt",  // wake phrase to listen for
    continuous: true,       // must be true for wake-phrase mode
    debug: false
  }
},

