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
      "skillName" :"HTML5",
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
      "skillName" :"HTML5",
      "skillIcon": 
      <SiBootstrap />,
      "progress": "95"
    },
    {
      "id": "6",
      "skillName" :"HTML5",
      "skillIcon":  <SiGulp />,
      "progress": "98"
    },
    {
      "id": "7",
      "skillName" :"Javascript",
      "skillIcon":  <SiWebpack />,
      "progress": "94"
    },
    {
      "id": "8",
      "skillName" :"Typescript",
      "skillIcon": <SiGrunt />,
      "progress": "85"
    },
    {
      "id": "9",
      "skillName" :"HTML5",
      "skillIcon":  <SiReact/>,
      "progress": "98"
    },
    {
      "id": "10",
      "skillName" :"Javascript",
      "skillIcon": <SiAngular />,
      "progress": "94"
    },
    {
      "id": "11",
      "skillName" :"Typescript",
      "skillIcon":  <SiVuedotjs/>,
      "progress": "85"
    },
    {
      "id": "12",
      "skillName" :"HTML5",
      "skillIcon": <SiGraphql />,
      "progress": "95"
    },
    {
      "id": "13",
      "skillName" :"HTML5",
      "skillIcon": <SiGit />,
      "progress": "95"
    },
    {
      "id": "14",
      "skillName" :"HTML5",
      "skillIcon":  <SiGithub />,
      "progress": "98"
    },
    {
      "id": "15",
      "skillName" :"Javascript",
      "skillIcon": <SiNodedotjs />,
      "progress": "94"
    },
    {
      "id": "16",
      "skillName" :"Typescript",
      "skillIcon": <SiNpm />,
      "progress": "85"
    },
    {
      "id": "17",
      "skillName" :"HTML5",
      "skillIcon": <SiMongodb />,
      "progress": "95"
    },
    {
      "id": "18",
      "skillName" :"HTML5",
      "skillIcon": <SiWordpress />,
      "progress": "98"
    },
    {
      "id": "19",
      "skillName" :"Javascript",
      "skillIcon": <SiWindowsterminal />,
      "progress": "94"
    },
    {
      "id": "20",
      "skillName" :"Typescript",
      "skillIcon": <SiW3C />,
      "progress": "85"
    },
    {
      "id": "21",
      "skillName" :"HTML5",
      "skillIcon": <SiVisualstudiocode />,
      "progress": "98"
    },
    {
      "id": "22",
      "skillName" :"Javascript",
      "skillIcon": <SiSass />,
      "progress": "94"
    },
    {
      "id": "23",
      "skillName" :"Typescript",
      "skillIcon": <SiShopify />,
      "progress": "85"
    },
    {
      "id": "24",
      "skillName" :"HTML5",
      "skillIcon": <SiTailwindcss />,
      "progress": "95"
    },
    {
      "id": "25",
      "skillName" :"HTML5",
      "skillIcon": <SiPhp />,
      "progress": "95"
    },
    {
      "id": "26",
      "skillName" :"HTML5",
      "skillIcon": <SiJquery />,
      "progress": "95"
    }, 
    {
      "id": "27",
      "skillName" :"HTML5",
      "skillIcon": <SiJson />,
      "progress": "95"
    },
    {
      "id": "28",
      "skillName" :"HTML5",
      "skillIcon": <SiPython />,
      "progress": "95"
    }  
  ]
  return (
    <>
      <div className="container-fluid" id="skills">
        <div className="row">
          <div className="col-12">
            <h1
              className="text-center mt-5 splitting chars"
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
