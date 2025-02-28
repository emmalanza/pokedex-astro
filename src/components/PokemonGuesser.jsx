import { useState } from 'react';
import Confetti from 'react-confetti';
import {useWindowSize}  from 'react-use';

import AttempsSvg from '../assets/svg/attempts.svg';
import CheckSvg from '../assets/svg/check.svg';
import ErrorSvg from '../assets/svg/err.svg';

const GuessPokemon = ({ pokemonName, pokemonImage }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [fullGuess, setFullGuess] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [message, setMessage] = useState('¡Suerte!');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize()

  // Maneja la entrada de una letra
  const handleLetterInput = (e) => setCurrentGuess(e.target.value.toLowerCase());

  // Maneja la entrada del nombre completo
  const handleFullGuessInput = (e) => setFullGuess(e.target.value.toLowerCase());

  // Verifica si el Pokémon ha sido adivinado
  const isPokemonGuessed = (guessedLetters) => pokemonName.toLowerCase()
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  // Maneja el envío del intento
  const handleSubmit = (e) => {
    e.preventDefault();

    if (completed) return;

    // Adivinar una letra
    if (currentGuess.length === 1) {
      if (guessedLetters.includes(currentGuess)) return; // Evita repetir la letra

      const newGuessedLetters = [...guessedLetters, currentGuess];
      setGuessedLetters(newGuessedLetters);

      if (!pokemonName.toLowerCase().includes(currentGuess)) {
        setAttemptsLeft(prev => prev - 1);
        setMessage('❌ Incorrecto. Intenta de nuevo.');
      } else {
        setMessage('✅ ¡Correcto!');
      }

      if (isPokemonGuessed(newGuessedLetters)) {
        setMessage(`🎉 ¡Felicidades! Adivinaste el Pokémon: ${pokemonName}`);
        setCompleted(true);
        setShowConfetti(true);
      }

      if (attemptsLeft - 1 === 0) {
        setMessage(`😢 Se acabaron los intentos. El Pokémon era: ${pokemonName}`);
        setCompleted(true);
      }

      setCurrentGuess('');
    } 
    // Adivinar el nombre completo
    else if (fullGuess.length > 1) {
      if (fullGuess === pokemonName.toLowerCase()) {
        setMessage(`🎉 ¡Felicidades! Adivinaste el Pokémon: ${pokemonName}`);
        setCompleted(true);
        setShowConfetti(true);
      } else {
        setMessage(`❌ ¡Incorrecto! El Pokémon era: ${pokemonName}`);
        setAttemptsLeft(0);
        setCompleted(true);
      }
    }
  };

  // Renderiza los huecos con las letras adivinadas
  const renderWord = () => pokemonName.split('').map((letter, index) => (
    <span
      key={index}
      className="w-5 md:w-10 md:h-10 flex flex-wrap items-center justify-center border-2 border-blue-800 text-blue-900 bg-gray-200 
      md:text-xl font-bold uppercase rounded-md md:mx-1"
    >
      {guessedLetters.includes(letter.toLowerCase()) ? letter : ''}
    </span>
  ));

  // Función para reiniciar el juego
  const restartGame = () => {
    window.location.reload();
  };

  return (
    <section
      id="pokemon-guesser"
      className="flex flex-col xl:flex-row justify-center items-center gap-4  h-screen max-w-full lg:mt-32 px-4"
    >
      {/* Div Azul */}
      <div className="flex flex-col items-center justify-center relative bg-[#3e5ca2] p-4 rounded-lg shadow-md 
      w-full xl:w-[800px] 2xl:w-[950px] h-[400px]  xl:h-[800px] 2xl:h-[950px]">
        <img
          className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64"
          src={pokemonImage}
          alt={`Una foto de un pokémon`}
          style={{
            filter:
              "invert(1) grayscale(1) brightness(0) drop-shadow(0px -10px 20px rgba(255, 255, 255, 0.8))",
          }}
        />
        <h2 className="text-[#f7cc46] text-4xl sm:text-5xl lg:text-6xl text-center font-bold font-titleFont absolute bottom-5 text-outline">
          Adivina el Pokémon
        </h2>
      </div>
  
      {/* Div Amarillo */}
      <div className="bg-[#f7cc46] p-6 rounded-lg shadow-md 
     w-full xl:w-[800px] 2xl:w-[950px] h-[400px]  xl:h-[800px] 2xl:h-[950px]
      font-titleFont flex flex-col justify-center items-center gap-4 lg:gap-8">
        {!completed ? (
          <>
            <div className="text-center mb-4 flex flex-col gap-6">
              <div className="flex justify-center mt-2">{renderWord()}</div>
              <div className="relative w-10 h-10 flex items-center justify-center self-center">
                <img src={AttempsSvg.src} alt="Heart" className="w-36 h-36" />
                <span className="absolute text-white font-bold text-md lg:text-2xl">{attemptsLeft}</span>
              </div>
            </div>
  
            <div className="flex flex-wrap justify-center text-center text-md lg:text-2xl text-blue-900 h-10">
              {guessedLetters.length === 0
                ? "Tienes 5 intentos para adivinar el pokémon"
                : guessedLetters.map((letter, index) => {
                    const isCorrect = pokemonName.toLowerCase().includes(letter);
                    return (
                      <span
                        key={index}
                        className="relative px-3 py-1 rounded-md m-1 font-bold text-blue-800 bg-white"
                      >
                        {letter.toUpperCase()}
                        <img
                          src={isCorrect ? CheckSvg.src : ErrorSvg.src}
                          alt="Heart"
                          className="w-5 h-5 absolute top-1 right-1"
                        />
                      </span>
                    );
                  })}
            </div>
  
            <div>
              {/* Intentar adivinar letra */}
              <form onSubmit={handleSubmit} className="flex justify-center mb-4">
                <input
                  type="text"
                  value={currentGuess}
                  onChange={handleLetterInput}
                  maxLength={1}
                  className="px-3 py-1 border border-blue-800 rounded-md text-center w-9 text-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="?"
                  disabled={completed}
                />
                <button
                  type="submit"
                  className="ml-2 px-3 py-1 w-9 bg-blue-800 text-white rounded-md hover:bg-blue-600"
                  disabled={completed}
                >
                  ?
                </button>
              </form>
  
              {/* Intentar adivinar el nombre completo */}
              <form onSubmit={handleSubmit} className="flex justify-center">
                <input
                  type="text"
                  value={fullGuess}
                  onChange={handleFullGuessInput}
                  className="px-3 py-1 w-52 border border-blue-800 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Nombre completo"
                  disabled={completed}
                />
                <button
                  type="submit"
                  className="px-3 py-1 w-9 bg-green-500 text-white rounded-md hover:bg-green-300"
                  disabled={completed}
                >
                  ✔
                </button>
              </form>
            </div>
  
            <p className="text-center text-blue-800 text-md lg:text-2xl 2xl:text-4xl mt-4">{message}</p>
          </>
        ) : (
          <>
            {/* Mostrar Confetti si se adivinó correctamente */}
            {showConfetti && <Confetti width={width} height={height} />}
            <div className="text-center text-blue-800">
              <p className="text-md lg:text-2xl 2xl:text-4xl">{message}</p>
              {/* Mostrar imagen del Pokémon al finalizar */}
              <div className="mt-4">
                <img
                  src={pokemonImage}
                  alt="Pokemon"
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto"
                  style={{
                    filter: "drop-shadow(20px -10px 20px rgba(255, 255, 255, 0.8))",
                  }}
                />
              </div>
              {/* Botón para reiniciar el juego */}
              <button
                onClick={restartGame}
                className="mt-4 px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-600"
              >
                Jugar de nuevo
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
  
  
};

export default GuessPokemon;
