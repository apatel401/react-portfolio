import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { TooltipContext } from "./Provider";

const TooltipWrapper = ({ definition, direction = "up", children }) => {
	const context = useContext(TooltipContext);

	const [dir, setDir] = useState(direction);
	const [isOpen, setIsOpen] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const toolRef = useRef(null);

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	useEffect(() => {
		if (isOpen) {
			const rect = toolRef.current.getBoundingClientRect();
			rect.left < 0 && setDir("up");
			rect.right > windowWidth && setDir("down");
		}
	}, [isOpen]);

	const updateDimensions = () => {
		setWindowWidth(window.innerWidth);
	};

	const events = {
		onClick: (e) => {
			setIsOpen(!isOpen);
			if (!isOpen) {
				context.updateContext({
					announcements: ["open"],
					definition: definition,
				});
			} else {
				context.updateContext({
					announcements: ["close"],
				});
			}
		},
		onKeyDown: (e) => {
			if (e.key === "Enter") {
				setIsOpen(!isOpen);
			}
			if (e.key === "Escape" && isOpen) {
				setIsOpen(false);
			}
		},
		onBlur: (e) => {
			setIsOpen(false);
			context.updateContext({
				announcements: [""],
				word: "",
			});
		},
		onFocus: (e) => {
			context.updateContext({
				announcements: ["focus"],
				word: children,
			});
		},
	};

	const setDirectionClass = () => {
		return dir === "up" ? "tooltip-tip__info_up" : "tooltip-tip__info_down";
	};

	return (
		<span
			{...events}
			className={!isOpen ? "tooltip-wrapper-plus" : "tooltip-wrapper-minus"}
			role="button"
			tabindex="0"
			style={{ whiteSpace: `${children.split(" ").length > 1 ? "wrap" : "nowrap"}` }}
		>
			<span className="icon">
				{isOpen && (
					<span class={setDirectionClass()} role="button" ref={toolRef}>
						<span class="info">{definition.substring(0, 50)}</span>
					</span>
				)}
			</span>
			<span className={"text"}>{children}</span>
		</span>
	);
};

export default TooltipWrapper;
