import React from 'react';
import ConfigContext from "../Matching/ConfigContext";
import resources from '../../resources';
import _t from "../../translation";
class Card extends React.PureComponent {
  render() {
    let transformStyles = {};
    if(typeof this.props.transformWidth !== "undefined" && this.props.transformWidth !== 0) {
    transformStyles = {
        height: `${this.props.transformHeight}px`,
        width: `${this.props.transformWidth}px`,
        transform: `translate(${this.props.transformX}px, ${this.props.transformY}px)`,
        transition: `transform 900ms ease-in-out, width 900ms ease-in-out, height 900ms ease-in-out`,
        WebkitTransition: `transform 900ms ease-in-out, width 900ms ease-in-out, height 900ms ease-in-out`,
        MosTransition: `transform 900ms ease-in-out, width 900ms ease-in-out, height 900ms ease-in-out`,
        position: "relative",
        zIndex: 99,
      };
    } 
    if (this.props.reduceMotion == true)
    {
      transformStyles = {};
    }

    const textLabelString = this.props.textLabel || "";
    const isMultiLine = textLabelString.includes("\n");
    const _lines = textLabelString.split("\n").map((line, lineNum) => {
      return line ? (<span aria-hidden="true">{line}</span>) : null;
    })

    const ariaLabels = [
      this.props.isMatchCorrect ? _t('correctly matched') : null,
      this.props.textLabel,
      this.props.isFirstCard ? `this is the first card` : null,
      this.props.isLastCard ? `this is the last card` : null,
      this.props.isSelected ? 'click button to deselect card' : null
    ];

    const matchedBtn = isMultiLine ? textLabelString.split("\n")[0] : "Déposer ici";
    const descriptionDiv = isMultiLine ? textLabelString.split("\n")[1] : textLabelString.split("\n")[0];
  
    const incorrectIcon = 
      this.props.isCoolDown && !this.props.isHidden 
      ? 
      <img src={resources.IncorrectIcon} alt="Incorrect" className="incorrect-icon"/> 
      : 
      null;

    //* For SR, added unique placement option for second cards. 
    const uniqueAriaLabel = 
      this.props.dataTitle === "first" 
      ? 
      ariaLabels.filter(l => l).join('; ') 
      : 
      `Matching Placement option ${this.props.cardIndex + 1} of ${this.props.totalLength}: ${ariaLabels.filter(l => l).join('; ')}`;

    return (
      <div className="card-wrapper" style={this.props.isCoolDown && !this.props.isHidden && this.props.dataTitle === "first" ? {background: "white"} : null}>
        <button
          ref={this.props.forwardRef}
          className={
            'matching-card'
            + (this.props.isMatchCorrect && !this.props.isHidden ? " matched-correct" : "")
            + (this.props.isCoolDown && !this.props.isHidden ? " matched-cooldown" : "")
            + (this.props.isHidden ? " matched-hidden" : "")
            + (this.props.isSelected ? " selected drag-drop-matching" : "")
            + (isMultiLine ? " matching-card-multiline" : "")
            // + (secondBtnsDisabled ? " disabled-effect" : "")
          }
          disabled={this.props.isDisabled}
          onMouseUp={this.props.onMouseUp}
          // onMouseEnter={this.props.onMouseEnter}
          onAnimationStart={this.props.onAnimationStart}
          onAnimationEnd={this.props.onAnimationEnd}
          onKeyDown={this.props.onKeyDown}
          style={transformStyles}
          aria-label={uniqueAriaLabel}
          tabIndex={this.props.isMatchCorrect && !this.props.isHidden ? -1 : 0}
        >
          {this.props.dataTitle === "first" ? _lines : <span aria-hidden="true">{matchedBtn}</span>}
          {this.props.dataTitle === "second" && isMultiLine ? <img src={resources.CorrectIcon} alt="Correct" className="correct-icon"/> : incorrectIcon}
        </button>
        {this.props.dataTitle === "second" ? <div className="card-description"><span aria-hidden="true">{descriptionDiv}</span></div> : null}
      </div>
    );
  }
}
Card.contextType = ConfigContext;
// This is a trick to allow class components to accept a ref
// The ref is passed down to whatever DOM element represents the class component best
export default React.forwardRef((props, ref) => {
  const QUERY = '(prefers-reduced-motion: no-preference)';
  const mediaQueryList = window.matchMedia(QUERY);

  return (
    <Card {...props} forwardRef={ref} reduceMotion={!mediaQueryList.matches} />
  )

});

