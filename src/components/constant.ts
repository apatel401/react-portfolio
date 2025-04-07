import reactLogo from "../assets/reactjs.svg";
import nextLogo from "../assets/nextjs.svg";
import nodeLogo from "../assets/nodejs.svg";
import tailwindLogo from "../assets/tailwindcss.svg";
import typescriptLogo from "../assets/typescript.svg";
import javascriptLogo from "../assets/javascript.svg";
import gitLogo from "../assets/git.svg";
import gulpLogo from "../assets/gulp.svg";
import webpackLogo from "../assets/webpack.svg";
import gruntLogo from "../assets/gruntjs.svg";
import angularLogo from "../assets/angular.svg";
import vueLogo from "../assets/vuejs.svg";
import graphqlLogo from "../assets/graphql.svg";
import mongodbLogo from "../assets/mongodb.svg";
import wordpressLogo from "../assets/wordpress.svg";
import phpLogo from "../assets/php.svg";
import w3cLogo from "../assets/w3c.svg";  
import sassLogo from "../assets/sass.svg";
import shopifyLogo from "../assets/shopify.svg";
import jqueryLogo from "../assets/jquery.svg";
import pythonLogo from "../assets/python.svg";
import threejsLogo from "../assets/threejs.svg";
import youtubClone from "../assets/img/yt-clone.png";
import netflixGPT from "../assets/img/netflix-gpt.png";
import periodicTable from "../assets/img/periodic-table.png";
import foodOrdering from "../assets/img/food-ordering.png";
import dashboard from "../assets/img/dashboard.png";
import inuktitut from "../assets/img/inuktut.png";
import inhabit from "../assets/img/inhabit.png";
import ukaliq from "../assets/img/ukaliq.png";
import Eyeofnewt from "../assets/img/eyeofnewt.png";
import Anaanastent from "../assets/img/anaana.png";

export type SkillCard = {
  name: string;
  description: string;
  imageUrl: string;
  bgColor: string;
};

export type Project = {
  name: string;
  id: string;
  heading: string;
  liveDemoUrl: string;
  description: string;
  imageUrl: string;
  sourceCodeUrl: string;
  techStack: string[];
};

export const skillCards : SkillCard[] = [
  {
    name: "React",
    description: "JavaScript Library",
    imageUrl: reactLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "NextJS",
    description: "React framework",
    imageUrl: nextLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "TypeScript",
    description: "JavaScript but better",
    imageUrl: typescriptLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "JavaScript",
    description: "JavaScript",
    imageUrl: javascriptLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Tailwind",
    description: "CSS framework",
    imageUrl: tailwindLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Git",
    description: "Version control",
    imageUrl: gitLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Gulp",
    description: "JavaScript task runner",
    imageUrl: gulpLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Webpack",
    description: "JavaScript module bundler",
    imageUrl: webpackLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Grunt",
    description: "JavaScript task runner",
    imageUrl: gruntLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Angular",
    description: "Web application framework",
    imageUrl: angularLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Vue",
    description: "Progressive JavaScript framework",
    imageUrl: vueLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "GraphQL",
    description: "Query language for APIs",
    imageUrl: graphqlLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Node.js",
    description: "JavaScript runtime",
    imageUrl: nodeLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "MongoDB",
    description: "NoSQL database",
    imageUrl: mongodbLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "WordPress",
    description: "CMS platform",
    imageUrl: wordpressLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "PHP",
    description: "Server-side scripting language",
    imageUrl: phpLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "W3C",
    description: "Web standards",
    imageUrl: w3cLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "SASS",
    description: "CSS preprocessor",
    imageUrl: sassLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Shopify",
    description: "E-commerce platform",
    imageUrl: shopifyLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "jQuery",
    description: "JavaScript library",
    imageUrl: jqueryLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Python",
    description: "Programming language",
    imageUrl: pythonLogo,
    bgColor: "bg-[#61DAFB]/20",
  },
  {
    name: "Three JS",
    description: "JavaScript 3D library",
    imageUrl: threejsLogo,
    bgColor: "bg-[#61DAFB]/20",
  }
];


export const projectData = [
  {
    name: "Inuktut Ilinniaqta",
    id: "Inuktut Ilinniaqta",
    heading: "Inuktut Ilinniaqta",
    liveDemoUrl:
      "https://inuktut-ilinniaqta.com/",
    description: "A multilingual WordPress website built using PHP, MySQL, and JavaScript, delivering educational content to students in four different languages. Developed with a custom theme and plugins, the site ensures a smooth and engaging experience across devices, following modern development standards.",
    imageUrl: inuktitut,
    sourceCodeUrl:"",
    techStack: ["Wordpress", "PHP", "MySQL", "Javascript", "React", "NodeJS", "Sass", "Webpack", "Gulp"],
  },
  {
    name: "Inhabit Educations",
    id: "Inhabit Educations",
    heading: "Inhabit Educations",
    liveDemoUrl:
    "https://inhabiteducationbooks.com/",
    description: "Multiple Choice is interactive learning object/widget that shows question is asked to student and student need to select their responses. ILO also include validation of answers and giving feedback on submition of answer, This ILO features a fully configurable json file to switch between secondary and elementary modes. The ILO is fully responsive and AODA compliant. Widget is currently used by students who enrolled in TVO courses and Ontario Ministry Curriculum",
    imageUrl: inhabit,
    sourceCodeUrl: " ",
    techStack: ["Wordpress", "PHP", "Javascript", "MySQL", "React", "NodeJS", "Webpack"],
  },
  {
    name: "Ukaliq & Kalla",
    id: "Ukaliq & Kalla",
    heading: "Ukaliq & Kalla",
    liveDemoUrl: "",
    description: "A custom-built WordPress website developed with a fully tailored theme, custom plugins, and a MySQL database. The backend is powered by PHP, while the frontend features interactive HTML5 canvas-based games for an engaging user experience.",
    imageUrl: ukaliq,
    sourceCodeUrl: "https://github.com/apatel401/AG-MERN-Project-management",
    techStack: ["Wordpress", "Javascript", "MySQL", "PHP", "React", "NodeJS", "Webpack"],
  },
  {
    name: "Eye of Newt",
    id:"Eye of Newt",
    heading: "Eye of Newt",
    liveDemoUrl: "https://www.eyeofnewtpress.com/",
    description: "A custom Shopify eCommerce website designed for selling books, built using Liquid templates along with HTML, CSS, and JavaScript for enhanced interactivity and user experience. The site supports multi-currency sales, ensuring global accessibility, and includes full backend configuration for secure payment integrations, shipping, and store management.",
    imageUrl: Eyeofnewt,
    sourceCodeUrl:"",
    techStack: ["Shopify", "Liquid", "React", "NodeJS", "Sass", "Webpack", "Gulp"],
  },
  {
    name: "Anaana's Tent",
    id: "Anaana's Tent",
    heading: "Anaana's Tent",
    liveDemoUrl: "https://anaanas-tent.com/",
    description: "Anaana's tent made with Wordpress, Ruby on Rails, PostgresSQL, Heroku",
    imageUrl: Anaanastent,
    sourceCodeUrl: " ",
    techStack: ["Wordpress" ,"Ruby on Rails", "PostgresSQL", "", "Sass", "Webpack"],
  },
  {
    name: "YouTube Clone",
    id: "youtube-clone",
    heading: "YouTube Clone",
    liveDemoUrl:
      "https://yt-clone-apatel.netlify.app/",
    description: "Created Youtube clone using Youtube APIs, Learned Debouncing and applied it in search box to optimized Performance.",
    imageUrl: youtubClone,
    sourceCodeUrl: "https://github.com/apatel401/youtube_clone",
    techStack:[ "React", "Redux", "Tailwind CSS", "Youtube APIs","Rapid APIs", "CRA"],
  },
  {
    name: "Netflix GPT",
    id: "Netflix-GPT",
    heading: "Netflix GPT",
    liveDemoUrl:
    "https://moviedbgpt.netlify.app/",
    description: "Created Netflix clone using TMDB APIs. Levereged ChatGPT APIs to get the movie suggestions on search",
    imageUrl: netflixGPT,
    sourceCodeUrl: "https://github.com/apatel401/netflix-GPT",
    techStack: ["React", "Redux", "Tailwind CSS","OPENAI APIs(chatGPT 3.5)", "TMDB APIs"],
  },
  {
    name: "Periodic table",
    id: "periodic-table",
    heading: "periodic table",
    liveDemoUrl:
      "https://periodic-table-with-bohr-model.netlify.app",
    description: "Built periodic table showing all 118 elements and showing details of each element on click. Dynamically created bohr model for each using React Three Fiber",
    imageUrl: periodicTable,
    sourceCodeUrl: "https://github.com/apatel401/youtube_clone",
    techStack: ["React", "React Three Fiber", "React three Drei", "React three cannon", "Vite", "Sass"],
  },
  {
    name: "Food Ordering App",
    id: "foodordering",
    heading: "Food Ordering App",
    liveDemoUrl:
      "https://food-ordering-4692.netlify.app/",
    description: "Created Food ordering app using Swiggy APIs.",
    imageUrl: foodOrdering,
    sourceCodeUrl: "https://github.com/apatel401/food-ordering-app",
    techStack: ["React", "Redux", "Tailwind CSS"," Swiggy APIs", "Parcel", "Jest"],
  },
  {
    name: "Dashboard",
    id: "Dashboard",
    heading: "Dashboard",
    liveDemoUrl: "https://dapper-dashboard.netlify.app/",
    description:
      "React Admin Dashboard Application. This Admin Panel includes one Dashboard, Three Pages, Four Apps, and Seven fully functional charts! using SyncFusion components",
    imageUrl: dashboard,
    sourceCodeUrl: "https://github.com/apatel401/dashboard",
    techStack: ["React", "NodeJS", "Webpack", "Tailwind UI", "SyncFusion"],
  }
];