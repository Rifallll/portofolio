import { useCallback } from 'react';

const useSciFiSound = () => {
    const playSound = useCallback((type: 'hover' | 'click' | 'active' = 'hover') => {
        try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            if (!AudioContextClass) return;

            const ctx = new AudioContextClass();
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            // Helper for very smooth gain envelope (removing clicking artifacts)
            const smoothGain = (startTime: number, duration: number, peak: number) => {
                gain.gain.cancelScheduledValues(startTime);
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(peak, startTime + (duration * 0.1));
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            };

            if (type === 'hover') {
                // SMOOTH HOVER: Ethereal and subtle
                osc.type = 'sine'; // Sine is softer than square/triangle

                // Slight organic detune
                osc.detune.setValueAtTime(Math.random() * 20 - 10, now);

                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.1);

                smoothGain(now, 0.1, 0.03); // Very quiet (3% volume)

                osc.start(now);
                osc.stop(now + 0.1);
            }
            else if (type === 'click') {
                // SATISFYING CLICK: "Glassy" tap
                osc.type = 'sine';

                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);

                smoothGain(now, 0.15, 0.08); // Moderate volume

                osc.start(now);
                osc.stop(now + 0.15);
            }
            else if (type === 'active') {
                // CHARGING SOUND: Soft "swell"
                osc.type = 'triangle';

                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(500, now + 0.3);

                smoothGain(now, 0.3, 0.05);

                osc.start(now);
                osc.stop(now + 0.3);
            }

        } catch (e) {
            console.error("Audio Engine Error:", e);
        }
    }, []);

    return { playSound };
};

export default useSciFiSound;
