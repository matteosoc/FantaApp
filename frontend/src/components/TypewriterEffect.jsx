import React, { useState, useEffect } from 'react';

const TypewriterEffect = () => {
    const phrases = [
        "Registrati",
        "Crea una lega",
        "Crea i giocatori",
        "Invita degli amici",
        "Crea delle squadre",
        "Assegna i bonus",
        "Gioca e divertiti!"
    ];

    const [currentText, setCurrentText] = useState("");
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const currentPhrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                // Cancellazione del testo
                setCurrentText((prev) => prev.slice(0, -1));
                setSpeed(75);
            } else {
                // Scrittura del testo
                setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1));
                setSpeed(150);
            }

            // Quando il testo è completamente scritto
            if (!isDeleting && currentText === currentPhrase) {
                setTimeout(() => setIsDeleting(true), 1000);
            }

            // Quando il testo è completamente cancellato
            if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
            }
        };

        const typingTimeout = setTimeout(handleTyping, speed);

        return () => clearTimeout(typingTimeout);
    }, [currentText, isDeleting, speed, currentPhraseIndex, phrases]);

    return (
        <h1 id='typewriter-effect'>{currentText}<span className="cursor">|</span></h1>
    );
};

export default TypewriterEffect;
