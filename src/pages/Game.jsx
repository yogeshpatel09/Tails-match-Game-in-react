import React, { useState } from 'react';

const Game = () => {
  const [flippedBoxes, setFlippedBoxes] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [boxClickCount, setBoxClickCount] = useState(0);
  const [boxPairCount, setBoxPairCount] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showImage, setShowImage] = useState(true); // State to manage image visibility

  const randomColor = () => {
    const letters = 'ABCDEF0123456789';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const colorPairs = (numberOfPairs) => {
    const colorBox = [];
    for (let i = 0; i < numberOfPairs; i++) {
      const color = randomColor();
      colorBox.push(color, color); // Push color twice for pairs
    }
    return colorBox.sort(() => 0.5 - Math.random()); // Shuffle
  };

  const createBoxes = (numberOfBoxes) => {
    const numberOfPairs = numberOfBoxes / 2;
    const colors = colorPairs(numberOfPairs);
    const newBoxes = Array.from({ length: numberOfBoxes }, (_, index) => ({
      id: index,
      color: colors[index],
      flipped: false,
    }));
    setBoxes(newBoxes);
  };

  const handleBoxClick = (box) => {
    if (disableClick || box.flipped) return; // Ignore clicks if disabled or already flipped

    setBoxClickCount((prev) => prev + 1);
    setBoxes((prev) =>
      prev.map((b) => (b.id === box.id ? { ...b, flipped: true } : b))
    );

    setFlippedBoxes((prev) => {
      const newFlippedBoxes = [...prev, box];

      if (newFlippedBoxes.length === 2) {
        setDisableClick(true);
        checkMatch(newFlippedBoxes);
      }

      return newFlippedBoxes;
    });
  };

  const checkMatch = (newFlippedBoxes) => {
    const [firstBox, currentBox] = newFlippedBoxes;

    if (firstBox.color === currentBox.color) {
      // If boxes match, increase the pair count by one
      setBoxPairCount(boxPairCount+1); // Increment pair count
      setFlippedBoxes([]); // Clear flipped boxes
      setDisableClick(false); // Enable clicking again
    } else {
      // If not a match, flip them back after a delay
      setTimeout(() => {
        setBoxes((prev) =>
          prev.map((b) =>
            b.id === firstBox.id || b.id === currentBox.id
              ? { ...b, flipped: false } // Reset flipped state
              : b
          )
        );
        setFlippedBoxes([]); // Clear flipped boxes
        setDisableClick(false); // Enable clicking again
      }, 300); // Delay for flipping back
    }
  };

  const startGame = (difficulty) => {
    setBoxClickCount(0);
    setBoxPairCount(0);
    createBoxes(difficulty);
    setGameStarted(true);
    setShowImage(false); // Hide image when game starts
  };

  const restartGame = () => {
    // Reset flipped state of all boxes while keeping counts
    setBoxes((prev) => 
      prev.map(box => ({ ...box, flipped: false }))
    );
    setFlippedBoxes([]); // Clear flipped boxes
    setBoxClickCount(0);
    setBoxPairCount(0);
    setDisableClick(false); // Enable clicking again
  };

  const goHome = () => {
    setBoxes([]);
    setFlippedBoxes([]);
    setBoxClickCount(0);
    setBoxPairCount(0);
    setGameStarted(false);
    setShowImage(true); // Show image when going home
  };

  return (
    <div className="flex gap-8 justify-center items-center h-screen bg-[url('bgimg.jpg')] bg-cover bg-center">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          {!gameStarted && (
            <>
              <button
                onClick={() => startGame(12)}
                className="h-14 w-44 rounded-lg font-bold text-3xl bg-purple-400"
              >
                Easy
              </button>
              <button
                onClick={() => startGame(16)}
                className="h-14 w-44 rounded-lg font-bold text-3xl bg-purple-400"
              >
                Medium
              </button>
              <button
                onClick={() => startGame(24)}
                className="h-14 w-44 rounded-lg font-bold text-3xl bg-purple-400"
              >
                Hard
              </button>
            </>
          )}
          {gameStarted && (
            <>
              <div className="font-bold text-2xl text-center">
                Box Clicks: {boxClickCount}
              </div>
              <div className="font-bold text-2xl text-center">
                Box Pairs: {boxPairCount}
              </div>
              <button
                onClick={restartGame}
                className="h-14 w-44 rounded-lg font-bold text-3xl bg-red-500"
              >
                Restart
              </button>
              <button
                onClick={goHome}
                className="h-14 w-44 rounded-lg font-bold text-3xl bg-blue-500"
              >
                Home
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 p-1 gap-3">
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => handleBoxClick(box)}
            className="grid rounded-lg w-[100px] h-[100px] text-center"
            style={{ backgroundColor: box.flipped ? box.color : '#FFFFFF' }}
          >
            {/* Optionally, add content here */}
          </div>
        ))}
      </div>
      {showImage && <img src="/unnamed.png" alt="Background" />} {/* Conditionally render the image */}
    </div>
  );
};

export default Game;
