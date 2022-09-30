import React from "react";
import {
  SiHtml5,
  SiBootstrap,
  SiCss3,
  SiGulp,
  SiGit,
  SiGithub,
  SiGrunt,
  SiGraphql,
  SiWebpack,
  SiAngular,
  SiJavascript,
  SiNodedotjs,
  SiNpm,
  SiReact,
  SiTypescript,
  SiMongodb,
  SiWordpress,
  SiWindowsterminal,
  SiW3C,
  SiVisualstudiocode,
  SiShopify,
  SiSass,
  SiTailwindcss,
  SiPython,
  SiPhp,
  SiJquery,
  SiJson,
  SiVuedotjs,
} from "react-icons/si";
import {ProgressBar} from "react-bootstrap"

import Tooltip from "./Tooltip";


export default function Skills() {
  const skillData = [
    {
      "id": "1",
      "skillName" :"HTML5",
      "skillIcon": <SiHtml5 />,
      "progress": "95"
    },
    {
      "id": "2",
      "skillName" :"CSS3",
      "skillIcon": <SiCss3 />,
      "progress": "98"
    },
    {
      "id": "3",
      "skillName" :"Javascript",
      "skillIcon": <SiJavascript />,
      "progress": "94"
    },
    {
      "id": "4",
      "skillName" :"Typescript",
      "skillIcon": <SiTypescript />,
      "progress": "85"
    },
    {
      "id": "5",
      "skillName" :"Bootstrap",
      "skillIcon": 
      <SiBootstrap />,
      "progress": "95"
    },
    {
      "id": "6",
      "skillName" :"Gulp",
      "skillIcon":  <SiGulp />,
      "progress": "98"
    },
    {
      "id": "7",
      "skillName" :"Webpack",
      "skillIcon":  <SiWebpack />,
      "progress": "94"
    },
    {
      "id": "8",
      "skillName" :"Grunt",
      "skillIcon": <SiGrunt />,
      "progress": "85"
    },
    {
      "id": "9",
      "skillName" :"React",
      "skillIcon":  <SiReact/>,
      "progress": "98"
    },
    {
      "id": "10",
      "skillName" :"Angular",
      "skillIcon": <SiAngular />,
      "progress": "88"
    },
    {
      "id": "11",
      "skillName" :"Vue.js",
      "skillIcon":  <SiVuedotjs/>,
      "progress": "80"
    },
    {
      "id": "12",
      "skillName" :"Graphql",
      "skillIcon": <SiGraphql />,
      "progress": "95"
    },
    {
      "id": "13",
      "skillName" :"Git",
      "skillIcon": <SiGit />,
      "progress": "95"
    },
    {
      "id": "14",
      "skillName" :"Github",
      "skillIcon":  <SiGithub />,
      "progress": "98"
    },
    {
      "id": "15",
      "skillName" :"Node.js",
      "skillIcon": <SiNodedotjs />,
      "progress": "94"
    },
    {
      "id": "16",
      "skillName" :"Npm",
      "skillIcon": <SiNpm />,
      "progress": "85"
    },
    {
      "id": "17",
      "skillName" :"Mongodb",
      "skillIcon": <SiMongodb />,
      "progress": "80"
    },
    {
      "id": "18",
      "skillName" :"Wordpress",
      "skillIcon": <SiWordpress />,
      "progress": "98"
    },
    {
      "id": "19",
      "skillName" :"Windowsterminal",
      "skillIcon": <SiWindowsterminal />,
      "progress": "94"
    },
    {
      "id": "20",
      "skillName" :"W3C",
      "skillIcon": <SiW3C />,
      "progress": "85"
    },
    {
      "id": "21",
      "skillName" :"Visualstudiocode",
      "skillIcon": <SiVisualstudiocode />,
      "progress": "98"
    },
    {
      "id": "22",
      "skillName" :"Sass",
      "skillIcon": <SiSass />,
      "progress": "94"
    },
    {
      "id": "23",
      "skillName" :"Shopify",
      "skillIcon": <SiShopify />,
      "progress": "85"
    },
    {
      "id": "24",
      "skillName" :"Tailwindcss",
      "skillIcon": <SiTailwindcss />,
      "progress": "95"
    },
    {
      "id": "25",
      "skillName" :"Php",
      "skillIcon": <SiPhp />,
      "progress": "95"
    },
    {
      "id": "26",
      "skillName" :"Jquery",
      "skillIcon": <SiJquery />,
      "progress": "95"
    }, 
    {
      "id": "27",
      "skillName" :"Json",
      "skillIcon": <SiJson />,
      "progress": "90"
    },
    {
      "id": "28",
      "skillName" :"Python",
      "skillIcon": <SiPython />,
      "progress": "88"
    }  
  ]
  return (
    <>
      <div className="container-fluid" id="skills">
        <div className="row">
          <div className="col-12">
            <h1
              className="text-center mt-3 splitting chars"
              data-splitting="true">
              Skills
            </h1>
            <div className="skills d-flex flex-wrap justify-content-center">
              {
                skillData.map((icon) =>{
                  let defining = icon.skillIcon;
                  return(
                    <Tooltip
                    content={
                      <>
                      <span className="skill-title">{icon.skillName}</span>
                      <ProgressBar now={icon.progress} label={`${icon.progress}%`}/>
                      </>
                    }
                    direction="top"
                    delay="0"
                  >
                   {defining}
                  </Tooltip>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
