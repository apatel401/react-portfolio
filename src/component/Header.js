import React from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import {FcContacts, FcDocument, FcLightAtTheEndOfTunnel, FcHome} from "react-icons/fc"

import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Resume from "./Resume";
import Home from "./Home";
import Skills from "./Skills";

const Header = () => {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>Akash Patel</Navbar.Brand>
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
        </Container>
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
