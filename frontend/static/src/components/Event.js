const Event = ({appState}) => {
    // state has the state of the fill/give up seat button
    
    // update fill seat button to show either fill or give up seat based on appstate.auth
    // details about event are passed down from home
    // fill or give up seat function fires off the respective request based on if the current user is on the event
    // after the request is made, update the state of the button based on the response
    // show loading icon inside the button while the request is processing

    // include view for seeing participants on the event

    // if not logged in, some properties like participants will be null. handle those if null and don't show
    
    return (
        <div>Event</div>
    )
}

export default Event;