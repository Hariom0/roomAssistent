import { useEffect, useState } from "react";
import Nav from "./component/nav";
import Chat from "./component/Chat";
import VoiceBtn from "./component/VoiceBtn";

function getLocalStorage() {
try {
  	const stored = localStorage.getItem("chat");
  	return stored ? JSON.parse(stored) : [];
} catch (error) {
  return []
}
}

function App() {
	const [listening, setListening] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [intro, setIntro] = useState(true);
	const [messages, setMessages] = useState(() => getLocalStorage());

	useEffect(() => {
		console.log("listning ", listening);
	}, [listening]);
	return (
		<div className="relative max-h-screen w-screen bg-sky-950 overflow-hidden">
			<Nav />
			<Chat transcript={transcript} setTranscript={setTranscript} intro={intro} setIntro={setIntro} messages={messages} setMessages={setMessages} />
			<VoiceBtn listening={listening} setListening={setListening} setTranscript={setTranscript} setIntro={setIntro} />
		</div>
	);
}

export default App;
