import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 200) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            const elements = ids.map((id) => document.getElementById(id));

            let currentActiveId = '';

            for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i];
                if (element && element.offsetTop <= scrollPosition) {
                    currentActiveId = ids[i];
                    break;
                }
            }

            setActiveId(currentActiveId || ids[0]);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ids, offset]);

    return activeId;
}
