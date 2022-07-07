import React, {useState} from 'react';

function SkipLink({ elemOrSec, section, iloName, instanceId, text, linkText }) {

	const [ isFocus, setIsFocus ] = useState(false)

	const iloStart = iloName + instanceId + "-iloStart";
	const iloEnd = iloName + instanceId + "-iloEnd";
	let skipLink = "";


	const styles = {
		container:{
			width:"100%",
			position:"relative",
		},
		skipInteractiveLink: {
			fontWeight:500,
			color:"#414042",
			position:"absolute",
			display:"block",
			textAlign:"center",
			fontSize:"14px",
			background:"#F8DCF4",
			width:"100%",
			padding:"8px",
			zIndex:-1,
			transition:"all 0.3s ease-in-out",
		},
		skipMobile: {
			fontWeight:500,
			color:"#414042",
			position:"absolute",
			display:"block",
			textAlign:"center",
			fontSize:"12px",
			background:"#F8DCF4",
			width:"100%",
			padding:"5px",
			zIndex:-1,
			transition:"all 0.3s ease-in-out",
		},
		enterLink:{
			borderRadius: 0,
		},
		returnLink:{
			bottom:0,
			borderRadius: 0
		},
		focusContainer:{
			zIndex: 99,
			position: "relative"
		},
		focus:{
			zIndex: 99,
			outline: "none"
		},
		srOnly:{
			position:"absolute",
			width: "1px",
			height: "1px",
			padding: 0,
			margin: "-1px",
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			border: 0,
		}
	}

	if (section === "start") {
		skipLink = (
      <div
        style={
          isFocus
            ? { ...styles.container, ...styles.focusContainer }
            : styles.container
        }
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
      >
        <span id={iloStart} style={styles.srOnly}>
          {text}
        </span>
        <a
          style={
            window.innerWidth < 575 && isFocus
              ? {
				  ...styles.skipMobile,
				  ...styles.enterLink,
				  ...styles.focus
                }
              : window.innerWidth > 575 && isFocus ? {
				...styles.skipInteractiveLink,
				...styles.enterLink,
				...styles.focus
			  } : { ...styles.skipMobile, ...styles.enterLink }
          }
          href={"#" + iloEnd}
        >
          {linkText}
        </a>
      </div>
    );
	} else if (section === "end") {
		skipLink = (
      <div
        style={
          isFocus
            ? { ...styles.container, ...styles.focusContainer }
            : styles.container
        }
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
      >
        <a
          style={
			window.innerWidth < 575 && isFocus
			? {
				...styles.skipMobile,
				...styles.returnLink,
				...styles.focus
			  }
			: window.innerWidth > 575 && isFocus ? {
			  ...styles.skipInteractiveLink,
			  ...styles.returnLink,
			  ...styles.focus
			} : { ...styles.skipMobile, ...styles.returnLink }
          }
          href={"#" + iloStart}
        >
          {linkText}
        </a>
        <span id={iloEnd} style={styles.srOnly}>
          {text}
        </span>
      </div>
    );
	}

	return skipLink;
}
export default SkipLink;
