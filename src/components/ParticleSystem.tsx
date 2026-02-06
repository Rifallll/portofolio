import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

const ParticleSystem: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles - REDUCED COUNT for performance
        const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 25000), 40);
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
        }));

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        // Animation loop
        const animate = (time: number) => {
            // Throttle or handle visibility
            if (document.hidden) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Simplified drawing for performance
            ctx.fillStyle = `rgba(34, 211, 238, 0.4)`;
            ctx.lineWidth = 0.5;

            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Mouse interaction - slightly simpler math
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 22500) { // 150 * 150
                    const distance = Math.sqrt(distSq);
                    const force = (150 - distance) / 150;
                    particle.x -= (dx / distance) * force * 1.5;
                    particle.y -= (dy / distance) * force * 1.5;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw connections - optimized distance check
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const cdx = particle.x - other.x;
                    const cdy = particle.y - other.y;
                    const cDistSq = cdx * cdx + cdy * cdy;

                    if (cDistSq < 10000) { // 100 * 100
                        const distance = Math.sqrt(cDistSq);
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        const opacity = (1 - distance / 100) * 0.1;
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                        ctx.stroke();
                    }
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.4 }}
        />
    );
};

export default ParticleSystem;
