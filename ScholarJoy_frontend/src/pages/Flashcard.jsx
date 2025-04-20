import React, { useState } from "react";

function Flashcard({ question, answer, subject, difficulty }) {
  const [flipped, setFlipped] = useState(false);

  // Difficulty color mapping
  const difficultyColors = {
    easy: "bg-green-100 border-green-300",
    medium: "bg-yellow-100 border-yellow-300",
    hard: "bg-red-100 border-red-300",
  };

  // Inline styling for custom scrollbar
  const customScrollbarStyles = {
    overflow: "auto",
    maxHeight: "180px",
    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "rgba(100, 100, 100, 0.4) transparent", // For Firefox
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`relative w-full max-w-md mx-auto cursor-pointer ${difficultyColors[difficulty] || difficultyColors.medium} rounded-xl shadow-lg border-2 overflow-hidden`}
      style={{
        height: "250px", // Fixed height
        perspective: "1000px",
      }}
      onClick={handleCardClick}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full p-4 flex flex-col items-center justify-center text-center text-gray-800 font-medium text-lg bg-white rounded-xl shadow-md"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-xl font-bold mb-2 text-indigo-800">{subject}</h3>
          <p style={customScrollbarStyles}>{question}</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full p-4 flex items-center justify-center  bg-blue-50 text-gray-700 rounded-xl shadow-md"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <p style={customScrollbarStyles}>{answer}</p>
        </div>
      </div>

      {/* Difficulty Indicator */}
      <div className="absolute top-2 right-2 text-xs text-gray-600">{difficulty}</div>
    </div>
  );
}

export default Flashcard;
