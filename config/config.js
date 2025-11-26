{
  module: "MMM-ChatGPTVoice",
  position: "bottom_center", // choose any region you like
  config: {
    // Recommended: leave apiKey empty and set OPENAI_API_KEY in the environment
    apiKey: "",        // "sk-xxxx..." (only if you accept putting it in this file)
    model: "gpt-4o-mini",
    language: "en-US",
    wakePhrase: "hey gpt",  // wake phrase to listen for
    continuous: true,       // must be true for wake-phrase mode
    debug: false
  }
},
