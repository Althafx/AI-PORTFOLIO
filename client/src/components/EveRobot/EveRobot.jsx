import { useState, useEffect, useRef } from 'react';
import './EveRobot.css';
import AIChatbot from '../AIChatbot/AIChatbot';

const EveRobot = () => {
    const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [chatOpen, setChatOpen] = useState(false);
    const eveRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMoveGlobal);
            window.addEventListener('touchend', handleMouseUp);
        } else {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMoveGlobal);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleTouchMoveGlobal = (e) => {
        if (!isDragging || !e.touches[0]) return;

        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - dragOffset.x,
            y: touch.clientY - dragOffset.y
        });
    };

    const handleMouseDown = (e) => {
        if (!eveRef.current) return;

        const rect = eveRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        setDragOffset({ x: offsetX, y: offsetY });
        setIsDragging(true);
    };

    const handleTouchStart = (e) => {
        if (!eveRef.current || !e.touches[0]) return;

        const rect = eveRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const offsetX = touch.clientX - rect.left - rect.width / 2;
        const offsetY = touch.clientY - rect.top - rect.height / 2;

        setDragOffset({ x: offsetX, y: offsetY });
        setIsDragging(true);
    };

    const handleBubbleClick = (e) => {
        e.stopPropagation();
        setChatOpen(prev => !prev);
    };

    // Calculate eye pupil position based on mouse
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
        <>
            <div
                className="eve-container"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    pointerEvents: 'auto',
                    zIndex: 9999,
                    touchAction: 'none'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                ref={eveRef}
            >
                {/* Thought Bubble */}
                <div
                    className="thought-bubble"
                    style={{ pointerEvents: 'auto' }}
                    onClick={handleBubbleClick}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        handleBubbleClick(e);
                    }}
                >
                    <div className="bubble-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>ask about Althaf</span>
                    </div>
                    <div className="bubble-tail"></div>
                    <div className="bubble-tail-small"></div>
                </div>

                <div className="eve-robot">
                    <div className="eve-body">
                        <div className="eve-torso"></div>

                        <div className="eve-head">
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

                        <div className="eve-arm left-arm"></div>
                        <div className="eve-arm right-arm"></div>
                    </div>
                </div>
            </div>

            <AIChatbot isOpen={chatOpen} setIsOpen={setChatOpen} />
        </>
    );
};

export default EveRobot;
