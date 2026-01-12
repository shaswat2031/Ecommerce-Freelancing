import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextMarquee = () => {
    const trackRef = useRef(null);
    const textStr = "• HONESTY • INTEGRITY • PURITY • TRADITION ";

    useEffect(() => {
        const track = trackRef.current;

        // Calculate the width of the content (one set of text)
        // Since we are using xPercent: -50, we need the track to contain two identical halves.
        // We will render 4 copies just to be safe for very wide screens, and move by 25%? 
        // Simplest: 2 copies, move -50%. But if screen is super wide, one copy might not fill it?
        // Let's rely on standard horizontal loop logic:

        const ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth;
            // We want to move by half the width (since we duplicated the content)
            // But resizing ensures we re-calculate? 
            // For a simple marquee, let's just use a percentage move if the content is wide enough.

            gsap.to(track, {
                xPercent: -50,
                ease: "none",
                duration: 20, // Slowly scroll
                repeat: -1
            });
        }, trackRef);

        return () => ctx.revert();
    }, []);

    // We repeat the text string multiple times to ensure it covers the screen width easily.
    // Then we duplicate THAT whole block to create the loop.
    const content = (
        <span className="text-4xl md:text-6xl font-heading font-bold text-transparent text-stroke-accent uppercase tracking-widest px-4 select-none opacity-30">
            {textStr} {textStr} {textStr} {textStr}
        </span>
    );
    // Note: text-stroke-accent needs a custom utility or we just use text-accent/20.
    // I'll stick to text-accent/20 as in the previous attempt as 'text-stroke' isn't standard Tailwind without plugins.

    return (
        <div className="w-full bg-background py-16 overflow-hidden border-y border-secondary/10 flex items-center justify-center relative select-none pointer-events-none">
            {/* The Track */}
            <div ref={trackRef} className="flex whitespace-nowrap min-w-full">
                {/* Part 1 */}
                <div className="flex-shrink-0 px-4">
                    <span className="text-5xl md:text-7xl font-heading font-bold text-accent/10 uppercase tracking-[0.2em]">
                        {textStr} {textStr}
                    </span>
                </div>
                {/* Part 2 (Duplicate for loop) */}
                <div className="flex-shrink-0 px-4">
                    <span className="text-5xl md:text-7xl font-heading font-bold text-accent/10 uppercase tracking-[0.2em]">
                        {textStr} {textStr}
                    </span>
                </div>
            </div>

            {/* Overlay Gradient for fade effect on sides? Optional, maybe keep it clean. */}
        </div>
    );
};

export default TextMarquee;
