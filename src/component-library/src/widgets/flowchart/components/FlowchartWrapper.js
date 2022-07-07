import React from 'react';
import Instructions from "./Instructions"
import Card from "./Card"
import AnswerStore from "./AnswerStore"
import Success from "./Success";
import SkipLink from '../../SkipLink';

class FlowchartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      config: null,
      answerOptions: [],
      // Holds the text value in the order they appear in the json
      completeFlow: '',
      loading: true,
      userCardOrder: [],
      allAnswersInPlace: false,
      allCorrect: false,
      cardsPlaced: 0,
      instruction: "",
      cardPos: {},
      cardPosRev: {},
      gameOver: false,
      placedCardsArr: [],
      answerPlacementsUsedArr: [],

      // States required for screen readers
      announcements: "",
      cardSelected: null,
      isMatched: false,

    }
    this.getElementsTagNameDIV = [];
    this.jvalue = [];
    this.readAgain = false;
    this.defaultState = true;
  }

  arrowOrder(position) {//arrows keyboard function
    const boardRef = Array.from(this.inputRef.current.children[1].children);
    const answerRef = Array.from(this.inputRef.current.children[2].children);
    this.returnAnswerRef(answerRef)
    this.getElementsTagNameDIV = [...boardRef, ...answerRef]
    for (var i = 0; i < this.findAllType().length; i++) {
      if (this.findAllType()[i] === document.activeElement) {
        if (i + position < 0 || i + position == this.findAllType().length) position = 0; // Prevents arrows from crashing
        this.jvalue = this.findAllType()[i + position]
      }
    }
    this.jvalue.focus();
  }

  findAllType() {//finds all cards that have tabindex
    var liLenV = Array.prototype.filter.call(this.getElementsTagNameDIV,
      (el) => { { return el.getAttribute('tabindex') == 0 } })
    return liLenV;
  }

  returnAnswerRef(answerRef) {//cycilical search here.
    try {
      answerRef.push(answerRef[0].children[0].children[0].children[0])
      answerRef.push(answerRef[0].children[0].children[2].children[0])
      answerRef.push(answerRef[0].children[0].children[4].children[0])
      answerRef.push(answerRef[0].children[0].children[6].children[0])
      answerRef.push(answerRef[0].children[0].children[8].children[0])
    } catch (err) { }
    return answerRef
  }

  componentDidMount() {
    fetch(this.props.config)
      .then((response) => {
        // Create JSON object;
        return response.json();
      }).then((config) => {

        this.setState((prevState) => ({
          config: config
        }));

        return this.parseConfig(config);
      }).catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
* @desc build a set of cardData (a deck) to be put onto the tray
* @param {*} config object extracted from JSON file
*/
  parseConfig(config) {

    const dataConfig = [];
    const fullFlow = []

    config.options.map((config, index) => {
      config.id = index;
      dataConfig.push(config)
    })

    for (var i = 0; i < config.options.length; i++) {
      fullFlow.push(config.options[i].textValue)
    }
    this.setState(({
      completeFlow: fullFlow,
    }))

    shuffleCards(dataConfig);
    // Shuffle cards before setting the state to they are random everytime with the Fisher-Yates method
    function shuffleCards(dataConfig) {
      for (let i = dataConfig.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = dataConfig[i];
        dataConfig[i] = dataConfig[j];
        dataConfig[j] = temp;
      }
    }

    this.setState((prevState) => ({
      loading: false,
      answerOptions: dataConfig
    }));
  }


  selectedCard(card) {
    this.setState(prevState => ({
      selectedCard: card
    }));
  }

  getCardData(card) {
    if (!card) return null;
  }

  isCardEqual(c1, c2) {
    if (c1 === null || c2 === null) return false;
    return c1 == c2;
  }

  isCardSameGroup(c1, c2) {
    if (this.state.selectedCard && c1.classList[0] == c2.classList[0]) {
      return true;
    }
    else {
      return false
    }
  }

  announceAction(actionMsg,) {
    console.log("passed back to flow for a message: ", actionMsg);

    this.setState(({
      announcements: `${actionMsg}`,
    }));
  }

  handleScreenReadSelections(card, card2) {

    // If we pass the image, grab the card instead
    if (card instanceof HTMLImageElement) {
      card = card.parentNode;
    }

    // Toggle selected
    if (this.isCardEqual(this.state.selectedCard, card)) {
      if (card.classList[0] === "answerStore") {
        console.log("answer slot de-selected");
        this.announceAction('answer slot de-selected, pick a card to match');
        this.setState(prevState => ({
          selectedCard: null,
        }));
        return;
      } else {
        console.log("card de-selected");
        this.announceAction('card de-selected');
        this.setState(prevState => ({
          selectedCard: null,
        }));
        return;
      }
      // This does not itrgger a state update or announcement if used more than once
    } else if (this.isCardSameGroup(this.state.selectedCard, card) && !this.readAgain) {
      if (card.classList[0] === "answerStore") {
        this.announceAction(' empty answer slot Selected');
        this.readAgain = true;
        this.setState(prevState => ({
          selectedCard: null,
        }));
        return;
      } else {
        this.announceAction('card Selected');
        this.readAgain = true;
        this.setState(prevState => ({
          selectedCard: card,
        }));
        return;
      }
    } else if (this.isCardSameGroup(this.state.selectedCard, card) && this.readAgain) {
      if (card.classList[0] === "answerStore") {
        this.announceAction('empty Answer slot selected, pick a card to match');
        this.readAgain = false;
        this.setState(prevState => ({
          selectedCard: card,
        }));
        return;
      } else {
        this.announceAction('Card selected');
        this.readAgain = false;
        this.setState(prevState => ({
          selectedCard: card,
        }));
        return;
      }
    } else if (!this.state.selectedCard) {
      if (card.classList[0] === "answerStore") {
        this.announceAction('empty answer slot selected, pick a card to match');
        this.readAgain = true;
        this.setState(prevState => ({
          selectedCard: card,
        }));
        return;
      } else {
        this.announceAction('card selected');
        this.setState(prevState => ({
          selectedCard: card,
        }));
        return;
      }
    }

    // Try to match
    let isMatch;

    if (!this.state.config.freeplay) {
      isMatch = this.state.selectedCard.dataset.id == card.dataset.id
        && this.state.selectedCard != card
        && this.state.selectedCard.dataset.id == this.state.cardsPlaced

    } else {
      isMatch = this.state.selectedCard.dataset.id == card.dataset.id
        && this.state.selectedCard != card
    }

    if (isMatch && this.state.cardsPlaced < this.state.answerOptions.length - 1) {
      
      let text;
      
      if (card.textContent === "Déposer ici") {
        text = card2.textContent        
      } else {
        text = card.textContent
      }

      this.announceAction(`card matched correctly ${text}, find another match and continue through the flow.`);

      this.setState(prevState => ({
        selectedCard: null,
        announcements: `card matched correctly ${text}, find another match and continue through the flow.`
      }))
    }

    else if (isMatch && this.state.cardsPlaced === this.state.answerOptions.length - 1) {

      let text;
      
      if (card.textContent === "Déposer ici") {
        text = card2.textContent        
      } else {
        text = card.textContent
      }

      this.announceAction(`card matched correctly ${text}`);
      this.setState(prevState => ({
        selectedCard: null,
        announcements: `card matched correctly ${text}`
      }))
    }

    else {
      this.announceAction(`card incorrectly matched. Pick another card to try again`);
      this.setState(prevState => ({
        selectedCard: null,
        announcements: "card incorrectly matched. Pick another card to try again"
      }
      ))
    }
  }

  readFlow() {
    let flow = this.state.completeFlow.toString();
    this.announceAction(`Flow complete: ${flow}, ${this.state.config.successFeedback}, ${this.state.config.successFeedbackMessage}`);

    this.setState(prevState => ({
      announcements: `Flow complete: ${flow}, ${this.state.config.successFeedback}, ${this.state.config.successFeedbackMessage}`,
      allAnswersInPlace: true,
      gameOver: true,

    }
    ))
  }


  animateMatch(selectedElement, target) {
    // Get bounding client returns information on the element when it's created dynamically in the DOM
    let selectedElementInfo = selectedElement.getBoundingClientRect()
    let targetInfo = target.getBoundingClientRect()

      this.setState(({ cardPos }) => ({
        cardPos: {
          ...cardPos,
          cardToMoveId: selectedElement.dataset.id,
          // Finding out the difference in distance we're going to move in x and y directions
          // this is halfing the difference, not always in the middle when placed
          transformX: -(targetInfo.x - selectedElementInfo.x),
          transformY: -(targetInfo.y - selectedElementInfo.y),

          // Finding out the difference in size we are making the original to fit the new element
          transformWidth: selectedElementInfo.width,
          transformHeight: selectedElementInfo.height,
        }
      }));
  }

  countCardsPlaced() {
    const newTotal = this.state.cardsPlaced + 1

    this.setState((prevState) => ({
      cardsPlaced: newTotal
    }));
  }

  // Triggers Success option when all the cards are matched
  runAllCardsPlaced() {
    this.setState(prevState => ({
      disableResetBtn: true,
      announcements: "game complete"
    }, this.readFlow()));
  }

  storePlacedCards(card, answerStore) {
    this.setState(prevState => ({
      placedCardsArr: [...prevState.placedCardsArr, card.id],
      answerPlacementsUsedArr: [...prevState.answerPlacementsUsedArr, answerStore.id]
    }));
  }



  render() {
    if (this.state.loading) {
      // default loading msg
      return (<div class='warn'>error: Flowchart - missing config</div >);
    }
    return (
      <div className='flowchart-container-tfo'>
        <SkipLink
          elemOrSec={"elem"}
          section={"start"}
          iloName={"flowchart"}
          instanceId={this.props.id}
          text={this.state.config.iloStartText}
          linkText={this.state.config.iloStartLink}
        />
        <Instructions
          className={"instructionalSection"}
          question={this.state.config.question}
          instruction={this.state.config.instruction}
          inputRef={this.inputRef}
          type={this.state.config.type}
          firstItem={this.state.config.options[0]}
          image={this.state.config.instructionImage}
        />
        <div
          className="flowchart-container-tfo"
          ref={this.inputRef}
        >

          <div
            class="screen-reader-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {this.state.announcements}
          </div>

          <div
            data-id="board-1"
            className="board board-1"
          >

            {this.state.answerOptions.map((options, index) => {
              return (
                <>

                  <Card
                    type={this.state.config.type}
                    key={options.id}
                    dataset={options.id}
                    placement={index}
                    answerOptions={this.state.answerOptions}
                    className="flowchart-card"
                    inputRef={this.inputRef}
                    freeplay={this.state.config.freeplay}
                    defaultState={this.defaultState}
                    countCardsPlaced={this.countCardsPlaced.bind(this)}
                    onAnnounce={(msg) => this.announceAction(msg)}
                    arrowOrder={this.arrowOrder.bind(this)}
                    returnAnswerRef={this.returnAnswerRef.bind(this)}
                    selectedCard={this.selectedCard.bind(this)}
                    cardSelected={this.state.cardSelected}
                    textValue={options.textValue}
                    isCardSelected={this.isCardEqual(this.state.selectedCard, this.card)}
                    animateMatch={this.animateMatch.bind(this)}
                    cardPos={this.state.cardPos}
                    handleScreenReadSelections={this.handleScreenReadSelections.bind(this)}
                    gameOver={this.state.gameOver}
                    runAllCardsPlaced={this.runAllCardsPlaced.bind(this)}
                    cardsPlaced={this.state.cardsPlaced}
                    configData={this.props.config}
                    placedCardsArr={this.state.placedCardsArr}
                    answerPlacementsUsedArr={this.state.answerPlacementsUsedArr}
                    reduceMotion={this.props.reduceMotion}
                  >
                    {options.textValue}
                  </Card>
                </>)
            })}
          </div>

          <div
            dataset="answerBoard"
            className="board answerBoard"
          >
            {this.state.answerOptions.map((options, index) => {
              return (<AnswerStore
                key={index}
                dataset={index}
                className="answerStore"
                inputRef={this.inputRef}
                type={options.type}
                cardsPlaced={this.state.cardsPlaced}
                countCardsPlaced={this.countCardsPlaced.bind(this)}
                onAnnounce={(msg) => this.announceAction(msg)}
                ariaLabel={"Answer placement option " + (index + 1) + " of " + this.state.answerOptions.length + ',' + this.state.config.dropboxText + "."}
                dropboxText={this.state.config.dropboxText}
                arrowOrder={this.arrowOrder.bind(this)}
                returnAnswerRef={this.returnAnswerRef.bind(this)}
                animateMatch={this.animateMatch.bind(this)}
                handleScreenReadSelections={this.handleScreenReadSelections.bind(this)}
                answerOptions={this.state.answerOptions}
                textValue={options.textValue}
                runAllCardsPlaced={this.runAllCardsPlaced.bind(this)}
                freeplay={this.state.config.freeplay}
                cardPosRev={this.state.cardPosRev}
                isMatched={this.state.isMatched}
                storePlacedCards={this.storePlacedCards.bind(this)}
                reduceMotion={this.props.reduceMotion}
              >
              </AnswerStore>
              )
            })
            }
          </div>

          <Success
              visible={this.state.allAnswersInPlace}
              config={this.state.config}
              onAnnounce={(msg) => this.announceAction(msg)}
            />
        </div>
        <SkipLink
          elemOrSec={"elem"}
          section={"end"}
          iloName={"flowchart"}
          instanceId={this.props.id}
          text={this.state.config.iloEndText}
          linkText={this.state.config.iloEndLink}
        />
      </div>
    )
  }
}

export default (props) => {
  const QUERY = '(prefers-reduced-motion: reduce)';
  const mediaQueryList = window.matchMedia(QUERY);

  return (
    <FlowchartWrapper {...props} reduceMotion={mediaQueryList.matches} />
  )
};

