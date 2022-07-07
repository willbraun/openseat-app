import './../styles/event.css'

const Event = ({appState, id, creator, participants, distance, participant_count, name, description, seats, image, address, city, state, zip_code, date, time, created_at, updated_at}) => {
    // state has the state of the fill/give up seat button
    
    // update fill seat button to show either fill or give up seat based on appstate.auth
    // details about event are passed down from home
    // fill or give up seat function fires off the respective request based on if the current user is on the event
    // after the request is made, update the state of the button based on the response
    // show loading icon inside the button while the request is processing

    // include view for seeing participants on the event

    // if not logged in, some properties like participants will be null. handle those if null and don't show
    


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
                    <div className="details">
                        <div className="creator-info">
                            <div className="creator-profile-pic-box">
                                <img className="creator-profile-pic" src={creator.profile_pic} alt={creator.username} />
                            </div>
                            <p>{creator.first_name} {creator.last_name}</p>
                        </div>
                        <address>{address} {city}, {state} {zip_code}</address>
                        <date>{date}</date> at <time>{time}</time>
                    </div>
                </div>
                <div className="event-bottom">
                    <button className="view-participants" type="button">{participant_count !== undefined ? participant_count : participants.length} / {seats} seats filled</button>
                    <button className="event-action" type="button">Fill Seat</button>
                </div>
            </div>
        </article>
    )
}

export default Event;