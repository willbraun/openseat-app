import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import './../styles/event.css';

const Event = ({appState, id, creator, participants, distance, participant_count, name, description, seats, image, address, city, state, zip_code, date, time, created_at, updated_at}) => {
    const [eventState, setEventState] = useState({
        participants: participants,
    });

    const attending = eventState.participants?.map(participant => participant.id).includes(appState.userId);
    
    const location = useLocation();
    const isHome = location.pathname === '/';

    // include view for seeing participants on the event

    const fillSeat = async () => {
        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch(`/api_v1/events/${id}/add-self/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setEventState({participants: data.participants});
    }

    const giveUpSeat = async () => {
        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch(`/api_v1/events/${id}/remove-self/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setEventState({participants: data.participants});
    }


    const actionButton = () => {
        if (!appState.auth) {
            return <div className="event-action disabled">Log in to join!</div>
        }
        else if (creator.id === appState.userId) {
            return <Link className="event-action edit-event" to={`${id}`}>Edit Event</Link>
        }
        else if (attending) {
            return (
                <div className="event-action youre-going-box">
                    <div className="youre-going">You're going!</div>
                    <button className="give-up-seat" type="button" onClick={() => giveUpSeat()}>Cancel</button>
                </div>
            )
        }
        else {
            return <button className="event-action fill-seat" type="button" onClick={() => fillSeat()}>Fill Seat</button>
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
                            {isHome && <p className="distance">{distance.toFixed(1)} mi</p>}
                            <address>{address} {city}, {state} {zip_code}</address>
                            <time>{date} at {time}</time>
                            </>
                            :
                            <>
                            {isHome && <p className="distance">{distance.toFixed(1)} mi</p>}
                            </>
                        }
                    </div>
                </div>
                <div className="event-bottom">
                    <button className={`view-participants${appState.auth ? "" : " disabled"}`} disabled={!appState.auth} type="button">{appState.auth ? eventState.participants.length : participant_count} / {seats} seats filled</button>
                    {actionButton()}                
                </div>
            </div>
        </article>
    )
}

export default Event;