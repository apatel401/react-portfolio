import { BackgroundBeams } from "./BackgroundBeams";
import ShinyButton from "./ShinyButton";
import Akash from "../assets/img/AP.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className="bg-[#0a0a0a] max-w-7xl mx-auto flex flex-col justify-center antialiased relative border border-gray-300 rounded-xl mb-5 px-8"
      id="contact"
    >
      <div>
        <div className="space-y-8 md:pt-10 flex pt-4">
          <img src={Akash} className="md:w-40 md:h-40 rounded-full w-20 h-20"  />
          <div className="md:ml-8 ml-2">
            <h3 className="text-xl md:text-3xl text-white font-bold leading-[110%] relative z-10 mb-8">
            Impressed with the work? Let’s team up.
              <br />
              I’d love to collaborate! Reach out
            </h3>
            <ShinyButton icon="📧" iconPosition="left">
              <a href="tel:+16476077560">Via Email</a>
            </ShinyButton>
            <ShinyButton icon="📞" iconPosition="left">
              <a href="tel:+16476077560">Schedule call</a>
            </ShinyButton>
          </div>
        </div>

        <div className="mt-4 md:p-8 p-4 border-t border-dark-200 dark:border-white/10 flex justify-around flex-col gap-8 md:gap-0">
          <div className="flex justify-between gap-0 sm:gap-16">
            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <p className="text-dark-200 hover:text-dark-200 dark:text-white sm:text-lg font-semibold mb-6">Navigate</p>
                <a href="/">Home</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="#projects">Work</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="#about">About</a>
              </li>
            </ul>
            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-lg font-semibold text-dark-200 hover:text-dark-200 dark:text-white">Projects</li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="https://www.tvo.org" target="_blank">TVO</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="https://www.tvolearn.com" target="_blank">TVO Learn</a>
              </li>
              <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="https://www.ilc.org" target="_blank">TVO ILC</a>
              </li>
                <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
                <a href="https://dapper-dashboard.netlify.app/" target="_blank">Dashboard</a>
              </li>
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
            </ul>

            <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
              <li className="text-lg dark:text-white text-dark-200 font-semibold">Socials</li>
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
          <hr className="my-4 text-dark-200/70 dark:text-stone-200/70 h-[2px]" />
                    <div className="flex flex-col items-center justify-center space-y-2.5 py-4">
            <h3 className="text-xl font-bold relative z-10 text-dark-200/70 dark:text-stone-200/70 ">
              Akash Patel
            </h3>
            <p className="text-dark-200/70 dark:text-stone-200/70 relative z-10">
              &copy; {currentYear} | All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Footer;