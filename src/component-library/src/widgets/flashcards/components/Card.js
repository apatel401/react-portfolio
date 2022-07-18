import React, { useContext, useEffect, useRef, useState } from "react";
import { FlashcardsContext } from "./Provider";

const Card = ({
	keyId,
	imageFront,
	imageBack,
	altFront,
	altBack,
	headerFront,
	headerBack,
	cardCount,
}) => {
	const context = useContext(FlashcardsContext);

	const [isFlipped, setisFlipped] = useState(false);

	const currentCardRef = useRef(null);
	const currentCardRefBack = useRef(null);

	console.log(cardCount);
	useEffect(() => {
		if (context.flipped !== keyId) {
			setisFlipped(false);
		}
	// eslint-disable-next-line
	}, [context.flipped]);

	function flip(e, keydownEvent) {
		if (context.inTransform) return; // Exit function if in motion
		setisFlipped(!isFlipped);
		context.updateContext({
			cardStatus: context.cardStatus.map((status, index) => {
				if (index === context.currentCardRef) {
					return !status;
				}
				return status;
			}),
			announcements: "flipping",
			currentCardRef: keyId,
			flipped: keyId,
		});

		setTimeout(() => {
			context.updateContext({ announcements: "current" });
		}, 100);
		// eslint-disable-next-line no-unused-expressions
		keydownEvent
			? !isFlipped
				? currentCardRefBack.current.focus()
				: currentCardRef.current.focus()
			: null;
	}

	function flipAnnoucement() {
		if (
			document.activeElement.classList.contains("flash-play-btn") || //exit if audio or flip btn
			document.activeElement.classList.contains("flip-card-corner-button") ||
			context.announcements === "flipping"
		)
			return; //exit if flipped

		context.updateContext({ announcements: "current" });
	}

	useEffect(() => {
		if (context.resetFlipped) setisFlipped(false);
		context.updateContext({ isFrontCard: true });
// eslint-disable-next-line
	}, [context.resetFlipped]);

	function setClassNameFront() {
		if (
			(imageFront !== undefined && altFront !== undefined) ||
			(imageFront !== undefined && headerFront !== undefined)
		) {
			return "content-container-all";
		} else if (imageFront ===undefined && altFront === undefined && headerFront !== undefined) {
			return "content-container-noImg-noText";
		} else if (
			(imageFront ===undefined && altFront !== undefined) ||
			(imageFront === undefined && headerFront !== undefined)
		) {
			return "content-container-noImg";
		} else if (altFront === undefined && imageFront !== undefined) {
			return "content-container-noText";
		} else {
			return "content-container-all";
		}
	}
	function setClassNameBack() {
		if (
			(imageBack !== undefined && altBack !== undefined) ||
			(imageBack !== undefined && headerBack !== undefined)
		) {
			return "content-container-all";
		} else if (imageBack === undefined && altBack === undefined && headerBack !== undefined) {
			return "content-container-noImg-noText";
		} else if (
			(imageBack === undefined && altBack !== undefined) ||
			(imageBack === undefined && headerBack !== undefined)
		) {
			return "content-container-noImg";
		} else if (altBack === undefined && imageBack !== undefined) {
			return "content-container-noText";
		} else {
			return "content-container-all";
		}
	}

	function handleFocus(e) {
		context.updateContext({
			announcements: "current",
			currentCardRef: keyId,
		});
	}

	function handleKeyDown(e) {
		flip(e, true);
	}

	return (
		<>
			<div
				className={`${
					cardCount - 1 < 2 ? "flash-card-container-two-column" : "flash-card-container"
				}`}
				onFocus={flipAnnoucement}
			>
				<div
					className={
						(!context.reduceMotion ? "flip-card-btn" : "flip-card-btn-reduce-motion") +
						(isFlipped && !context.reduceMotion ? " is-flipped " : "") +
						(isFlipped && context.reduceMotion ? " is-flipped-reduce-motion " : "")
					}
					href="#"
				>
					<div class="flash-card-body">
						<div
							class="flash-card-front"
							tabIndex={!isFlipped ? 0 : -1}
							ref={currentCardRef}
							onClick={flip}
							onKeyPress={handleKeyDown}
							onFocus={handleFocus}
						>
							<div className={setClassNameFront()}>
								{imageFront !== undefined ? (
									<img
										src={`../assets/img/` + imageFront[0]}
										alt={imageFront[1]}
										aria-hidden="true"
									/>
								) : (
									""
								)}
								<div class="card-text-container">
									{headerFront !== undefined ? (
										<p class="cardHeaderFront" aria-hidden="true">
											{headerFront}
										</p>
									) : (
										<p class="cardHeaderFront" aria-hidden="true">
											{headerFront}
										</p>
									)}

									{altFront !== undefined ? (
										<p class="cardTextBody" aria-hidden="true">
											{altFront}
										</p>
									) : (
										""
									)}
								</div>
							</div>
							<div className="bottom-btn-wrapper">
								<div class="bottom-of-card-layout-container">
									<div class="bottom-of-card-layout"></div>
								</div>
							</div>
						</div>

						<div
							class="flash-card-back"
							tabIndex={!isFlipped ? -1 : 0}
							ref={currentCardRefBack}
							onClick={flip}
							onKeyPress={handleKeyDown}
							onFocus={handleFocus}
						>
							<div className={setClassNameBack()}>
								{imageBack !== undefined ? (
									<img
										src={`../assets/img/` + imageBack[0]}
										alt={imageBack[1]}
										aria-hidden="true"
									/>
								) : (
									""
								)}
								<div class="card-text-container">
									{headerBack !== undefined ? (
										<p
											class={`cardHeaderBack ${
												altBack ? "alt-text-valid" : "alt-text-invalid"
											}`}
											aria-hidden="true"
										>
											{headerBack}
										</p>
									) : (
										<p
											class={`cardHeaderBack ${
												altBack ? "alt-text-valid" : "alt-text-invalid"
											}`}
											aria-hidden="true"
										>
											{headerBack}
										</p>
									)}

									{altBack !== undefined ? (
										<p class="cardTextBody" aria-hidden="true">
											{altBack}
										</p>
									) : (
										""
									)}
								</div>
							</div>
							<div class="bottom-of-card-layout-container">
								<div class="bottom-of-card-layout"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
