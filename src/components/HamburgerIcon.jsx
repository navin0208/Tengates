import { motion } from 'framer-motion';

const HamburgerIcon = ({ isOpen }) => {
  const transition = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  };

  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: isOpen ? -45 : 0 }}
      transition={transition}
    >
      {/* Static Middle Line */}
      <motion.path
        d="M7 16 27 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={false}
        animate={{ opacity: 1 }}
      />
      
      {/* Dynamic Morphing Path */}
      <motion.path
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          strokeDasharray: isOpen ? "20 300" : "12 63",
          strokeDashoffset: isOpen ? -32.42 : 0,
        }}
        transition={transition}
      />
    </motion.svg>
  );
};

export default HamburgerIcon;
