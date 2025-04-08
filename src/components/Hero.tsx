import { useEffect, useRef } from 'react';
import {Button } from 'react-scroll'
import { gsap } from 'gsap';
import { HeroHighlight } from './HeroHighlight';
import { TextGenerateEffect } from './TextGenerated';

const HeroSection = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<null>(null);

    // GSAP Animation for text
    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: -100 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        );
        gsap.fromTo(
            descriptionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power3.out' }
        );
        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.125, ease: 'power3.out' }
        );
    }, []);

    return (
        <HeroHighlight className='flex flex-col justify-center items-center gap-8' >
            <TextGenerateEffect 
            words="Blending Creativity with Seamless Web Experiences"
            className="text-[40px] md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-snug tracking-wide"
            />
            <p ref={titleRef} className='text-white text-xl text-center max-w-5xl text-dark-200 dark:text-stone-200/90'>Hello! I'm Akash. I specialize in building high-performance, visually stunning web applications where code meets creativity, transforming ideas into seamless user experiences.</p>
            <p ref={descriptionRef} className="text-white text-xl sm:text-2xl">
                Software Developer | Front End Developer | Educator | Innovator
            </p>

            <Button to='projects' smooth={true} duration={500} ref={buttonRef} className="p-[3px] relative text-center hover:cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    Explore My Work
                </div>
            </Button>
        </HeroHighlight>
    );
};

export default HeroSection;