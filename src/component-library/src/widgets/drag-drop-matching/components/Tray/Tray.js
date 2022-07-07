import React from 'react';
import Card from "../Card";
import SuccessPrompt from '../SuccessPrompt';

class Tray extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * @desc Store last copy of card data for detecting input change
       */
      cardDataHash: null,

      /**
       * @desc state of cards on the tray (this is mostly metadata about matching)
       */
      cards: null,

      /**
       * @desc keeps track of if the onDone event has been emitted for this set of cards
       */
      isDone: null,

      /**
       * @desc Reference to selected card
       */
      selectedCard: null,

      /**
       * @desc last Event.type used to select a card - this is for changing behaviour based on input type
       */
      lastSelectedEventType: null,
      
      firstAvailableCard: null
    };

    /**
     * @desc Maps card ID to its current HTMLElement on the page (used for animation)
     *       Note: does not contain the combined cards!
     * @type {{
     *         [cardDataId]: HTMLElement
     *       }}
     */
    this.cardRefs = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};

    const cards = prevState.cards === null ? [] : [...prevState.cards.first, ...prevState.cards.second];

    // Reset tray state if cards on the tray change
    // @TODO this does not correctly detect a reset event if our decks are the same!
    // const newCardDataHash = Immutable.Map(nextProps.cardData).hashCode();
    // const isCardDataUpdated = newCardDataHash !== prevState.cardDataHash;
    const isCardDataUpdated = prevState.cards === null;
    if(isCardDataUpdated) {
      newState = {
        ...newState,
        // cardDataHash: newCardDataHash,
        cards: Tray.buildCardState(nextProps),
        isDone: null,
        selectedCard: null,
        lastSelectedEventType: null
      }
    }


    // Check if we're done
    const isAllCardsCorrect = cards.every(card => card.type === "combined" || card.isMatchCorrect);
    if(cards.length > 0 && isAllCardsCorrect && nextProps.onDone) {
        // Only emit event once
        if(!prevState.isDone) {
          // set a delay so the animations can finish
          const doneEventDelay = nextProps.reduceMotion ? 0 : 2000;
          setTimeout(() => nextProps.onDone.call(this), doneEventDelay);
          newState.isDone = true;
        }
    }

    return newState;
  }

  /**
   * @desc Generate the initial state of card on the tray
   * @returns {Array<{
   *         cardDataId: 1,
   *         isMatchCorrect?: true | false,
   *         matchOrder?: 1 | 2,
   *         coords: []
   *       }>}
   */
  static buildCardState(props) {
    const getInitialCardMetadata = (deckName, cardData, cardDataIdx) => ({
      cardDataId: `${deckName}-${cardDataIdx}`,
      isMatchCorrect: null,
      matchedCardDataId: null,
      matchOrder: null,
      coords: []
    });

    const _fmeta = props.cardData.first.map((cardData, cardDataIdx) => getInitialCardMetadata('first', cardData, cardDataIdx));
    const _smeta = props.cardData.second.map((cardData, cardDataIdx) => getInitialCardMetadata('second', cardData, cardDataIdx));
    const _first = (props.shuffle) ? Tray.shuffleArray(_fmeta) : _fmeta;
    const _second = (props.shuffle) ? Tray.shuffleArray(_smeta) : _smeta;
 
    return {
      first: _first,
      second: _second
    }
  }


  /**
  * @desc Announce action to screen reader only
  * @param {string} actionMsg describes the action taken
  */
  announceAction(actionMsg) {
    if(this.props.onAnnounce) this.props.onAnnounce(actionMsg);
  }

  /**
   * 
   * @desc Gets card data
   * 
   * @return {{
   *    pairId: 1,
   *    assetURL?: "apple.svg",
   *    alt?: "alt text",
   *    textLabel?: "Apple",
   *    type?: "first" | "second" | "combined"
   * }} 
   */
  getCardData(card) {
    if(!card) return null;
    const [deckName, cardDataIdx] = card.cardDataId.split('-');
    return this.props.cardData[deckName][cardDataIdx];
  }
  /**
   * 
   * @desc Checks if two cards are equal by value
   * @returns {Boolean}
   */
  isCardEqual(c1, c2) {
    if(c1 === null || c2 === null) return false;
    const c1Data = this.getCardData(c1);
    const c2Data = this.getCardData(c2);
    return c1Data.pairId === c2Data.pairId && c1Data.type === c2Data.type;
  }

  /**
   * 
   * @desc Checks if the card needs to be hidden - for first selected card in a correct match
   * @returns {Boolean}
   */
  isCardHidden(card) {
    // This was the first selected card - so we hide it
    return card.isMatchCorrect === true && card.matchOrder === 1;
  }

  /**
   * 
   * @desc Gets a processed version of the card if any - for second selected card in a correct match,
   *       this will return a "combined" version of the match
   * @returns {card}
   */
  getModifiedCard(card) {
    const isAnimating = !this.props.reduceMotion && !card.animationFinished;
    if(card.isMatchCorrect !== true || this.isCardHidden(card) || isAnimating) {
      return card;
    }
  
    // This was the second selected card - so we show the combined version
    if(card.matchOrder === 2) {
      const combined = this.props.cardData.combined
                        .find(combinedCardData => {
                          return combinedCardData.pairId === this.getCardData(card).pairId
                        });
      console.assert(combined !== undefined, 'could not find combined card');
      return {
        ...card,
        ...combined,
        origCardDataId: card.cardDataId,
        cardDataId: card.cardDataId.replace(/^\w+\-/, 'combined-')
      }
    }
    throw new Error('Unexpected card state - match is correct but has no matchOrder');
  }
  /**
   * 
   * @desc the first card interacted will mark it as first selection, the second card selected will
   *       initiate matching check - generating the isMatchCorrect, matchOrder, and coords fields
   *       for both cards
   * @returns {void}
   */
  handleCardInteracted(card, eventType) {
    const now = +(new Date());

    if(card.isMatchCorrect !== null) {
      return;
    }

    // Toggle selected
    if(this.isCardEqual(this.state.selectedCard, card)) {
      this.announceAction('card de-selected');
      this.setState(prevState => ({
        selectedCard: null,
        lastSelectedEventType: eventType
      }));
      return;
    }
    // Mark this as first choice
    if(!this.state.selectedCard) {
      this.announceAction('card selected');
      this.setState(prevState => ({
        selectedCard: card,
        lastSelectedEventType: eventType
      }));
      return;
    }

    //**If current selectedCard is first and next selected card is first again, change selectedCard data to the next one OR vice versa.
    if (this.state.selectedCard) {
      if (this.state.selectedCard.cardDataId.startsWith('first') && card.cardDataId.startsWith("first")) {
        this.announceAction('card selected');
        this.setState(prevState => ({
          selectedCard: card,
          lastSelectedEventType: eventType
        }));
        return;
      }
      if (this.state.selectedCard.cardDataId.startsWith("second") && card.cardDataId.startsWith("second")) {
        this.announceAction('card selected');
        this.setState(prevState => ({
          selectedCard: card,
          lastSelectedEventType: eventType
        }));
        return;
      }
    }
    // Try to match
    const selFirst = this.state.selectedCard;
    const selSecond = card;

    // Announce to screen reader
    const isMatch = this.getCardData(selFirst).pairId === this.getCardData(selSecond).pairId;
    if(isMatch) {
      this.announceAction('card matched correctly');
    } else {
      this.announceAction('card incorrectly matched');
      // card.blur();
    }
    
    //If MOUSEUP, card selected, and incorrectly matched, then remove all the focus on the cards.
    if (eventType === "mouseup" && !isMatch) {
      const isCardSelected = document.activeElement;
      isCardSelected.blur();
    }

    // If using Keyboard and match is correct, move the focus to the first available card. 
    if (eventType === "keydown" && isMatch) {
      const firstAvailableCard = this.state.cards.first
      .map(card =>  this.cardRefs[card.cardDataId]);

      for (let i = 0; i < firstAvailableCard.length; i++) {
        if (firstAvailableCard[i].classList.length <= 1) {
          //Delay the focus till the end of card transition.
          setTimeout(function() {
            firstAvailableCard[i].focus()
          }.bind(this), 1100);
          break;
        }
      }
    }

    this.setState(prevState => {
      const isMatch = this.getCardData(selFirst).pairId === this.getCardData(selSecond).pairId;
      let mutableCards = prevState.cards;
      // Get updated reference to the correct selected first / second cards
      const deck = [...mutableCards.first, ...mutableCards.second];
      const foundCards = {
        selFirst: deck.find(card => this.isCardEqual(selFirst, card)),
        selSecond: deck.find(card => this.isCardEqual(selSecond, card))
      };
      foundCards.selFirst.isMatchCorrect = isMatch;
      foundCards.selSecond.isMatchCorrect = isMatch;

      if(isMatch) { 
        const refs = Object.entries(this.cardRefs);
        const selFirstCardIdx = refs.findIndex(([id, ref]) => id === selFirst.cardDataId);
        const selFirstCardCoords = refs[selFirstCardIdx][1].getBoundingClientRect();
        const selSecondCardIdx = refs.findIndex(([id, ref]) => id === selSecond.cardDataId);
        const selSecondCardCoords = refs[selSecondCardIdx][1].getBoundingClientRect();  

        //* Even Deposer Ici box is clicked first, move the next card selected down to where the deposer ici is.      
        if (foundCards.selFirst.cardDataId.startsWith('second')){
          foundCards.selFirst.matchOrder = 2;
          foundCards.selSecond.matchOrder = 1;
  
          foundCards.selSecond.coords.transformX = (selFirstCardCoords.x - selSecondCardCoords.x);
          foundCards.selSecond.coords.transformY = selFirstCardCoords.y - selSecondCardCoords.y;
          foundCards.selSecond.coords.transformWidth = selFirstCardCoords.width;
          foundCards.selSecond.coords.transformHeight = selFirstCardCoords.height;
        }
        //* For the normal process, card selected and deposer ici box clicked next. 
        else {
          foundCards.selFirst.matchOrder = 1;
          foundCards.selSecond.matchOrder = 2;
  
          foundCards.selFirst.coords.transformX = (selSecondCardCoords.x - selFirstCardCoords.x);
          foundCards.selFirst.coords.transformY = selSecondCardCoords.y - selFirstCardCoords.y;
          foundCards.selFirst.coords.transformWidth = selSecondCardCoords.width;
          foundCards.selFirst.coords.transformHeight = selSecondCardCoords.height;
        }
      }
      else {
        foundCards.selFirst.coords.transformWidth = 0;
        foundCards.selFirst.coords.transformHeight = 0;
      }
      
      const isKeyboard = prevState.lastSelectedEventType !== "mouseup";
      return {
        cards: mutableCards,
        // Enable sticky selection for keyboard
        selectedCard: isKeyboard && !isMatch ? prevState.selectedCard : null,
        lastSelectedEventType: eventType
      }
    });
  }

  /**
   * @desc Mark card as ready to be interacted with again - pretending it's never been matched
  */
  handleCardReadyToInteract(card) {
    // A correctly matched card should never be able to be interacted with again

    this.setState(prevState => {
      let mutableCards = prevState.cards;
      const deck = [...mutableCards.first, ...mutableCards.second];
      let foundCard = deck.find(deckCard => this.isCardEqual(deckCard, card));
      if(typeof foundCard === "undefined") {
        return {}
      } else if(foundCard.isMatchCorrect !== true) {
        foundCard.isMatchCorrect = null;
      } else {
        foundCard.animationFinished = true;
      }
      foundCard.coords.transformWidth = 0;
      
      return {
        cards: mutableCards
      }
    })
  }

  /**
  * @desc build the card component for render
  * @return {string}
  */
  getCardRender(realCard, cardIdx, cardList) {
    const realCardData = this.getCardData(realCard);
    const card = this.getModifiedCard(realCard);
    const cardData = this.getCardData(card);
    const isAllCardsCorrect = cardList.every(card => card.type === "combined" || card.isMatchCorrect);
    return (
      <Card
        ref={el => {
          if(el === null) {
            delete this.cardRefs[realCard.cardDataId];
          } else {
            this.cardRefs[realCard.cardDataId] = el;
          }
        }}
        // Tell react that "combined-1" and "second-1" is the same card
        // This is okay because Card is a PureComponent
        key={realCard.cardDataId}
        {...cardData}
        transformX={card.coords.transformX}
        transformY={card.coords.transformY}
        transformWidth={card.coords.transformWidth}
        transformHeight={card.coords.transformHeight}
        isCoolDown={card.isMatchCorrect === false}
        isSelected={this.isCardEqual(this.state.selectedCard, card)}
        isDisabled={isAllCardsCorrect}
        isHidden={this.isCardHidden(card)}
        isMatchCorrect={card.isMatchCorrect === true}
        isFirstCard={cardIdx === 0}
        isLastCard={cardIdx === cardList.length - 1}
        onAnimationEnd={e => this.handleCardReadyToInteract(card)}
        onKeyDown={e => {
          const oppositeType = realCardData.type === 'first' ? 'second' : 'first';
          // const selectedCard = document.getElementsByClassName('matching-card selected drag-drop-matching')
          if(e.key === 'ArrowLeft') {
            this.jumpToOffset(realCardData.type, cardIdx - 1, -1, true);
            e.preventDefault();
          }
          else if(e.key === 'ArrowRight') {
            this.jumpToOffset(realCardData.type, cardIdx + 1, 1, true);
            e.preventDefault();
          }
          else if(e.key === 'ArrowUp' && realCardData.type === 'second') {
            const value = cardIdx > 0 ? 1 : -1;
            this.jumpToOffset(oppositeType, cardIdx, value, true);

            e.preventDefault();
          }
          else if(e.key === 'ArrowDown' && realCardData.type === 'first') {
            const value = cardIdx > 0 ? 1 : -1;
            this.jumpToOffset(oppositeType, cardIdx, value, true);

            // this.jumpToOffset(oppositeType, cardIdx, 1, false);
            e.preventDefault();

          } else if(e.key === 'Enter' || e.key === ' ') {
            const isNewSelection = this.state.selectedCard === null;
            this.handleCardInteracted(card, 'keydown')
            if(isNewSelection) {
              // When jumping to other column - we are ignoring combined cards
              // this.jumpToOffset(oppositeType, 0, 1, true);
            }
          }
        }}
        onMouseUp={e => this.handleCardInteracted(card, 'mouseup')}
        // onMouseEnter={e => {
        //   // Unfocus the other selected card on mouse enter
        //   // This is workaround for the rare mouse + keyboard user to have one thing visually selected
        //   const isCardSelected = document.activeElement.classList.contains('matching-card');
        //   const isThisSelected = document.activeElement === e.target;
        //   if(isCardSelected && !isThisSelected) {
        //     // document.activeElement.blur();
        //   }
        // }}
        dataTitle={realCardData.type === 'second' ?  'second' : 'first'}
        selectedCard={this.state.selectedCard}
        cardIndex={cardIdx}
        totalLength={cardList.length}
      />
    )
  }

  static shuffleArray(array) {
    const newArray = [...array];
    let i = newArray.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  render() {
    const _firstCards = this.state.cards.first
                          .map((...cardInfo) => this.getCardRender(...cardInfo));
    const _secondCards = this.state.cards.second
                          .map((...cardInfo) => this.getCardRender(...cardInfo));

    const imgSrc = this.props.questionImage[0].src ? this.props.questionImage[0].src : "";
    const imgAlt = this.props.questionImage[0].alt ? this.props.questionImage[0].alt : "";
    
    return (
      <>
      <div className="matching-tray">
        <div className="question-container">
          <h3>{this.props.question}</h3>
          <p className={`submit-description ${this.props.questionImage[0].src ? '':'no-image-below'}`}><i>Glisse et dépose les composantes à leur définition respective puis sélectionne le bouton SOUMETTRE.</i></p>
          {this.props.questionImage[0].src ? <img src={imgSrc} alt={imgAlt} className="img-responsive matching-image"/> : null}
        </div>
        <div className="matching-first-col">
          {_firstCards}
        </div>
        <div className="matching-second-col">
          {_secondCards}
        </div>
        <SuccessPrompt successMessage={this.props.successMessage} visible={this.props.allCorrect}/> 
      </div>
      </>
    )
    
  }

  /**
   * @desc Goes through the DOM for the current column to focus on a card
   * @param {string} jumpToType this is the set of cards to jump to
   * @param {number} offset 0-index offset of the set of cards to jump to
   * @param {number} direction 1 or -1 for skipping hidden cards
   */
  jumpToOffset(jumpToType, offset, direction, ignoreCombined) {
    const jumpToCardRefs = this.state.cards[jumpToType]
                          .map(card => {
                            const isHidden = this.isCardHidden(card);
                            const isCombined = this.getModifiedCard(card).cardDataId.startsWith('combined');

                            return (ignoreCombined && isCombined) || isHidden ? null : this.cardRefs[card.cardDataId];
                          });

    if(jumpToCardRefs.length > 0) {
      if(offset >= jumpToCardRefs.length) {
        offset = jumpToCardRefs.length - 1;
      }
      if(offset < 0) {
        offset = 0;
      }
      for(let i = offset; i < jumpToCardRefs.length && i >= 0; i += direction) {
        if(jumpToCardRefs[i]) {
          jumpToCardRefs[i].focus();
          break;
        }
      }
    }
  }
}

Tray.defaultProps = {
  // ratio: [1, 1],
  cardData: { first: [], second: [], combined: [] }
}

// Trick to create wrapper component to inject some context
export default (props) => {
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);

  return (
    <Tray {...props} reduceMotion={!mediaQueryList.matches} />
  )

};