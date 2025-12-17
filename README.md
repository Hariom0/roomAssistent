# Voice-Based Hotel Assistant

This project is a browser-based voice assistant for hotel guests.  
Users can speak naturally, and the assistant responds with predefined, helpful answers related to hotel services.

The entire system runs on the frontend using browser capabilities — no backend or AI APIs are used.

## Features

- Speech-to-Text (STT) using the Web Speech API
- Text-to-Speech (TTS) with tuned, natural-sounding voices
- Rule-based query understanding (keyword matching)
- Persistent chat history using localStorage

## How Speech-to-Text (STT) Works

The assistant uses the browser’s `SpeechRecognition` API to capture voice input.
When the microphone button is pressed:
- The browser listens to the user’s speech
- Speech is converted into text
- The text is stored in state and treated as a user message

This allows real-time voice interaction without any server-side processing.

## How Text-to-Speech (TTS) Works

Assistant responses are spoken using the `SpeechSynthesis` API.
- A natural voice is selected from available system voices
- Speech rate, pitch, and volume are tuned to sound less robotic
- Any ongoing speech is cancelled before a new response is spoken

The spoken response always matches the message shown in the chat.

## Query Matching Logic

The assistant uses a rule-based approach to understand queries:
- User input is normalized (lowercased)
- Each message is checked against predefined rules
- Each rule contains keywords and a fixed response
- If a keyword is found, the corresponding response is returned
- If no rule matches, a fallback message asks the user to rephrase

This makes the assistant fast, predictable, and easy to extend.

## Limitations

- Speech recognition depends on browser support (best on Chrome/Edge)
- Continuous listening is limited by browser constraints
- The assistant cannot handle complex or multi-intent queries
- Voice quality varies depending on the user’s operating system
- The system does not learn or adapt automatically

## Bonus Features

- Auto-scroll for new messages
- Intro screen that hides after first interaction
- Animated microphone button for better feedback
- Clear chat button to reset the conversation

This project focuses on clean UI, clear logic, and a smooth voice-driven user experience.
