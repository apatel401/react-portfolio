import React from 'react';
import Card from './Card';
import { SortingTableContext } from './Provider';
import { useState, useEffect, useContext, useRef} from 'react';

function Tray(props) {

    const context = useContext(SortingTableContext);
    const [cardIndex, setCardIndex] = useState(0);
    const [cardSkipped, setCardSkipped] = useState(false);
    const [count, setCount] = useState(0);
    const previous = useRef(null);
    const next = useRef(null);

    let totalCardsInTray = 0;
    let cardNumInTray = 0;
    context.cardDeck.map((card, index) => {
        card.id = index
        card.categoryPlacedId === -1 || card.categoryPlacedId === undefined ?
            totalCardsInTray++ : null;
    });

    // create array of the cardComponents to display in the tray
    const _trayCardsArray = [];
    const _trayCardsArrayShadow = [];
    context.cardDeck.map((card) => {
        if(card.categoryPlacedId === -1) {
            cardNumInTray++
            let cardComponent = 
                <Card
                    id={card.id}
                    ref={context.trayRef}
                    text={card.text}
                    title={card.title}
                    src={card.src}
                    alt={card.alt}
                    cardSkipped={cardSkipped}
                    setCardSkipped={setCardSkipped}
                    caption={card.caption}
                    categoryPlacedId={card.categoryPlacedId === undefined ? -1 : card.categoryPlacedId}
                    moveCards={props.moveCards}
                    cardsInTrayNums={[cardNumInTray, totalCardsInTray]}
                    onClick={props.onClickCard}
                    cardInTransition={props.cardInTransition}
                />
            let cardComponentShadow = 
                <Card
                    tabindex={-1}
                    text={card.text}
                    title={card.title}
                    src={card.src}
                    caption={card.caption}
                    categoryPlacedId={card.categoryPlacedId === undefined ? -1 : card.categoryPlacedId}
                />
            _trayCardsArray.push(cardComponent);
            _trayCardsArrayShadow.push(cardComponentShadow);
        }
    })

    // increment card index to show next card. 
    const maxIndex = _trayCardsArray.length - 1;
    let newCardIndex = null

    const handleNextCard = () =>
    {

        props.handleDeselectCard(_trayCardsArray[cardIndex]);
        // increase the num of cards in array then set to 0
        if(cardIndex < maxIndex){
            newCardIndex = cardIndex + 1    
        } else {
            newCardIndex = 0
        }
    
        context.updateContext({
            ariaLiveArray: [
                'cardSkipped',
                _trayCardsArray[newCardIndex].props.title,
                _trayCardsArray[newCardIndex].props.cardsInTrayNums
            ]
        })
        setCardIndex(newCardIndex)
        setCardSkipped(true)
    }
  
    // decrement card index to show previous card. 
    const handlePreviousCard = () => {
        
        props.handleDeselectCard(_trayCardsArray[cardIndex]);
        if(cardIndex > 0){
            newCardIndex = cardIndex - 1
        }else if(cardIndex === 0 ){
            newCardIndex = maxIndex
        }

        context.updateContext({
            ariaLiveArray: [
                'cardSkipped',
                _trayCardsArray[newCardIndex].props.title,
                _trayCardsArray[newCardIndex].props.cardsInTrayNums
            ]
        })
        setCardIndex(newCardIndex)
        setCardSkipped(true);
    }
    // set the focus back to the card in the tray after prev and next arrows are pressed
    // or after a card is placed in a category, or on tryAgain
    useEffect(() => {
        setCount(count + 1);
        if(count < 1){
            return
        } ;
        !props.cardInTransition && 
        context.trayRef.current !== null && context.trayRef.current !== undefined ? context.trayRef.current.focus() : null
        context.tryAgain && context.updateContext({ 
            ariaLiveArray: [
                'tryAgain',
                context.cardDeck[context.selectedCardId].title,
                context.ariaLiveTryAgain ] });
    }, [_trayCardsArray.length, context.tryAgain === false])

    // use this to set cardIndex to zero each time the user
    // returns a card to the tray, or to prevent the tray 
    // from showing as empty if the last card is moved.
    useEffect(() => {
        if(context.recycled || cardIndex > _trayCardsArray.length - 1) {
            setCardIndex(0)
        }
    }, [context.recycled, cardIndex > _trayCardsArray.length - 1])

    useEffect(() => {
        if (!previous.current && !next.current) {
            return;
        }

        context.updateContext({
            previousButton: previous.current,
            nextButton: next.current
        })
    }, []);

    useEffect(() => {
        if (_trayCardsArray.length < 1) context.updateContext({ gameOver: true, });
    }, [_trayCardsArray.length < 1]);

    const _nextButton =                 
    <button
        className={`${_trayCardsArray.length < 2 && "noHover"} sorting-tfo-button next-button`}
        aria-label="skip to next card"
        onClick={handleNextCard}
        disabled={_trayCardsArray.length < 2}
        ref={next}
    />

    const _prevButton =
    <button
        className={`${_trayCardsArray.length < 2 && "noHover"} sorting-tfo-button previous-button`}
        aria-label="skip to previous card"
        onClick={handlePreviousCard}
        disabled= {_trayCardsArray.length < 2}
        ref={previous}
    />

    return (
        <div className="tray-wrapper" style={context.fontSizeMain}>
            <h3>{context.instructions}</h3>
            <p>{context.additionalInstructionsForValidationFalse}</p>
            <img src={context.instructionImg[0]} alt={context.instructionImg[1]} />
        {/*** PLEASE NOTE: There is a selection for normal view and mobile views ***/}
            <div className="card-carousel">
                <div className="button-container displayHiddenSmall">
                    {_prevButton}
                </div>
                <div className={`${_trayCardsArray.length && "duplicate-shadow-in-process"} duplicate-shadow`} disabled>
                    {_trayCardsArray.length ? _trayCardsArrayShadow[cardIndex] : 
                    <div aria-hidden="true" class="sorting-tfo-card noHover" disabled/>
                    }
                </div>
                <div className="cards-array-section">
                    {_trayCardsArray[cardIndex]}
                </div>

                <div className="button-container displayHiddenSmall">
                    {_nextButton}
                </div>
            </div>
            {/*** PLEASE NOTE: The selection below is for mobile views only ***/}
            <div className="card-carousel">
                <div className="button-container displayShowSmall">
                    {_prevButton}
                </div>
                <p className="numText">
                    {_trayCardsArray.length ? cardIndex + 1 : 0} of {maxIndex + 1}
                </p>
                <div className="button-container displayShowSmall">
                    {_nextButton}
                </div>
            </div>
        </div>
    );
}

export default Tray;