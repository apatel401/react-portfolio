import React, { useEffect, useContext } from 'react';
import { FlowchartContext } from './Provider';

function AnswerStore(props) {
    let selectedCard;
    let target;

    const context = useContext(FlowchartContext);

    // This function calculates width of the flowchart-card
    const getElemSize = () => {
        if (props.inputRef.current.children[1].children) {
            let elem = Array.from(props.inputRef.current.children[1].children)

            let newWidth;
            let newHeight;

            for (let i = 0; i < elem.length; i++) {
                if (elem[i].classList == 'flowchart-card' || elem[i].classList == 'flowchart-card hidden-card') {
                    newWidth = elem[i].offsetWidth;
                    newHeight = elem[i].offsetHeight;
                    break;
                }                
            }

            context.updateContext({ width: newWidth, height: newHeight });
        }
    };

    // Set default 'width' and 'height' on window load
    useEffect(() => {    
        let elemWidth = props.inputRef.current.children[1].children[0].offsetWidth;
        let elemHeight = props.inputRef.current.children[1].children[0].offsetHeight;
        context.updateContext({ defaultWidth: elemWidth, defaultHeight: elemHeight });
        context.updateContext({ defaultWidth: elemWidth });
    }, []);

    // Update 'width' when the window resizes
    useEffect(() => {
        window.addEventListener("resize", getElemSize);
    }, []);

    useEffect(() => {
        for (let i = 0; i < context.matchedCards.length; i++) {
            if (context.width > 0 && context.height === 0) {
                context.matchedCards[i].style.width = context.width+"px";
            } else if (context.height > 0 && context.width === 0) {
                context.matchedCards[i].style.height = context.height+"px";
            } else if (context.width > 0 && context.height > 0) {
                context.matchedCards[i].style.width = context.width+"px";
                context.matchedCards[i].style.height = context.height+"px";
            } 
        }
    }, [context.matchedCards, context.width, context.height]);

    class ClicktoClick {
        constructor(target) {
            this.boardRef = Array.from(props.inputRef.current.getElementsByClassName("flowchart-card"));
            this.answerRef = Array.from(props.inputRef.current.getElementsByClassName("answerStore"));
            this.getElementsTagNameDIV = [];
            this.selectedElement = [];
            this.target = target;
            this.complete = false;
        }
        checkCard(e) {
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

            props.handleScreenReadSelections(target, selectedCard)

            if (this.selectedElement.classList == 'answerStore selected' || this.selectedElement.classList == 'flowchart-card selected') {
                if (this.selectedElement.dataset.id == this.target.dataset.id
                    && this.selectedElement != this.target
                    && (this.selectedElement.dataset.id == props.cardsPlaced || props.freeplay)
                ) {
                    // Trigger icon animation
                    props.animateMatch(this.target, this.selectedElement);

                    const animation = () => {

                        this.selectedElement.style = '';
                        let parent = this.target.parentNode;

                        let selectedElementClone = this.selectedElement.cloneNode(true);
                        this.selectedElement.classList.remove('selected');
                        this.selectedElement.classList.add("hidden-card");

                        this.selectedElement.ariaHidden = true;
                        this.selectedElement.innerText = "";
                        this.selectedElement.disabled = true;
                        this.selectedElement.style.width = 'auto';                    
                        this.selectedElement.style.backgroundColor = "#ECECEC";

                        let selectedElement = [...context.hiddenCards];
                        selectedElement.push(this.selectedElement);

                        context.updateContext({ hiddenCards: selectedElement });

                        parent.replaceChild(selectedElementClone, this.target);
                        this.selectedElement = selectedElementClone;                        

                        //Check if it was keyboard or click input
                        // Focus back to the top if the answer is correct
                        try {
                            if (e.key === 'Enter' || e.key === ' ') {                             
                                for (let i = 0; i < this.boardRef.length; i++) {
                                    if (this.boardRef[i].classList.value === 'flowchart-card') {
                                        this.boardRef[i].focus()
                                        break;
                                    }
                                }
                            }
                        } catch (err) { }
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
                                if(answerRef.classList.value === 'flowchart-card matched-correct') {
                                    answerRef.disabled = true
                                }
                            })
                            this.selectedElement.disabled = true
                            props.runAllCardsPlaced();
                        }
                        this.complete = true;
                        this.selectedElement.classList.remove('selected');
                        this.target.classList.remove('selected');

                        this.selectedElement.classList.add('matched-correct');
                        this.selectedElement.tabIndex = "-10";
                        this.target.classList.add('matched-correct');

                        this.selectedElement.style.width = context.defaultWidth+"px";
                        this.selectedElement.style.height = context.defaultHeight+"px";

                        let matchedElement = [...context.matchedCards];
                        matchedElement.push(this.selectedElement);

                        context.updateContext({ matchedCards: matchedElement });

                        this.selectedElement.ariaLabel = "Answer placement option " + (props.dataset + 1) + " of " + props.answerOptions.length + ". " +  this.selectedElement.textContent + " placed here correctly"

                    }

                    // If OS animations have been disabled
                    if (props.reduceMotion) animation()
                    
                    // After the transition replace the answer Store with the card
                    this.selectedElement.ontransitionend = () => {
                        animation()
                    }

                    props.countCardsPlaced();
                    props.storePlacedCards(this.selectedElement.dataset, this.target.dataset)


                } else if (this.selectedElement.dataset.id != this.target.dataset.id && !this.target.classList.contains("hideAnswers-sequential")) {
                    this.addCoolDown(this.selectedElement, this.target, e);
                    // this.selectedElement.focus()


                } else if (props.freeplay
                    && this.selectedElement.dataset.id == this.target.dataset.id
                    && this.selectedElement != this.target
                    && this.selectedElement.dataset.id == props.cardsPlaced) {

                    // Trigger icon animation
                    props.animateMatch(this.target, this.selectedElement);

                    const animation = () => {
                        this.selectedElement.style = '';
                        let parent = this.target.parentNode;

                        // parent.replaceChild(this.selectedElement, this.target);
                        let selectedElementClone = this.selectedElement.cloneNode(true);
                        this.selectedElement.classList.remove('selected');
                        this.selectedElement.classList.add("hidden-card");
                        this.selectedElement.tabIndex = -10;
                        this.selectedElement.removeAttribute("aria-label");
                        parent.replaceChild(selectedElementClone, this.target);
                        this.selectedElement = selectedElementClone;

                        //Check if it was keyboard or click input
                        try { if (e.key === 'Enter' || e.key === ' ') { this.selectedElement.focus() } } catch (err) { }
                        if (props.cardsPlaced == props.answerOptions.length - 1) {
                            this.boardRef = Array.from(props.inputRef.current.children[1].children);
                            this.boardRef.forEach(boardRef => {
                                if (boardRef.classList.value === 'flowchart-card hidden-card') {
                                    boardRef.remove()
                                }
                            })
                            props.runAllCardsPlaced();
                        }
                        this.target.classList.remove('selected');
                        this.selectedElement.classList.remove('selected');
                        this.selectedElement.classList.add('matched-correct');
                        this.selectedElement.tabIndex = "-10";
                        this.target.classList.add('matched-correct');
                    }

                    // If OS animations have been disabled
                    if (props.reduceMotion) animation()

                    // After the transition replace the answer Store with the card
                    this.selectedElement.ontransitionend = () => {
                        animation()
                    };

                    props.countCardsPlaced();
                    // If in freeplaymode, pass the correctly placed card to this array so we can update the aria-label in Card.js
                    props.storePlacedCards(this.selectedElement)
                    this.complete = true;

                } else {
                    console.log("HIT")
                    this.target.classList.remove('selected');
                    this.selectedElement.classList.remove('selected');
                }
            }

            if (!this.complete) {
                if (this.selectedElement.length !== 0) {
                    this.selectedElement.classList.remove('selected');
                }
                if (this.target == this.selectedElement) {
                    this.target.classList.remove('selected');
                    this.selectedElement.classList.remove('selected');

                } else if (this.target.classList.contains('hideAnswers-sequential')) {
                    return

                } else if (this.target.classList === "card-image") {
                    this.target.parentNode.classList.add('selected');

                } else if (!this.target.classList.contains('flowchart-card')
                    && !this.target.classList.contains('selected')
                    && !this.target.classList.contains('hideAnswers-sequential')) {
                    this.target.classList.add('selected');
                } else if ((this.complete && !this.target.classList.contains('hideAnswers-sequential'))) {
                    this.target.classList.add('selected');

                } else {
                    ''
                }
            }
        }

        addCoolDown(selectedElement, target, e) {
            // If the board type is the same board/answer store then don't allow a comparison
            if (selectedElement.parentNode.dataset.id != target.parentNode.dataset.id) {
                selectedElement.className = "flowchart-card flow-coolDown"
                target.className = "answerStore flow-coolDown"
                this.complete = true;

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
                            selectedElement.focus();
                        }
                    } } catch (err) { };

                }, 1500)
            }
        }
    }

    // Pick up the data here
    const clickDropFunc = (e) => {
        e.preventDefault();
        const target = e.target;
        // target.blur();
        new ClicktoClick(target).checkCard(e);
    }

    const onKeyDown = e => {
        const target = e.target;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            new ClicktoClick(target).checkCard(e);

        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            props.arrowOrder(-1);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            props.arrowOrder(1);
        }
    }


    // Allow the LXD to initiate freeplay using the JSON
    let tabIndex;
    if (props.freeplay) {
        tabIndex = '0';
    } else if (!props.freeplay && props.cardsPlaced != props.dataset) {
        tabIndex = '-10';
    } else {
        tabIndex = '0';
    }

    let classGroup;
    let hiddenPlacement;
    let btnText;

    if (props.freeplay) {
        classGroup = 'answerStore';
        hiddenPlacement = '';
        btnText = props.dropboxText;
    } else if (!props.freeplay && props.cardsPlaced < props.dataset) {
        classGroup = 'hideAnswers-sequential';
        hiddenPlacement = 'Slot not available to place a card in yet.'
    } else {
        classGroup = 'answerStore';
        hiddenPlacement = '';
        btnText = props.dropboxText;
    }

    return (
        <>
        <div className='answerStore-items'>   
            <div className='answerStore-numbers-parent'>
                <p className={`answerStore-numbers ${props.answerOptions.length === 5 ? `number-line-5-${props.dataset +1}` : `number-line-4-${props.dataset +1}`}`}>
                    {props.dataset +1}
                </p>                
            </div>
            <button
                id={props.id}
                data-id={props.dataset}
                data-stid={props.dataset}
                className={(classGroup)}
                tabindex={tabIndex}
                type={props.type}
                onKeyDown={onKeyDown}
                onClick={clickDropFunc}
                aria-label={props.ariaLabel
                    + (hiddenPlacement)
                }
                z-index="20"
                style={{
                    height: context.height > 0 ? context.height+"px" : context.defaultHeight+"px",
                    width: context.width > 0 ? context.width+"px" : context.defaultWidth+"px"
                }}
            >
                {(btnText)}
                {props.children}
            </button>
        </div>
        </>
    )
}

export default AnswerStore;
