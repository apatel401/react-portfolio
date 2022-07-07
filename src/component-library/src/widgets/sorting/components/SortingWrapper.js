import React from 'react';
import Category from './Category';
import Tray from './Tray';
import Replay from './Replay';
import { SortingTableContext } from './Provider';
import { useState, useEffect, useContext } from 'react';
import SkipLink from '../../SkipLink';

function SortingWrapper(props) {

    const [ cardInTransition, setCardInTransition ] = useState(false);
    let clickingCategoryCard = false;
    
    // get context
    const context = useContext(SortingTableContext)

    useEffect(() => {
        resetDeck()
    }, [])

    // set the deck back to config
    function resetDeck() {
        let fullCardDeck = [...context.cards]
        fullCardDeck.map((card, index) => {
            card.id = index
            card.categoryPlacedId = -1
            card.title = card.text.length ? card.text : card.alt
        })
        context.updateContext({ cardDeck: fullCardDeck })
    }

    useEffect(() => {
        context.updateContext({ selectedCardId: null, selectedBox: null, deselectedCardId: false });
    }, [context.deselectedCardId === true])

    function handleCardClicked(event, cardId, cardTitle = null) {
        // ignore card click event if another card is in transition, or
        // the click was triggered by a keypress
        if(cardInTransition || event.type === 'click' && event.detail === 0) {
            return
        }

        context.selectedCardId !== null && context.updateContext({ deselectedCardId: true });
        context.updateContext({ selectedBox: null });
        
        let inCategory = context.cardDeck[cardId].categoryPlacedId !== -1
        // we're recycling a card to the tray
        if (context.selectedCardId !== null && cardId === context.selectedCardId && inCategory) {
            setCardInTransition(true)
            context.updateContext({
                recycled: true,
                ariaLiveArray: [
                    'recycled',
                    cardTitle,
                    context.categories[context.cardDeck[context.selectedCardId].categoryPlacedId - 1].title
                    // context.categories[context.categorySelectedId - 1].title
                ]
            })

            if (context.reduceMotion) {
                setCardInTransition(false)
                moveCards(-1)
            }
            clickingCategoryCard = true

        // user selected a card
        } else {
            if (inCategory) {
                clickingCategoryCard = true
            } else {
                clickingCategoryCard = false
            }
            // announce that the card is selected
            context.updateContext({
                ariaLiveArray: ['cardSelected', cardTitle],
                selectedCardId: cardId,
                recycled: false
            })
        }
    }

    // unset the selected card id
    function handleDeselectCard() {
        context.updateContext({ selectedCardId: null, tryAgain: false, selectedBox: null })
    }
  
    // set the categoryPlacedId of the selected card to the category 
    // clicked on, or to -1 if they're recycline the card
    function handleCategorySelected(event, categoryPlacedId) {
        // if no card selected, or a card is in transition, or the click
        // was triggered by a keypress, do nothing

        if(context.selectedCardId === null || cardInTransition || event.type === 'click' && event.detail === 0) {
            context.selectedBox === event.target.id && context.updateContext({ deselectedCardId: true });
            context.updateContext({ selectedBox: event.target.name });
            return
        }
        // if validation is on, check to see if we have a match
        var match = !context.validation ? true : context.cardDeck[context.selectedCardId].category_id === categoryPlacedId
        
        let pendingContextUpdates = { categorySelectedId: categoryPlacedId }
        
        if (match) {  
            // clicking card in category can't trigger category click 
            if(clickingCategoryCard || context.cardDeck[context.selectedCardId].categoryPlacedId === categoryPlacedId) { 
                return
            }

            // if validation false and card moving from category to category
            if (!context.validation && context.cardDeck[context.selectedCardId].categoryPlacedId !== -1) {
                pendingContextUpdates = {
                    ...pendingContextUpdates,
                    ariaLiveArray: [
                        'categoryToCategory',
                        context.categories[context.cardDeck[context.selectedCardId].categoryPlacedId - 1].title,
                        context.categories[categoryPlacedId - 1].title
                    ]
                }     
            } else {
                // if validation true we've matched to a category, if false we're moving from tray to category
                pendingContextUpdates = {
                    ...pendingContextUpdates,
                    ariaLiveArray: [
                        context.validation ? 'cardMatchedToCategory' : 'cardMovedToCategory',
                        context.cardDeck[context.selectedCardId].title,
                        context.categories[categoryPlacedId - 1].title
                    ]
                }
            }
            pendingContextUpdates = {
                ...pendingContextUpdates,
                cardMatchedToCategory: true,
            }
            
            // if no slide animation, move the cards right away
            if(context.reduceMotion) {
                setCardInTransition(false)
                moveCards(categoryPlacedId) 
            } else {
                setCardInTransition(true);
            }
        } else {
            context.updateContext({ ariaLiveTryAgain : context.categories[categoryPlacedId - 1].title })
            pendingContextUpdates = {
                ...pendingContextUpdates,
                tryAgain: true,
                ariaLiveArray: [
                    'tryAgain',
                    context.cardDeck[context.selectedCardId].title,
                    context.categories[categoryPlacedId - 1].title]
            }
        }
        context.updateContext( pendingContextUpdates )
    }

    function moveCards(categoryPlacedId = null) {
    
        if (categoryPlacedId === null)
            categoryPlacedId = context.categorySelectedId

        // get the card to be moved
        let moveCard = context.cardDeck.filter(function (obj, index) {
            return index === context.selectedCardId;
        });
        // get the remaining cards
        let newCardDeck = context.cardDeck.filter(function (obj, index) {
            return index !== context.selectedCardId;
        });

        newCardDeck = moveCard.concat(newCardDeck);
        newCardDeck[0].categoryPlacedId = categoryPlacedId;
        
        context.updateContext({
            tryAgain: false,
            cardDeck: newCardDeck,
            selectedCardId: null,
            cardMatchedToCategory: false
        })
        setCardInTransition(false)
    }

    return (
        <div className="sorting-container">
        <div className="skipLine">
        <SkipLink
          elemOrSec={"elem"}
          section={"start"}
          iloName={"sorting"}
          instanceId={props.id}
          text={context.iloStartText}
          linkText={context.iloStartLink}
        />
        </div>
        <Tray
          onClickCard={handleCardClicked}
          handleDeselectCard={handleDeselectCard}
          moveCards={moveCards}
          cardInTransition={cardInTransition}
        />

        <div className="category-container">
          {/* map through categories array and add props to Category.js component */}
          {context.categories.map((category) => (
            <Category
              id={category.id}
              title={category.title}
              onClickCategory={handleCategorySelected}
              onClickCard={handleCardClicked}
              moveCards={moveCards}
              cardInTransition={cardInTransition}
            />
          ))}
        </div>
        <Replay />
        <div className="skipLine">
            <SkipLink
            elemOrSec={"elem"}
            section={"end"}
            iloName={"sorting"}
            instanceId={props.id}
            text={context.iloEndText}
            linkText={context.iloEndLink}
            />
        </div>
      </div>
    );
}
export default SortingWrapper;