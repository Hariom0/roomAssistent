# Voice-Based Hotel Assistant

This is a browser-based voice assistant designed for hotel guests.  
Users can speak naturally, and the assistant responds with helpful, predefined answers related to hotel services.

The project focuses on clean UI, smooth voice interaction, and simple rule-based logic — no AI APIs or backend required.

## What this assistant can do

- Listen to the user’s voice using the browser microphone
- Convert speech to text (STT)
- Match the user’s query against predefined rules (keywords → intent)
- Respond with a relevant answer
- Speak the response back using text-to-speech (TTS)
- Store chat history locally so it persists after refresh
- Allow users to clear the conversation at any time

## Example things you can say

- “I want to order food”
- “Can I get some water?”
- “What’s the WiFi password?”
- “I need housekeeping”
- “Where is the hotel located?”
- “Thank you” or “Bye”

If the assistant doesn’t understand, it politely asks the user to rephrase.

## Tech used

- React
- Web Speech API (SpeechRecognition + SpeechSynthesis)
- Tailwind CSS
- LocalStorage for chat persistence

Everything runs fully in the browser.

## How it works (high level)

1. User speaks using the microphone button  
2. Speech is converted to text  
3. Text is matched against rule-based intents  
4. A predefined response is selected  
5. The response is shown in the chat and spoken aloud  

## Why rule-based?

This project intentionally avoids AI models to:
- Keep the system predictable
- Make behavior easy to explain in interviews
- Ensure fast and offline-friendly responses
- Focus on UI/UX and system design fundamentals

## Notes

- Best experience is on Chrome or Edge
- Microphone permission is required
- Voice quality depends on the voices available in the browser/OS

## Future improvements

- Typing indicator for assistant
- Better intent confidence scoring
- Continuous listening mode
- Context-aware follow-up questions
- Multi-language support

---

Built as a learning project to explore voice interfaces, UI polish, and clean frontend architecture.
