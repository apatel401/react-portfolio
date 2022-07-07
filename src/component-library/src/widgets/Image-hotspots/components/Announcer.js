
import React from 'react';

const Announcer = React.memo((props) => {
    // With react memo, react memorizes the the result
    // Meaning that if the new props are the same then it will skip the next rendering
    // If the contents of the props changes, then react will re-render

    let messageContent = props.message;
    let areas = props.areas;
    let areaId = props.areaId;

    const message = () => {
        switch(messageContent) {
            case 'displayDetails':
                return (areaId + 1) === areas.length ?
                    (`${areas[areaId].name}. ${areas[areaId].areaDetails[0]} ${areas[areaId].areaDetails[1] ?  "Image: " + areas[areaId].areaDetails[2] : ""} End of ${areas[areaId].name}, press enter to repeat, or tab to go to the end.`):
                    (`${areas[areaId].name}. ${areas[areaId].areaDetails[0]} ${areas[areaId].areaDetails[1] ?  "Image: " + areas[areaId].areaDetails[2] : ""} End of ${areas[areaId].name}, press enter to repeat, or tab to go to the next section.`)
                    // (areas[areaId].name + ". " + areas[areaId].areaDetails[0] + " Image: " + areas[areaId].areaDetails[2] + ". " + " End of " + areas[areaId].name + ", press enter to repeat, or tab to go to the end.") :
                    // (areas[areaId].name + ". " + areas[areaId].areaDetails[0] + " Image: " + areas[areaId].areaDetails[2] + ". " + " End of " + areas[areaId].name + ", press enter to repeat, or tab to go to the next section.")
            default:
                return '';
        }
    }

    // aria-live region for announcements
    return (
        <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
            { message() }
        </div>
    );
})
export default Announcer;