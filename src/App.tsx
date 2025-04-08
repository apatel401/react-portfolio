import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { Navbar } from './components/Navbar';
import {FaBriefcase, FaHome, FaUser} from 'react-icons/fa';
import { MdPermContactCalendar } from "react-icons/md";
import Experience from './components/Experience';

const navItems = [
  { name: "Home", link: "home", icon: <FaHome /> },
  { name: "Work", link: "projects", icon: <FaBriefcase /> },
  { name: "About", link: "about", icon: <FaUser/> },
  { name: "Contact", link: "contact", icon: <MdPermContactCalendar /> },
];

const App = () => {
  return (
    <div className={'bg-black'} id='home'>
      <main className='w-full'>
      <Navbar navItems={navItems}  />
      <Sidebar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
      </main>
    </div>
  );
};

export default App;
