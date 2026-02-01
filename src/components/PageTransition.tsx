import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const variants = {
    initial: {
        opacity: 0,
        filter: 'blur(8px)',
    },
    enter: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] // Custom easeOutQuint-ish curve for "snappy but smooth" feel
        }
    },
    exit: {
        opacity: 0,
        filter: 'blur(8px)',
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full min-h-screen"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
