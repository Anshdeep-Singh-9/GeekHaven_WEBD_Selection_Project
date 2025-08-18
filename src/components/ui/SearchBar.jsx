import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/theme_context';

const SearchBar = ({ search, setSearch, placeholder = "Search questions..." }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Show interim results for user feedback
      setTranscript(finalTranscript || interimTranscript);
      
      // Only process commands when we have final results
      if (finalTranscript) {
        const lowerCaseTranscript = finalTranscript.trim().toLowerCase();
        
        if (lowerCaseTranscript.includes("dark")) {
          if (!isDarkMode) toggleTheme();
        } else if (lowerCaseTranscript.includes("light")) {
          if (isDarkMode) toggleTheme();
        } else if (lowerCaseTranscript.includes("clear search")) {
          setSearch("");
        } else {
          // Set as search query
          setSearch(finalTranscript.trim());
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [isDarkMode, toggleTheme, setSearch]);

  // Start listening
  const startListening = () => {
    if (!speechSupported || !recognitionRef.current) return;
    
    setIsListening(true);
    setTranscript("");
    recognitionRef.current.start();
  };

  // Stop listening
  const stopListening = () => {
    if (!recognitionRef.current) return;
    
    setIsListening(false);
    recognitionRef.current.stop();
  };

  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-box"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className="search-icon">🔍</span>
      
      {speechSupported && (
        <button
          className={`voice-button ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          title={isListening ? "Stop listening" : "Start voice search"}
          type="button"
        >
          {isListening ? (
            <span className="voice-icon listening-icon">🎙️</span>
          ) : (
            <span className="voice-icon">🎤</span>
          )}
        </button>
      )}
      
      {isListening && (
        <div className="voice-feedback">
          <div className="voice-status">
            <span className="pulse-dot"></span>
            <span className="voice-text">Listening...</span>
          </div>
          {transcript && (
            <div className="voice-transcript">
              "{transcript}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
