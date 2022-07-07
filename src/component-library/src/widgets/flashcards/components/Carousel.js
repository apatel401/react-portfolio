import React, { useContext, useRef, useEffect } from "react";
import Card from "./Card";
import { FlashcardsContext } from "./Provider";

function Carousel() {
	const context = useContext(FlashcardsContext);
	// const containerRef = useRef(null)

	useEffect(() => {
		if (!context.reduceMotion) {
			context.containerRef.current.style.transition = "all 1s ease-in-out";
			// containerRef.current.classList.add(".slide-fade")
			context.containerRef.current.style.transform = `translateX(-${context.current}00%)`;
			// containerRef.current.classList.remove(".slide-fade")
		} else {
			context.containerRef.current.style.transform = `translateX(-${context.current}00%)`;
		}
	}, [context.current]);

	return (
		<>
			<div className={"carousel-container"}>
				<div class="card-display-container" ref={context.containerRef}>
					{context.items.map((items, index) => {
						return (
							<>
								<Card
									imageFront={items.imgFront}
									imageBack={items.imgBack}
									headerFront={items.headerValueFront}
									altFront={items.textValueFront}
									headerBack={items.headerValueBack}
									altBack={items.textValueBack}
									audioFileFront={items.audioFileFront}
									audioFileBack={items.audioFileBack}
									keyId={index}
									reduceMotion={context.reduceMotion}
									cardCount={context.items.length}
								/>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Carousel;
