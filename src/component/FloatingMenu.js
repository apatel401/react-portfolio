import React from 'react'
import { ImFolderDownload } from "react-icons/im";
import { AiOutlineMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";

function FloatingMenu() {
  return (
    <ul className="floating-menu">
    <li>
      <a href="./assets/akash-patel-software-dev.pdf" download>
      <Tooltip
        content={
          <>
            <span>Download Resume</span>
          </>
        }
        direction="right"
        delay="0">
        <button>
          <ImFolderDownload />
        </button>
      </Tooltip>
      </a>
    </li>
    <li>
      <a href='https://www.linkedin.com/in/akash-patel-98885a182/' target="_blank">
      <Tooltip
        content={
          <>
            <span>LinkedIn</span>
          </>
        }
        direction="right"
        delay="0">
        <button as={Link} to={{ pathname: "###" }} target="_blank">
          <AiFillLinkedin />
        </button>
      </Tooltip>
      </a>
    </li>
    <li>
      <a href="https://github.com/apatel401" target="_blank">
      <Tooltip
        content={
          <>
            <span>GitHub</span>
          </>
        }
        direction="right"
        delay="0">
        <button>
          <AiFillGithub />
        </button>
      </Tooltip>
      </a>
    </li>
    <li>
      <a href='mailto:webdevbyakash@gmail.com' target="_blank">
      <Tooltip
        content={
          <>
            <span>Mail</span>
          </>
        }
        direction="right"
        delay="0">
        <button>
          <AiOutlineMail />
        </button>
      </Tooltip>
      </a>
    </li>
    <li>
      <Tooltip
        content={
          <>
            <span>Download Resume</span>
          </>
        }
        direction="right"
        delay="0"></Tooltip>
    </li>
  </ul>
  )
}

export default FloatingMenu