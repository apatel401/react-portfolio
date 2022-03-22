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
} from "react-icons/si";

export default function Skills() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1
              className="text-center mt-5 splitting chars"
              data-splitting="true">
              Skills
            </h1>
            <div className="skills d-flex flex-wrap justify-content-center">
            <SiHtml5 />
            <SiCss3 />
              <SiJavascript />
              <SiTypescript />
              <SiBootstrap />
              <SiGulp />
              <SiWebpack />
              <SiGrunt />
              <SiReact/>
              <SiAngular />
              <SiGraphql />
              <SiGit />
              <SiGithub />
              <SiNodedotjs />
              <SiNpm />
              <SiMongodb />
              <SiWordpress />
              <SiWindowsterminal />
              <SiW3C />
              <SiVisualstudiocode />
              <SiShopify />
              <SiSass />
              <SiTailwindcss />
              <SiPython />
              <SiPhp />
              <SiJquery />
              <SiJson />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
