import React from 'react';
import SkipLink from '../../../SkipLink';
import Tray from '../Tray';
import ConfigContext from "./ConfigContext";

export default class Matching extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //* Id is the name of the json file. -- set this way in order to have unique id. 
      id: props.config.split('/')[2],
      /**
       * @desc 
       */
      config: null,
      
      /**
       * @type {{
       *        first: Array<{
       *         pairId: 1,
       *         assetURL?: "apple.svg",
       *         alt?: "alt text",
       *         textLabel?: "Apple",
       *         type?: "first" | "second" | "combined"
       *        }>,
       *        second: Array,
       *        combined: Array
       *      }}
       */
      cardData: {},

      /**
       * @desc list of announcements for the screen reader
       */
      announcements: "",

      /**
       * @desc Is JSON file loading
       * @type {boolean}
       */
      loading: true,

      /**
       * @desc are all cards correct, used to display final success pop up
       * @type {boolean}
       */
      allCorrect: false,

      /**
       * @desc Number of times reset
       * @type {number}
       */
      resetCounter: 0
    };
  }

  componentDidMount() {
    fetch(this.props.config)
    .then((response) => {
       // Create JSON object
       return response.json();
    }).then((config) => {
      // Reformat ratio from "50:50" to [50, 50]
      // if (config.columnRatio) {
      //   config.columnRatio = config.columnRatio.split(":").map(n => parseInt(n));
      // }

      this.setState((prevState) => ({
        config: config
      }));
  
      return this.parseConfig(config);
    }).catch((error) => {
       console.error("Error:", error);
    });
  }
  

  /**
  * @desc Announce action to screen reader only
  * @param {string} actionMsg describes the action taken
  */
  announceAction(actionMsg) {
    this.setState(prevState => ({
      announcements: `${actionMsg}`
    }));
  }

  /**
   * @desc build a set of cardData (a deck) to be put onto the tray
   * @param {*} config object extracted from JSON file
   */
  parseConfig(config) {
    let newItems = [...config.items];
    const cardData = this.buildCardData(newItems);
    this.setState((prevState) => ({
      loading: false,
      cardData: cardData
    }));
  }

  /**
   * @desc select subset of items/pairs in stable order
   * @param {Array} items all possible cards to select from
   * @param {number} limit maximum number of cards in the selected - this is not a guarenteed minimum
   * @param {boolean} useRandomPairs randomly decide which pairs to remove
   * @param {number} iteration if not random, tracks where to start the subset
   * @returns {Array} subset of items
   */
  // pickPairs(items, iteration) {
  //   let newItems = [...items];
  //   return newItems;
  // }

  /**
  * @desc create cardData array
  * @return {string}
  */
  buildCardData(data) {
   
    const firstCards = [];
    const secondCards = [];
    const combinedCards = [];

    data.map((item, index) => {
      
      firstCards.push(this.getCardData(item.first, index, 'first'));
      secondCards.push(this.getCardData(item.second, index, 'second'));

      // check if combined is defined, and create it if not
      if (typeof item.combined === 'undefined') {
        item.combined = item.first + "\n" + item.second ;
      };
      combinedCards.push(this.getCardData(item.combined, index, 'combined'));

    })
    // console.log(cardData.combined)
    const cardData = {
      first: firstCards, second: secondCards, combined: combinedCards
    };

    return cardData;
  }

  /**
  * @desc Create card attributes
  * @return {string}
  */
  getCardData(item, index, cardType) {
    return {
      pairId: index,
      type: cardType,
      // imageURL: item[0] !== '' ? this.state.config.basePath + '/' + item[0] : '', // if not empty, set file URL
      // altText: item[1], 
      textLabel: item
    }
  }

   /**
   * @desc Resets the game from the beginning on click of the success pop-up reset button
   */
  // handleReset() {
  //   this.setState(prevState => ({
  //     resetCounter: prevState.resetCounter + 1,
  //     allCorrect: false
  //   }));
  //   this.parseConfig(this.state.config);
  // }

  /**
   * @desc the only end state is when all cards are correctly matched
   */
  handleAllCorrect() {
    this.setState(prevState => ({
      allCorrect: true
    }));
  }

  render() {

    if (this.state.loading) {
      // default loading msg
      return (<div>loading...</div>);
    }
  
    return (

      <div class="matching-container">
          <SkipLink
            elemOrSec={"sec"}
            section={"start"}
            iloName={"matching"}
            instanceId={this.state.id}
            text={this.state.config.iloStartText}
            linkText={this.state.config.iloStartLink}
          />
          {/* Announcer area */}
          <div
            className="screen-reader-only"
            aria-live="assertive"
            aria-atomic="true"
          >
            {this.state.announcements}
          </div>
          <ConfigContext.Provider value={this.state.config}>
            <Tray
              key={this.state.resetCounter}
              counter={this.state.resetCounter}
              // ratio={this.state.config.columnRatio}
              cardData={this.state.cardData}
              onAnnounce={(msg) => this.announceAction(msg)}
              onDone={() => this.handleAllCorrect()}
              shuffle={true}
              question={this.state.config.matchingQuestion}
              questionImage={this.state.config.matchingImage}
              successMessage={this.state.config.successMessage}
              allCorrect={this.state.allCorrect}
            />
            {/* <SuccessPrompt config={this.state.config} visible={this.state.allCorrect} handler={() => this.handleReset()}  />  */}
          </ConfigContext.Provider>
          <SkipLink
            elemOrSec={"sec"}
            section={"end"}
            iloName={"matching"}
            instanceId={this.state.id}
            text={this.state.config.iloEndText}
            linkText={this.state.config.iloEndLink}
          />
        </div>

    );
  }
}