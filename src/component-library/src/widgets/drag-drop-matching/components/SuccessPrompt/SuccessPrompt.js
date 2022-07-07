import React from 'react';
import resources from '../../resources';

export default class SuccessPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.resetBtnRef = null;
  }
    render() {
    
      return (
      <div className={ this.props.visible ? 'success-on ' : 'success-off ' }>

        <div className="border-arrow"></div>  
        <div className="success-border-top"></div>
        <div className='success-container'>
          <div className="success-message">
            <div className="success-title">
              <span className="success-checkmark"/>
              <h3>C'est exact!</h3>
            </div>
            <p>{ this.props.successMessage }</p></div>
        </div>
      </div>)
    }
  }