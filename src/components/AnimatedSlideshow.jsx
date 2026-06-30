import React, { useState, useCallback, createContext, useContext } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import styles from './AnimatedSlideshow.module.css';

const HoverSliderContext = createContext(undefined);

function useHoverSliderContext() {
  const context = useContext(HoverSliderContext);
  if (context === undefined) {
    throw new Error("useHoverSliderContext must be used within a HoverSliderProvider");
  }
  return context;
}

export const HoverSlider = ({ children, className }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const changeSlide = useCallback((index) => setActiveSlide(index), []);

  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className}>{children}</div>
    </HoverSliderContext.Provider>
  );
};

function splitText(text) {
  const words = text.split(" ").map((word) => word.concat(" "));
  const characters = words.map((word) => word.split("")).flat(1);
  return { characters };
}

export const TextStaggerHover = ({ text, index, className }) => {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const { characters } = splitText(text);
  const isActive = activeSlide === index;

  return (
    <span
      className={`${styles.textStaggerWrapper} ${className || ''}`}
      onMouseEnter={() => changeSlide(index)}
    >
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className={styles.charWrapper}>
          <MotionConfig
            transition={{
              delay: i * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className={styles.charInactive}
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && i < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className={styles.charActive}
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  );
};

export const HoverSliderImageWrap = ({ children, className }) => {
  return (
    <div className={`${styles.imageWrap} ${className || ''}`}>
      {children}
    </div>
  );
};

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};

export const HoverSliderImage = ({ index, imageUrl, className, alt }) => {
  const { activeSlide } = useHoverSliderContext();
  return (
    <motion.img
      className={`${styles.sliderImg} ${className || ''}`}
      src={imageUrl}
      alt={alt}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
    />
  );
};

const SLIDES = [
  {
    id: "slide-1",
    title: "Turnkey Construction",
    imageUrl: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-2",
    title: "Industrial Warehousing",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed74514fa?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-3",
    title: "Cold Storage ",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-4",
    title: "Pre-Engineered Buildings",
    imageUrl: "https://images.unsplash.com/photo-1590495958611-3e4e9791404f?q=80&w=2487&auto=format&fit=crop",
  },
  {
    id: "slide-5",
    title: "Precision MEP",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2487&auto=format&fit=crop",
  },
];

export function AnimatedSlideshow() {
  return (
    <HoverSlider className={styles.slideshowSection}>
      <div className={styles.header}>
        <span className="subheading">Our Expertise</span>
        <h2 className="heading-md">Capabilities</h2>
      </div>

      <div className={styles.layoutWrapper}>
        <div className={styles.textColumn}>
          {SLIDES.map((slide, index) => (
            <TextStaggerHover
              key={slide.id}
              index={index}
              className={styles.slideTitle}
              text={slide.title}
            />
          ))}
        </div>

        <HoverSliderImageWrap className={styles.imageColumn}>
          {SLIDES.map((slide, index) => (
            <div key={slide.id} className={styles.imageGridItem}>
              <HoverSliderImage
                index={index}
                imageUrl={slide.imageUrl}
                alt={slide.title}
              />
            </div>
          ))}
        </HoverSliderImageWrap>
      </div>
    </HoverSlider>
  );
}

export default AnimatedSlideshow;
