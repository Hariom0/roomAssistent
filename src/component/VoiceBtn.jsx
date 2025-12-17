import { Mic, MicOff } from "lucide-react";
import React from "react";

function VoiceBtn({ listening, setListening, setTranscript , setIntro }) {
	const toggleListening = () => {
    setIntro(false)
		if (!SpeechRecognition) {
			alert("Speech recognition not supported");
			return;
		}

		if (listening) {
			setListening(false);
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onspeechstart = () => {
			console.log("Speech detected");
		};

		recognition.onresult = (event) => {
			let transcript = "";

			for (let i = event.resultIndex; i < event.results.length; i++) {
				transcript += event.results[i][0].transcript;
			}

			setTranscript(transcript);
		};

		recognition.onerror = (e) => {
			console.error("Speech error:", e);
		};

		recognition.onend = () => {
			console.log("Recognition ended");
			setListening(false);
		};

		setListening(true);
		recognition.start();
	};

return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
      
      {listening && (
        <>
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl animate-ping-slow" />
          <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full bg-white/20 blur-lg animate-ping" />
        </>
      )}

      <button
        onClick={toggleListening}
        className={`
          relative
          flex flex-col items-center justify-center
          w-30 h-30
          rounded-full
          backdrop-blur-2xl
          border
          text-white
          shadow-2xl
          transition-all duration-500 ease-out
          ${
            listening
              ? "bg-white/20 border-white/40 scale-110"
              : "bg-white/10 border-white/25 hover:scale-105"
          }
        `}
      >
        <div
          className={`
            absolute inset-2 rounded-full
            bg-linear-to-br from-white/30 to-transparent
            ${
              listening ? "animate-glow-spin" : ""
            }
          `}
        />

        {listening ? (
          <Mic className="relative z-10 w-10 h-10 text-cyan-300 animate-breathe" />
        ) : (
          <MicOff className="relative z-10 w-8 h-8 opacity-80" />
        )}

        <span className="relative z-10 mt-1 text-xs tracking-wide opacity-80">
          {listening ? "Listening…" : "Tap to Speak"}
        </span>
      </button>
    </div>
  );
}

export default VoiceBtn;
