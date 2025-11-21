import { useState, useEffect, useRef } from 'react';
import './EveRobot.css';

const EveRobot = () => {
    const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const eveRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Calculate eye pupil position based on mouse - more accurate tracking
    const getEyePosition = (eyeOffsetX, eyeOffsetY) => {
        if (!eveRef.current) return { x: 0, y: 0 };

        const rect = eveRef.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2 + eyeOffsetX;
        const eyeY = rect.top + rect.height / 2 + eyeOffsetY;

        const dx = mousePos.x - eyeX;
        const dy = mousePos.y - eyeY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 200, 1);

        return {
            x: Math.cos(angle) * distance * 5,
            y: Math.sin(angle) * distance * 3
        };
    };

    const leftEyePos = getEyePosition(-20, -15);
    const rightEyePos = getEyePosition(20, -15);

    return (
        <div className="eve-container">
            <div className="eve-robot" ref={eveRef}>
                {/* EVE's body */}
                <div className="eve-body">
                    {/* Main egg-shaped body */}
                    <div className="eve-torso"></div>

                    {/* Dark screen head */}
                    <div className="eve-head">
                        {/* Blue glowing eyes */}
                        <div className="eve-eyes">
                            <div className="eve-eye left-eye">
                                <div
                                    className="eye-pupil"
                                    style={{
                                        transform: `translate(calc(-50% + ${leftEyePos.x}px), calc(-50% + ${leftEyePos.y}px))`
                                    }}
                                ></div>
                            </div>
                            <div className="eve-eye right-eye">
                                <div
                                    className="eye-pupil"
                                    style={{
                                        transform: `translate(calc(-50% + ${rightEyePos.x}px), calc(-50% + ${rightEyePos.y}px))`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Arms - sleek and thin */}
                    <div className="eve-arm left-arm"></div>
                    <div className="eve-arm right-arm"></div>
                </div>
            </div>
        </div>
    );
};

export default EveRobot;
