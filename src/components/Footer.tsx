import { BackgroundBeams } from "./BackgroundBeams";
import ShinyButton from "./ShinyButton";

const Footer = () => {
  return (
    <div
      className="bg-[#0a0a0a] max-w-7xl mx-auto flex flex-col justify-center antialiased relative border border-gray-300 rounded-xl mb-5"
      id="contact"
    >
      <div>
        <div className="space-y-8 p-10">
          <h1 className="text-5xl text-white font-bold max-w-2xl leading-[110%] relative z-10">
            Like what you see? Reach out{" "}
            <a
              href="mailto:webdevbyakash@gmail.com"
              className="text-primary hover:text-primary/80 border-b-2 border-primary hover:border-primary/80 transition-colors duration-200"
            >
              via email
            </a>{" "}
            to collaborate!
          </h1>

          <ShinyButton>
            <a href="tel:+16476077560">Schedule call</a>
          </ShinyButton>
        </div>

        <div className="mt-16 p-10 border-t border-dark-200 dark:border-white/10 flex flex-col md:flex-row justify-between gap-10 md:gap-0">
          <div className="space-y-2.5">
            <h3 className="text-xl font-bold relative z-10">
              Akash Patel
            </h3>
            <p className="text-dark-200/70 dark:text-stone-200/70 relative z-10">
              &copy; 2025 | All rights reserved.
            </p>
          </div>

          <div className="flex justify-between gap-0 sm:gap-16">
            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-base sm:text-lg font-semibold">Navigate</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="/">Home</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="#work">Work</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="#about">About</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="#contact">Contact</a>
              </li>
            </ul>

            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-lg font-semibold">Projects</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a
                  href="https://github.com/andrijaweb/ecommerce-app"
                  target="_blank"
                >
                  Youtube Clone
                </a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a
                  href="https://github.com/andrijaweb/socialmedia-reactapp"
                  target="_blank"
                >
                  Netflix GPT
                </a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a
                  href="https://github.com/andrijaweb/nextCut-app"
                  target="_blank"
                >
                  Food ordering app
                </a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="/">Dashboard</a>
              </li>
            </ul>

            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-lg font-semibold">Socials</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a
                  href="https://www.linkedin.com/in/akash-patel-98885a182/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="https://github.com/apatel401" target="_blank">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <BackgroundBeams className="hidden sm:flex" />
    </div>
  );
};

export default Footer;