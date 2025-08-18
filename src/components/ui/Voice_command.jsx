import React, { useState, useEffect, useRef } from "react";
import { useTheme } from '../../context/theme_context';
import { useQuestions, useDashboard } from "../../hooks";

function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const { setSearch } = useQuestions();

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = true; // Show words as they are recognized
    recognition.lang = "en-US"; // Set language

    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript.trim());
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  // Start listening
  const startListening = () => {
    setIsListening(true);
    recognitionRef.current.start();
  };

  // Stop listening
  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.stop();
  };

  // Handle voice commands
  useEffect(() => {
    
    let lowerCaseTranscript = transcript.toLowerCase();
    if (transcript.toLowerCase().includes("hello")) {
      alert("👋 You said hello!");
    }
    else if (lowerCaseTranscript.includes("dark mode")) {
      if(!isDarkMode) toggleTheme();
    }
    else if(lowerCaseTranscript.includes("light mode")) {
      if(isDarkMode) toggleTheme();
    }
    else{
        setSearch(lowerCaseTranscript);
    }
  }, [transcript]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold">🎙️ Voice Commands</h1>
      <p className="my-4">Transcript: {transcript || "Say something..."}</p>
      {!isListening ? (
        <button
          onClick={startListening}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Start Listening
        </button>
      ) : (
        <button
          onClick={stopListening}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Stop Listening
        </button>
      )}
    </div>
  );
}

export default VoiceCommands;
