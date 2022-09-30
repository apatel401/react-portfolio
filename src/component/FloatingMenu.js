import React from 'react'
import { ImFolderDownload } from "react-icons/im";
import { AiOutlineMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";

function FloatingMenu() {
  return (
    <ul className="floating-menu">
    <li>
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
    </li>
    <li>
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
    </li>
    <li>
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
    </li>
    <li>
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