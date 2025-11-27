import { useState, useEffect } from 'react';
import './Loading.css';

const loadingTips = [
    "waking up...",
    "💡 Did you know? The first computer bug was an actual moth stuck in a computer!",
    "🚀 Fun fact: NASA still uses code from the 1970s in some spacecraft!",
    "🎮 The first video game was created in 1958 - it was a tennis game!",
    "☕ Coffee is a programmer's best friend... or is it Stack Overflow?",
    "🤖 AI can now write code, but it still can't fix your bugs... wait...",
    "🌐 The internet weighs about 50 grams (the weight of electrons in motion)!",
    "💾 The first 1GB hard drive weighed over 500 pounds!",
    "🐛 Debugging is like being a detective in a crime movie where you're also the murderer.",
    "⚡ Your smartphone has more computing power than NASA had in 1969!",
    "🎨 CSS stands for 'Constantly Struggling with Styling'... just kidding!",
    "🔥 The first computer mouse was made of wood!",
    "🌟 There are more possible chess games than atoms in the universe!",
    "🎯 The first programmer was Ada Lovelace in the 1840s!",
    "🚨 90% of the world's currency exists only on computers!",
    "🎪 The average person blinks 15-20 times per minute, programmers: 7 times!",
    "🌈 RGB actually stands for 'Really Good Colors'... okay, not really!",
    "⏰ The Y2K bug cost an estimated $300 billion to fix!",
    "🎵 The first computer to sing was in 1961 - it sang 'Daisy Bell'!",
    "🔐 The most common password is still '123456'... please don't use it!"
];

const Loading = () => {
    const [currentTip, setCurrentTip] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % loadingTips.length);
        }, 5000); // Change tip every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="loading-text gradient-text">{loadingTips[currentTip]}</div>
            </div>
        </div>
    );
};

export default Loading;
