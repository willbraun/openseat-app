import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns'
import { handleError } from '../helpers';
import './../styles/event.css';
import EventParticipants from './EventParticipants';
import EditEvent from './EditEvent';

const Event = ({appState, event, editEventList, deleteEvent}) => {
    const [state, setState] = useState(event);
    const [isEditing, setIsEditing] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);

    const attending = state.participants?.map(participant => participant.id).includes(appState.userId);

    const location = useLocation();
    const isHome = location.pathname === '/';

    const fillSeat = async () => {
        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch(`/api_v1/events/${event.id}/add-self/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setState({...state, participants: data.participants});
    }

    const giveUpSeat = async () => {
        const options = {
            method: 'PUT',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch(`/api_v1/events/${event.id}/remove-self/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setState({...state, participants: data.participants});
    }

    const now = new Date();

    const actionButton = () => {
        if (!appState.auth) {
            return <div className="event-action log-in-to-join disabled">Log in to join!</div>
        }
        else if (parseISO(state.date) < now) {
            return <div className="event-action event-completed disabled">Event Completed</div>
        }
        else if (state.creator.id === appState.userId) {
            return <button className="event-action edit-event-button" type="button" onClick={() => setIsEditing(true)}>Edit Event</button>
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
            <p className="event-name">{state.name}</p>
            <div className="event-content">
                <div className="event-image-box">
                    <img className="event-image" src={state.image} alt={state.name} />
                </div>
                <Row className="event-info">
                    <Col sm={12} md={appState.auth ? 7 : 10} lg={appState.auth ? 12 : 10} className="description">
                        <p>{state.description}</p>
                    </Col>
                    <Col sm={12} md={appState.auth ? 5 : 2} lg={appState.auth ? 12 : 2} className={`details${appState.auth ? " large" : ""}`}>
                        {appState.auth ?
                            <>
                            <div className="creator-info">
                                <div className="creator-profile-pic-box">
                                    <img className="creator-profile-pic" src={state.creator.profile_pic} alt={state.creator.username} />
                                </div>
                                <p className="creator-name">{state.creator.first_name} {state.creator.last_name}</p>
                            </div>
                            {isHome && <p className="distance">{state.distance.toFixed(1)} mi</p>}
                            <address>{state.address} {state.city}, {state.state} {state.zip_code}</address>
                            <time>{format(parseISO(`${state.date} ${state.time}`), 'h:mm a, M/d/yyyy (eee)')}</time>
                            </>
                            :
                            <>
                            {isHome && <p className="distance">{state.distance.toFixed(1)} mi</p>}
                            </>
                        }
                    </Col>
                </Row>
                <Row className="mx-1 mb-3 gy-2 event-bottom">
                    <Col className="pe-0" xs={appState.auth ? 12 : 5} md={5} lg={appState.auth ? 12 : 6} xl={5}>
                        <button 
                            className={`view-participants${appState.auth ? "" : " disabled"}`} 
                            disabled={!appState.auth} 
                            type="button"
                            onClick={() => setShowParticipants(true)}>
                                {appState.auth ? state.participants.length : state.participant_count} / {state.seats} seats filled
                        </button>
                    </Col>
                    <Col className="ps-0" xs={appState.auth ? 12 : 7} md={7} lg={appState.auth ? 12 : 6} xl={7}>
                        {actionButton()}                
                    </Col>
                </Row>
            </div>
            <EventParticipants 
                eventState={state}
                showParticipants={showParticipants}
                setShowParticipants={setShowParticipants}/>
            <EditEvent 
                event={event} 
                eventState={state} 
                setEventState={setState}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editEventList={editEventList}
                deleteEvent={deleteEvent}/>
        </article>
    )
}

export default Event;