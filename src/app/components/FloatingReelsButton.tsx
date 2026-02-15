import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Video } from 'lucide-react';

export const FloatingReelsButton = () => {
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    return (
        <Link
            to="/reels"
            className="fixed z-50 group"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
        >
            <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F15A24] to-[#C2410C] rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity animate-pulse scale-125" />

                {/* Button */}
                <div className="relative bg-gradient-to-r from-[#F15A24] to-[#C2410C] text-white rounded-full p-6 shadow-[0_0_40px_rgba(241,90,36,0.6)] hover:shadow-[0_0_60px_rgba(241,90,36,0.8)] transition-all duration-300 hover:scale-110 border-4 border-white/20 backdrop-blur-md">
                    <Video className="h-10 w-10 drop-shadow-lg" strokeWidth={2.5} />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-md text-white px-4 py-2 rounded-xl text-base font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 pointer-events-none border border-gray-800 shadow-xl">
                    Watch Reels
                </div>
            </div>
        </Link>
    );
};
