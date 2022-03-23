import React, { useContext} from "react";
// import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import {FcContacts, FcDocument, FcLightAtTheEndOfTunnel, FcHome} from "react-icons/fc"

import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Resume from "./Resume";
import Home from "./Home";
import Skills from "./Skills";
import {FaSun, FaMoon} from "react-icons/fa";
import { ThemeContext } from "./Provider";


const Header = () => {
  const context = useContext(ThemeContext);
console.log(context);
  function switchTheme() {
    const newTheme = context.theme === "dark" ? "light" : "dark";
    context.updateContext({ theme: newTheme });
  }

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg">
      <div className="container">
          <Navbar.Brand>Akash Patel</Navbar.Brand>
          <div className="themeChange" onClick={switchTheme}>
              {context.theme === "dark" ? <FaSun /> : <FaMoon />}
              </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to={"/"} className="custom-link">
                <FcHome /> Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/skills"} className="custom-link">
                <FcLightAtTheEndOfTunnel /> skills
              </Nav.Link>
              <Nav.Link as={Link} to={"/projects"} className="custom-link">
                <FcLightAtTheEndOfTunnel /> Projects
              </Nav.Link>
              <Nav.Link as={Link} to={"/resume"} className="custom-link">
                <FcDocument /> Resume
              </Nav.Link>
              <Nav.Link as={Link} to={"/contact"} className="custom-link">
                <FcContacts /> Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </div>        
      </Navbar>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/skills">
          <Skills />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/resume">
          <Resume />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  );
};

export default Header;
