import './../styles/event.css'

const Event = ({appState, id, creator, participants, distance, participant_count, name, description, seats, image, address, city, state, zip_code, date, time, created_at, updated_at}) => {

    
    
    // state has the state of the fill/give up seat button
    // state has current participants list
    // state updates participants after button click
    
    // update fill seat button to show either fill or give up seat based on appstate.auth
    // details about event are passed down from home
    // fill or give up seat function fires off the respective request based on if the current user is on the event
    // after the request is made, update the state of the button based on the response
    // show loading icon inside the button while the request is processing

    // include view for seeing participants on the event

    // if not logged in, some properties like participants will be null. handle those if null and don't show
    
    const attending = participants.map(part => part.id).includes(appState.userId);

    const actionButton = () => {
        if (!appState.auth) {
            return <div className="event-action disabled">Log in to join!</div>
        }
        else if (creator.id === appState.userId) {
            return <div className="event-action disabled">Your Event</div>
        }
        else if (attending) {
            return (
                <div className="event-action youre-going-box">
                    <div className="youre-going">You're going!</div>
                    <button className="give-up-seat" type="button">Cancel</button>
                </div>
            )
        }
        else {
            return <button className="event-action fill-seat" type="button">Fill Seat</button>
        }
    }


    return (
        <article className="event">
            <p className="event-name">{name}</p>
            <div className="event-content">
                <div className="event-image-box">
                    <img className="event-image" src={image} alt={name} />
                </div>
                <div className="event-info">
                    <div className="description">
                        <p>{description}</p>
                    </div>
                    <div className={`details${appState.auth ? " large" : ""}`}>
                        {appState.auth ?
                            <>
                            <div className="creator-info">
                                <div className="creator-profile-pic-box">
                                    <img className="creator-profile-pic" src={creator.profile_pic} alt={creator.username} />
                                </div>
                                <p>{creator.first_name} {creator.last_name}</p>
                            </div>
                            <p className="distance">{distance.toFixed(1)} mi</p>
                            <address>{address} {city}, {state} {zip_code}</address>
                            <date>{date}</date> at <time>{time}</time>
                            </>
                            :
                            <p className="distance">{distance.toFixed(1)} mi</p>
                        }
                    </div>
                </div>
                <div className="event-bottom">
                    <button className={`view-participants${appState.auth ? "" : " disabled"}`} disabled={!appState.auth} type="button">{participant_count !== undefined ? participant_count : participants.length} / {seats} seats filled</button>
                    {actionButton()}                
                    </div>
            </div>
        </article>
    )
}

export default Event;