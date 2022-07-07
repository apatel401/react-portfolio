import React, { useContext } from 'react';
import { SortingTableContext } from './Provider';
// import resources from '../resources';

function Replay(props) {
    const context = useContext(SortingTableContext)

    return (<div data-id="replay-component" style={context.gameOver ? {'display':'block'} : {'display': 'none'}} className="endgame-on">

            <div className="arrow" style={{"--custom-color": "#00bfdf"}}>
            <div className="tfo-sorting-feedback">
                    <div className="tfo-sorting-result-response">
                        <span className="success-checkmark"/>
                        <h3 className="endgame-feedback">{context.successMessage}</h3>
                    </div>
                    <div className="endgame-feedback-message">{context.successMessageComments}</div>
                </div>

            </div>
    </div>)
}

export default Replay;

