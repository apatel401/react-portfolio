import React from 'react';

function Success(props) {
    return (<div data-id="Success-component" class={props.visible ? 'endgame-on ' : 'endgame-off '}>
            <div
                className="arrow"
                style={{
                    "--custom-color": "#00bfdf"
                }}
            >
                <div className="flowchart-feedback">
                    <div className="flowchart-result-response">
                        <span className="success-checkmark"/>
                        <h3 className="endgame-feedback">{props.config.successFeedback}</h3>
                    </div>
                    <div className="endgame-feedback-message">{props.config.successFeedbackMessage}</div>
                </div>
            </div>
    </div>)
}

export default Success;

