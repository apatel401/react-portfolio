/* eslint-disable eqeqeq */
import React, { useState, useContext } from 'react';
import { FlowchartContext } from './Provider';
// import resources from '../resources'

function Card(props) {

    const context = useContext(FlowchartContext)

    let selectedCard;
    let target;
    let placedCorrectly = false;

    const [isMatchCorrect, setIsMatchCorrect] = useState(null)

    let transformStyles = {};

    if (typeof props.cardPos.transformWidth !== "undefined" && props.cardPos.transformWidth !== 0 && props.dataset == props.cardPos.cardToMoveId && !props.reduceMotion) {
        let newY = props.cardPos.transformY
        transformStyles = {
        
            transform: `translate(${props.cardPos.transformX}px, ${newY}px)`,
            transition: `transform 1300ms ease-in-out5s, width 1500ms ease-in-out 1s, height 1300ms ease-in-out 1s !important`,
            '-webkit-transition': `transform 1300ms ease-in-out, width 1500ms ease-in-out, height 1300ms ease-in-out`,
            '-moz-transition': `transform 1300ms ease-in-out, width 1500ms ease-in-out, height 1300ms ease-in-out`,
            zIndex: 6
        };
    }

    class ClicktoClick {
        constructor(target) {
            this.boardRef = Array.from(props.inputRef.current.getElementsByClassName("flowchart-card"));
            this.answerRef = Array.from(props.inputRef.current.getElementsByClassName("answerStore"));

            this.selectedElement = [];
            this.getElementsTagNameDIV = [];
            this.target = target;
            this.complete = false;
            this.jvalue = [];
        }
        checkCard(e) {
            props.returnAnswerRef(this.answerRef)
            this.answerRef.forEach(answerRef => {
                if (answerRef.classList == 'answerStore selected') this.selectedElement = answerRef;
            })

            this.boardRef.forEach(boardRef => {
                if (boardRef.classList == 'flowchart-card selected') this.selectedElement = boardRef;
            })

            selectedCard = this.selectedElement;
            target = this.target;

            // If one of the cards is in motion stop the user from being able to select another card
            for (var i = 0; i < this.boardRef.length; i++) {
                if (this.boardRef[i].style.transform) {
                    return
                }
            }
            if (!target.classList.contains('matched-correct')) props.handleScreenReadSelections(target, selectedCard)


            // if the user grabs the image, grab the parents instead (the card)
            if (this.target instanceof HTMLImageElement) {
                this.target = this.target.parentNode;
            }


            if (this.selectedElement.classList == 'answerStore selected'
                || this.selectedElement.classList == 'flowchart-card selected') {
                if (this.selectedElement.dataset.id == this.target.dataset.id
                    && this.selectedCard != this.target
                    && this.selectedElement != this.target
                ) {
                    this.target.classList.add('selected');

                    setIsMatchCorrect(true);
                    props.animateMatch(this.selectedElement, this.target);

                    const animation = () => {
                        this.target.style = '';
                        let parent = this.selectedElement.parentNode;

                        let targetClone = this.target.cloneNode(true);
                        this.target.classList.remove('selected');
                        this.target.classList.add("hidden-card");

                        this.selectedElement.ariaHidden = true;
                        this.selectedElement.innerText = "";
                        this.selectedElement.disabled = true;
                        this.target.innerText = "";
                        this.target.style.width = 'auto';
                        this.target.style.backgroundColor = "#ECECEC";

                        let target = [...context.hiddenCards];
                        target.push(this.target);

                        context.updateContext({ hiddenCards: target });

                        parent.replaceChild(targetClone, this.selectedElement);
                        this.target = targetClone;

                        //Check if it was keyboard or click input
                        // Focus back to the top if the answer is correct
                        try {
                            if (e.key === 'Enter' || e.key === ' ') {
                                for (let i = 0; i < this.boardRef.length; i++) {
                                    // eslint-disable-next-line eqeqeq
                                    if (this.boardRef[i].classList == 'flowchart-card') {
                                        this.boardRef[i].focus()
                                        break;
                                    }
                                }
                            }
                        } catch (err) { }
                        // Wait until the animation is finished ot run the reaply message
                        if (props.cardsPlaced == props.answerOptions.length - 1) {
                            this.boardRef = Array.from(props.inputRef.current.children[1].children);
                            this.boardRef.forEach(boardRef => {
                                if (boardRef.classList.value === 'flowchart-card hidden-card') {
                                    // boardRef.remove()
                                    boardRef.zIndex = -10;
                                    boardRef.disabled = true;
                                }
                            })
                            this.answerRef.forEach(answerRef => {
                                if (answerRef.classList.value === 'flowchart-card matched-correct') {
                                    answerRef.disabled = true
                                }
                            })
                            this.target.disabled = true
                            props.runAllCardsPlaced();
                        }
                        this.selectedElement.classList.remove('selected');
                        this.target.classList.remove('selected');

                        this.selectedElement.classList.add('matched-correct');
                        this.target.classList.add('matched-correct');
                        this.target.tabIndex = "-10";
                        this.target.style.width = context.defaultWidth+"px";

                        let matchedElement = [...context.matchedCards];
                        matchedElement.push(this.target);

                        context.updateContext({ matchedCards: matchedElement });
                        
                        placedCorrectly = true;
                    }

                    // If OS animations have been disabled
                    if(props.reduceMotion) animation()

                    // After the transition replace the answer Store with the card
                    this.target.ontransitionend = () => {
                        animation()
                    };
                    
                    this.complete = true;
                    props.countCardsPlaced();

                    // A conditional for if the user clicks on the image instead of the div
                } else if (this.selectedElement.dataset.id == this.target.dataset.id
                    && this.selectedElement.parentNode != this.target.parentNode) {
                    setIsMatchCorrect(true);

                    let parent = this.selectedElement.parentNode;
                    let targetClone = this.target.cloneNode(true);
                    this.target.classList.remove('selected');
                    this.target.classList.add("hidden-card");
                    this.target.tabIndex = -10;
                    this.target.removeAttribute("aria-label");
                    parent.replaceChild(targetClone.parentNode, this.selectedElement);
                    this.target = targetClone;

                    this.complete = true;
                    this.target.parentNode.classList.add('matched-correct');
                    this.target.classList.add('matched-correct');
                    props.countCardsPlaced();
                }
                else if (this.selectedElement != this.target) {                    
                    if (this.target.classList.contains("matched-correct")) {

                        return;
                    } else {
                        this.addCoolDown(this.selectedElement, this.target, e);
                        this.selectedElement.classList.remove('selected');
                    }
                } else {
                    this.target.classList.remove('selected');
                    this.complete = true;
                }
            }

            // If the user clicks on the image, add "selected" class to the parent node instead of the image.
            if (!this.complete) {
                if (this.target.classList == "card-image" && !this.target.parentNode.classList.contains('selected')) {
                    this.target.parentNode.classList.add('selected');
                } else if (!this.target.classList.contains('matched-correct')) {
                    this.target.classList.add('selected');
                }
            } else {
                // eslint-disable-next-line no-unused-expressions
                ''
            }
        }
        addCoolDown(selectedElement, target, e) {
            // If the board type is the same board/answer store then don't allow a comparison
            // Othrwise show incorrect animation
            if (target.parentNode.dataset.id != selectedElement.parentNode.dataset.id) {
                selectedElement.className = "answerStore flow-coolDown"
                target.className = "flowchart-card flow-coolDown"
                this.complete = true;

                // Add the incorrect icon to the current element before we replace the destination
                setIsMatchCorrect(false)                

                setTimeout(() => {
                    selectedElement.classList.remove('flow-coolDown');
                    target.classList.remove('flow-coolDown');
                    target.blur();
                    //focus on the card after fail.
                    try { if (e.key === 'Enter' || e.key === ' ') { 
                        if (props.freeplay === true) {
                            selectedElement.classList.add('selected');
                            target.focus(); 
                        } else {
                            target.focus();
                        }
                    } } catch (err) { };
                    setIsMatchCorrect(null);
                    
                }, 1500);
            }

        }

        removeSelected(e) {
            if (this.target instanceof HTMLImageElement) {
                this.target = this.target.parentNode;
            }
            this.boardRef.forEach(boardRef => {
                if (boardRef != this.target) boardRef.classList.remove('selected');
            })
            props.returnAnswerRef(this.answerRef)
            this.answerRef.forEach(answerRef => {
                if (answerRef != this.target) answerRef.classList.remove('selected');
            })
            this.target.classList.add('selected');
        }
    }


    // Set the DATA on click here
    const clickPickupFunc = (e) => {
        e.preventDefault();
        const target = e.target;
        if (props.defaultState) new ClicktoClick(target).checkCard(e);
    }

    const onKeyDown = e => {
        const target = e.target;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (props.defaultState) new ClicktoClick(target).checkCard(e);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            props.arrowOrder(-1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            props.arrowOrder(1);
        }
    }

    // Change the aria-label announcements based on the play type of the
    let ariaAnnouncements
    if (!props.freeplay) {
        ariaAnnouncements = props.cardsPlaced > props.dataset ? "Answer placement option " + (props.dataset + 1) + " of " + props.answerOptions.length + ". " + props.textValue + " placed here correctly" : "Card option " + (props.placement + 1) + " of " + props.answerOptions.length + ". Card reads: " + props.textValue

    } else if (props.freeplay) {
        ariaAnnouncements = isMatchCorrect || placedCorrectly ? "Answer placement option " + (props.dataset + 1) + " of " + props.answerOptions.length + ". " + props.textValue + " placed here correctly" : "Card option " + (props.placement + 1) + " of " + props.answerOptions.length + ". Card reads: " + props.textValue

    }

    return (
        <>
            {
                <button
                    data-id={props.dataset}
                    className={props.className}
                    tabindex={props.gameOver ? -1 : 0}
                    onKeyDown={onKeyDown}
                    onClick={clickPickupFunc}
                    aria-label={ariaAnnouncements}
                    style={props.cardsPlaced == 0 ? null : transformStyles}
                >
                    {/* props.children is the inner text content of the card */}
                    {props.children}
                </button>
            }
        </>
    )
}

export default Card;