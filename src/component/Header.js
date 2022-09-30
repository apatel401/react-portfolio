import React, { useContext} from "react";
import NewProjects from "./NewProjects";
import Contact from "./Contact";
import {FcContacts, FcDocument, FcLightAtTheEndOfTunnel} from "react-icons/fc"

import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfRes from "./ProfRes";
import Home from "./Home";
import Skills from "./Skills";
import ComponentLibrary from "./ComponentLibrary"
// import {FaSun, FaMoon} from "react-icons/fa";


const Header = () => {

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg">
      <div className="container">
      <Nav.Link as={Link} to={"/"} className="custom-link">
      <Navbar.Brand as={Link} to={"/"} className="custom-link">Akash Patel</Navbar.Brand>
              </Nav.Link>
          {/* <div className="themeChange" onClick={switchTheme}>
              {context.theme === "dark" ? <FaSun /> : <FaMoon />}
              </div> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
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
      <div className="container-fluid">
      <div className="row">
        <div className="col-12">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/skills">
          <Skills />
        </Route>
        <Route path="/projects">
          <NewProjects />
        </Route>
        <Route path="/resume">
          <ProfRes />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/component-library">
          <ComponentLibrary />
        </Route>
        
      </Switch>
      </div>
    </div>
    </div>
    </Router>
  );
};

export default Header;