import React, { forwardRef, useContext } from 'react';
import { SortingTableContext } from './Provider';

const Card = forwardRef((props, ref) => {

    const context = useContext(SortingTableContext)
    const isCardInTray = props.categoryPlacedId === -1
    
    // aria labels for screen reader
    const ariaLive = () =>{
        const array = [
				!isCardInTray && ref
					? ""
					: props.cardSkipped
					? `Card Skipped. Card option: ${props.cardsInTrayNums[0]} of ${props.cardsInTrayNums[1]}. Card reads: ${props.title}`
					: `Card option: ${props.cardsInTrayNums[0]} of ${props.cardsInTrayNums[1]}. Card reads: ${props.title}`,

				// aria label when card is selected
				context.selectedCardId === props.id ? `${props.title} is selected` : ``,
				// aria label when card is selected in a category
				!isCardInTray
					? `${props.title}; 
                card ${props.cardsInCategoryNums[0]} of ${props.cardsInCategoryNums[1]} 
                cards in ${context.categories[props.categoryPlacedId - 1].title} category`
					: "",
			];
        context.updateContext({
				ariaLiveArray: ["Card Option", array.filter((l) => l).join("; ")],
		});
    } 

    let transformStyles = {};
    if ((context.cardMatchedToCategory || context.recycled) && !context.reduceMotion && context.selectedCardId === props.id) {
            
        let extraLeft = isCardInTray || !isCardInTray && !context.recycled ? 70 : 0
        let extraTop = isCardInTray || !isCardInTray && !context.recycled ? 30 : 0
        let sourceCoords = ref.current !== null
            && ref.current.getBoundingClientRect()
        let targetCoords =
            context.recycled ? context.trayRef.current.getBoundingClientRect() 
                : context.categoryRefs.current[context.categorySelectedId - 1].current.getBoundingClientRect()
        
        transformStyles = {
            zIndex: 99,
            transform: `translate(${-sourceCoords.left + targetCoords.left + extraLeft - 70}px, 
                ${-sourceCoords.top + targetCoords.top + extraTop - 30}px)`,
            transition: `transform 1300ms ease-in-out, width 1500ms ease-in-out, height 1300ms ease-in-out`,
            '-webkit-transition': `transform 1300ms ease-in-out, width 1500ms ease-in-out, height 1300ms ease-in-out`,
            '-moz-transition': `transform 1300ms ease-in-out, width 1500ms ease-in-out, height 1300ms ease-in-out`
        };
        context.previousButton.disabled = true
        context.nextButton.disabled = true
    } 

    return (
        <button
            ref={ref} 
            type="button"
            role="button"
            style={ {'fontSize':`${context.fontSizeMain} `, ...transformStyles} }
            key={props.id}
            tabindex={props.tabindex}
            onFocus={(e) => {ariaLive();
                            props.cardSkipped && props.setCardSkipped(false);
                }
            }
            onClick={context.validation && !isCardInTray ? null : (e) => props.onClick(e, props.id, props.title)}
            onKeyPress={context.validation && !isCardInTray ? null : (e) => props.onClick(e, props.id, props.title)}
            onAnimationEnd={
                context.tryAgain ? () => context.updateContext({ tryAgain: false }) : null
            }
            onTransitionEnd={e => {
                e.persist();
                props.moveCards(context.recycled ? -1 : context.categorySelectedId)
                context.previousButton.disabled = false
                context.nextButton.disabled = false
            }}
            className={
                `sorting-tfo-card ${context.tryAgain && context.validation && props.id === context.selectedCardId && 'try-again ' + props.className} 
                ${!isCardInTray && context.validation && 'success'}
                ${context.selectedCardId === props.id && 'selected-card'}`
            }>
                {context.tryAgain && context.validation && <div className='validation try-again-icon'></div>}
                {!isCardInTray && context.validation && <div className='validation success-icon'></div>}
                {
                    (!isCardInTray && !props.categoryValidation && props.id === context.selectedCardId) 
                    &&
                    <div className="sorting-tfo-remove" aria-label='remove card from category'></div>
                }
                { !props.src ? props.text : <img src={props.src} alt={props.alt}/>}
        </button>
    )
})

export default Card;