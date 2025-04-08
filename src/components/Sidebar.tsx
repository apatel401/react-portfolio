import { useState } from "react";
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope } from "react-icons/fa";

const Sidebar = () => {
  const [tooltip, setTooltip] = useState<String>("");
  const links = [
    { href: "https://github.com/apatel401", icon: <FaGithub />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/akash-patel-98885a182/", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://drive.google.com/file/d/1Stzgdrysd30VznhLp8I3QBRVXv23w3Tm/view?usp=sharing-software-dev.pdf", icon: <FaFileAlt />, label: "Resume" },
    { href: "mailto:webdevbyakash@gmail.com", icon: <FaEnvelope />, label: "Email" },
  ];

  return (
    <aside className="fixed right-0 top-1/2 transform -translate-y-1/2 flex bg-gray-900 flex-col space-y-4 bg-opacity-10 backdrop-blur-lg p-2 rounded-lg z-99">
      {links.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center relative"
          title={label}
          onMouseEnter={() => setTooltip(label)}
          onMouseLeave={() => setTooltip("")}
        >
          <div className="sidebar-icon m-3 text-white text-2xl hover:bg-royalBlue hover:bg-opacity-50 rounded-lg">
            {icon}
          </div>
          {tooltip === label && (
            <div className="tooltip absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg shadow-lg">
              {label}
            </div>
          )}
        </a>

      ))}
    </aside>
  );
};

export default Sidebar;
