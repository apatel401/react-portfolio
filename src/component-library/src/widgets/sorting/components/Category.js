import React, { useContext } from 'react';
import Card from './Card';
import { SortingTableContext } from './Provider';

function Category(props) {

    const context = useContext(SortingTableContext)

    let totalCardsInCategory = 0
    let cardNumInCategory = 0

    context.cardDeck.map((card) => {
        card.categoryPlacedId === props.id && totalCardsInCategory++;
    });

    // create array of the cardComponents that belong to this category
    const _incorrectcategoryCardsArray = context.cardDeck.map((card, index) => {
        if (context.selectedCardId === index) {
            return (
                <Card
                    id={card.id}
                    ref={context.cardRefs.current[card.id]}
                    text={card.text}
                    className={"redLine"}
                    title={card.title}
                    src={card.src}
                    alt={card.alt}
                    cardsInCategoryNums={[cardNumInCategory, totalCardsInCategory]}
                    caption={card.caption}
                    categoryPlacedId={card.categoryPlacedId}
                    moveCards={props.moveCards}
                    onClick={props.onClickCard}
                    cardInTransition={props.cardInTransition}
                />
            );
        }
    })
    const _categoryCardsArray = context.cardDeck.map((card, index) => {
        if (card.categoryPlacedId === props.id) {
            cardNumInCategory++
            return (
                <Card
                    id={card.id}
                    tabindex={-1}
                    ref={context.cardRefs.current[card.id]}
                    text={card.text}
                    title={card.title}
                    src={card.src}
                    alt={card.alt}
                    cardsInCategoryNums={[cardNumInCategory, totalCardsInCategory]}
                    caption={card.caption}
                    categoryPlacedId={card.categoryPlacedId}
                    moveCards={props.moveCards}
                    onClick={props.onClickCard}
                    cardInTransition={props.cardInTransition}
                />
            );

        }
    })

    return (
        <div className='category-wrapper'>
            <p className="font-size-heading">{props.title}</p>

            <div className='category'>
                {
                    _categoryCardsArray
                }
                {
                    context.tryAgain && context.categorySelectedId === props.id
                        ?
                        _incorrectcategoryCardsArray :

                        !context.gameOver &&
                        <div>
                            <button
                                name={props.id}
                                ref={context.categoryRefs.current[props.id - 1]}
                                disabled={context.tryAgain}
                                className={
                                    `sorting-tfo-card drop-here 
                                    ${context.selectedBox == props.id && "selected-category"}`
                                }
                                aria-label={`${props.title} category. Press enter to place card here.`}
                                onClick={(e) => props.onClickCategory(e, props.id, props.title)}
                                onKeyPress={(e) => props.onClickCategory(e, props.id, props.title)}
                            >Déposer ici
                            </button>
                        </div>
                }

            </div>
        </div>
    )
}
export default Category;