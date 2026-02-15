import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AmbientBackgroundProps {
    variant?: 'default' | 'reading' | 'campaign';
}

export default function AmbientBackground({ variant = 'default' }: AmbientBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;

            containerRef.current.style.setProperty('--mouse-x', `${x}%`);
            containerRef.current.style.setProperty('--mouse-y', `${y}%`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="ambient-background"
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%'
            } as React.CSSProperties}
        >
            {/* Base Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

            {/* Gradient Orbs */}
            <motion.div
                className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            <motion.div
                className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)',
                    filter: 'blur(60px)'
                }}
                animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2
                }}
            />

            {variant === 'reading' && (
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
                        filter: 'blur(80px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            )}

            {/* Subtle Pattern Overlay */}
            <div className="pattern-overlay" />

            {/* Interactive Gradient Following Mouse */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 70, 229, 0.03), transparent 40%)`
                }}
            />
        </div>
    );
}
