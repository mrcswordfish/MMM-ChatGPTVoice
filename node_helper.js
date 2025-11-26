"use strict";

/**
 * node_helper for MMM-ChatGPTVoice
 *
 * Handles communication with OpenAI's Chat Completions API.
 */

const NodeHelper = require("node_helper");
const Log = require("logger");
const fetch = require("node-fetch"); // v2.x, CommonJS-compatible

module.exports = NodeHelper.create({
  start: function () {
    Log.log("Starting node helper for: " + this.name);
    this.config = {};
  },

  socketNotificationReceived: function (notification, payload) {
    const self = this;

    if (notification === "CHATGPT_CONFIG") {
      this.config = payload || {};
      if (!this.config) {
        this.config = {};
      }
      if (this.config.debug) {
        Log.log(this.name + " received config");
      }
      return;
    }

    if (notification === "CHATGPT_QUERY") {
      this.handleChatQuery(payload).catch(function (error) {
        Log.error(self.name + " error: " + error);
        self.sendSocketNotification("CHATGPT_ERROR", {
          id: payload && payload.id,
          message: error.message || error.toString()
        });
      });
    }
  },

  /**
   * Handle a chat query by calling OpenAI's Chat Completions API.
   * Requires either:
   *   - this.config.apiKey, or
   *   - process.env.OPENAI_API_KEY
   */
  handleChatQuery: async function (payload) {
    const text = (payload && payload.text ? String(payload.text) : "").trim();
    if (!text) {
      return;
    }

    const apiKey =
      (this.config && this.config.apiKey) || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing OpenAI API key. Set config.apiKey in config.js or OPENAI_API_KEY env var."
      );
    }

    const model = (this.config && this.config.model) || "gpt-4o-mini";
    const systemPrompt =
      (this.config && this.config.systemPrompt) ||
      "You are a concise, friendly voice assistant running on a smart mirror. " +
        "Keep answers under three sentences and speak naturally.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      Log.error(
        this.name +
          " OpenAI HTTP " +
          response.status +
          " - " +
          (errText || "no body")
      );
      throw new Error("OpenAI API request failed with status " + response.status);
    }

    const data = await response.json();
    let reply = "";

    if (
      data &&
      Array.isArray(data.choices) &&
      data.choices[0] &&
      data.choices[0].message &&
      typeof data.choices[0].message.content === "string"
    ) {
      reply = data.choices[0].message.content.trim();
    } else {
      Log.error(this.name + " malformed OpenAI response: " + JSON.stringify(data));
      throw new Error("Malformed OpenAI response");
    }

    this.sendSocketNotification("CHATGPT_REPLY", {
      id: payload && payload.id,
      text: reply
    });
  }
});
