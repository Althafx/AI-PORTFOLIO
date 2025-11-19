import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    const characterRef = useRef(null);
    const eyesRef = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Move the character's head to follow mouse
            if (characterRef.current) {
                const rect = characterRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = mouseX - centerX;
                const deltaY = mouseY - centerY;

                // Calculate rotation angles (limited range for natural movement)
                const maxRotation = 15;
                const rotateX = Math.max(-maxRotation, Math.min(maxRotation, (deltaY / window.innerHeight) * maxRotation * 2));
                const rotateY = Math.max(-maxRotation, Math.min(maxRotation, (deltaX / window.innerWidth) * maxRotation * 2));

                characterRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            }

            // Move eyes to follow mouse
            eyesRef.current.forEach((eye) => {
                if (eye) {
                    const rect = eye.getBoundingClientRect();
                    const eyeCenterX = rect.left + rect.width / 2;
                    const eyeCenterY = rect.top + rect.height / 2;

                    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
                    const distance = Math.min(8, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) / 50);

                    const pupilX = Math.cos(angle) * distance;
                    const pupilY = Math.sin(angle) * distance;

                    const pupil = eye.querySelector('.pupil');
                    if (pupil) {
                        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
                    }
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="animated-background">
            {/* Floating particles */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* Animated character */}
            <div className="character-container">
                <div className="character" ref={characterRef}>
                    {/* Head */}
                    <div className="head">
                        {/* Eyes */}
                        <div className="eyes">
                            <div className="eye" ref={(el) => (eyesRef.current[0] = el)}>
                                <div className="pupil"></div>
                            </div>
                            <div className="eye" ref={(el) => (eyesRef.current[1] = el)}>
                                <div className="pupil"></div>
                            </div>
                        </div>

                        {/* Mouth */}
                        <div className="mouth"></div>
                    </div>

                    {/* Body */}
                    <div className="body">
                        <div className="torso"></div>

                        {/* Arms */}
                        <div className="arm arm-left"></div>
                        <div className="arm arm-right"></div>
                    </div>
                </div>
            </div>

            {/* Gradient orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
        </div>
    );
};

export default AnimatedBackground;
