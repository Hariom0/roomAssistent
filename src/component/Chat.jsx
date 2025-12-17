import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const RULES = [
	{
		intent: "greeting",
		keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste"],
		response: "Hello! Welcome to our hotel. How may I assist you today?",
	},

	{
		intent: "thanks",
		keywords: ["thank you", "thanks", "thx", "appreciate", "great", "okay thanks"],
		response: "You're most welcome! Please let me know if you need anything else.",
	},

	{
		intent: "goodbye",
		keywords: ["bye", "goodbye", "see you", "good night", "take care"],
		response: "Goodbye! Have a pleasant stay and feel free to reach out anytime.",
	},

	{
		intent: "help",
		keywords: ["help", "assist", "what can you do", "services", "support"],
		response: "I can help you with room service, housekeeping, hotel facilities, WiFi details, and general information about your stay.",
	},

	{
		intent: "room_service_food",
		keywords: ["food", "breakfast", "lunch", "dinner", "menu", "order", "room service", "eat"],
		response: "Our restaurant is open 24/7. You can order food from the in-room tablet or by calling extension 9.",
	},

	{
		intent: "water_request",
		keywords: ["water", "bottle", "drinking water", "cold water", "mineral water"],
		response: "Sure! Housekeeping will deliver two bottles of drinking water shortly.",
	},

	{
		intent: "housekeeping",
		keywords: ["clean room", "cleaning", "housekeeping", "towel", "towels", "linen", "bedsheet", "pillow", "blanket"],
		response: "Housekeeping has been notified. They will attend to your room in 10–15 minutes.",
	},

	{
		intent: "wifi",
		keywords: ["wifi", "internet", "network", "password", "wi-fi"],
		response: "The WiFi password is: ROOM1234.",
	},

	{
		intent: "pool",
		keywords: ["swimming pool", "pool", "swim"],
		response: "The swimming pool is open from 6 AM to 8 PM.",
	},

	{
		intent: "gym",
		keywords: ["gym", "fitness", "workout", "exercise"],
		response: "Our gym is open 24 hours and accessible using your room card.",
	},

	{
		intent: "checkout",
		keywords: ["check out", "checkout", "check-out", "late checkout", "leave room"],
		response: "Standard checkout time is 11 AM. You can request late checkout based on availability.",
	},

	{
		intent: "location",
		keywords: ["location", "address", "where are you", "hotel address"],
		response: "We are located at 12th Cross, MG Road, Bangalore.",
	},

	{
		intent: "timing",
		keywords: ["timing", "open", "close", "working hours", "available"],
		response: "Most of our services operate 24/7. Specific facilities like the pool have fixed timings.",
	},

	{
		intent: "complaint",
		keywords: ["problem", "issue", "not working", "complaint", "noise", "disturbance"],
		response: "I'm sorry for the inconvenience. I've noted your concern and will inform the hotel staff immediately.",
	},

	{
		intent: "emergency",
		keywords: ["emergency", "urgent", "help me", "immediately"],
		response: "If this is an emergency, please contact the front desk immediately or dial extension 0.",
	},
];

function getBotReply(userText) {
	const text = userText.toLowerCase();

	for (const rule of RULES) {
		for (const keyword of rule.keywords) {
			if (text.includes(keyword)) {
				return rule.response;
			}
		}
	}

	return "I'm sorry, I didn't understand that. Could you please rephrase?";
}

function Chat({ transcript, setTranscript, intro, setIntro, messages, setMessages }) {
	const chatEndRef = useRef(null);

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	/* ---- Persist chat ---- */
	useEffect(() => {
		localStorage.setItem("chat", JSON.stringify(messages));
	}, [messages]);

	useEffect(() => {
		if (messages?.length > 0) {
			setIntro(false);
		}
	}, [messages, setIntro]);

	/* ---- When user speaks ---- */
	useEffect(() => {
		if (!transcript) return;

		const userMsg = {
			id: crypto.randomUUID(),
			sender: "user",
			message: transcript,
			timestamp: Date.now(),
		};

		setMessages((prev) => [...prev, userMsg]);
		setTranscript("");

		const replyText = getBotReply(transcript);

		setTimeout(() => {
			const assistantMsg = {
				id: crypto.randomUUID(),
				sender: "assistant",
				message: replyText,
				timestamp: Date.now(),
			};

			setMessages((prev) => [...prev, assistantMsg]);
			speak(replyText);
		}, 700);
	}, [transcript, setMessages, setTranscript]);

	/* ---- TTS ---- */
	const speak = (text) => {
		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";
		utterance.rate = 0.95;
		utterance.pitch = 1.05;
		utterance.volume = 0.95;

		const voices = window.speechSynthesis.getVoices();
		const preferredVoice = voices.find((v) => v.name.includes("Microsoft Ravi")) || voices.find((v) => v.name.includes("Google US English")) || voices[0];

		if (preferredVoice) {
			utterance.voice = preferredVoice;
		}

		window.speechSynthesis.speak(utterance);
	};

	// voice load
	useEffect(() => {
		window.speechSynthesis.onvoiceschanged = () => {
			window.speechSynthesis.getVoices();
		};
	}, []);

	function clearChat() {
		localStorage.removeItem("chat");
		setMessages([]);
		setIntro(true);
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="relative w-[60%] h-[80vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col">
				{intro ? (
					/* ---- Intro Screen ---- */
					<div className="flex flex-col items-center justify-center w-full h-full text-center gap-6">
						<h1 className="text-4xl font-semibold text-white">Meet Your Smart Hotel Assistant</h1>

						<p className="text-white/80 text-lg max-w-xl">Speak naturally and let me handle your requests — from room service to hotel information, all hands-free.</p>

						<p className="text-white/60 text-sm">Tap the microphone below to get started</p>
					</div>
				) : (
					/* ---- Chat Screen ---- */
					<div className="flex-1 overflow-y-auto flex flex-col px-4 gap-4">
						{messages.map((msg) => (
							<div key={msg.id} className={`flex ${msg.sender === "assistant" ? "justify-start" : "justify-end"}`}>
								<div className={`px-4 py-3 max-w-md text-white rounded-2xl ${msg.sender === "assistant" ? "bg-white/15 rounded-bl-md" : "bg-black/30 rounded-br-md"}`}>{msg.message}</div>
							</div>
						))}
						<div ref={chatEndRef} />
					</div>
				)}

				{/* ---- Clear Chat Button ---- */}
				{!intro && (
					<button
						onClick={() => {
							localStorage.removeItem("chat");
							setMessages([]);
							setIntro(true);
						}}
						className="
    absolute bottom-3 right-3
    group
    flex items-center gap-1.5
    px-3 py-2
    text-xs
    text-white/70
    rounded-full
    bg-white/10
    backdrop-blur-lg
    border border-white/20
    shadow-lg
    transition-all duration-300 ease-out
    hover:bg-red-500/20
    hover:border-red-400/40
    hover:text-red-300
    hover:scale-105
    active:scale-95
  "
					>
						<X size={12} className="opacity-70 group-hover:opacity-100 transition-opacity" />
						<span className="hidden sm:inline">Clear chat</span>
					</button>
				)}
			</div>
		</div>
	);
}

export default Chat;
