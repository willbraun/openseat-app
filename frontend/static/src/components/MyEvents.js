import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Event from './Event';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import EventInput from './EventInput';

const MyEvents = ({appState}) => {
    const [events, setEvents] = useState(null);
    const [eventBeingEdited, setEventBeingEdited] = useState(null);
    const [original, setOriginal] = useState(null);

    const location = useLocation();
    
    useEffect(() => {
        const getHomeEvents = async () => {
            const response = await fetch(`/api_v1/events/mine`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setEvents(data);
        }

        getHomeEvents();
    }, [location.key])

    if (events === null) {
        return <div>Loading events...</div>
    }
    else if (events.length === 0) {
        return <div>You don't have any events. Create one!</div>
    }

    const editEvent = async () => {
        const formData = new FormData();
        Object.entries(eventBeingEdited).forEach(entry => {
            if (entry[1] !== original[entry[0]] ) {
                formData.append(entry[0], entry[1]);
            }
        });

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch(`/api_v1/events/${eventBeingEdited.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        const index = events.findIndex(event => event.id === eventBeingEdited.id);

        const newList = events;
        newList[index] = data;
        setEvents(newList);
        setEventBeingEdited(null);
    }

    const deleteEvent = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }

        const response = await fetch(`/api_v1/events/${eventBeingEdited.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const index = events.findIndex(event => event.id === eventBeingEdited.id);
        const newList = events;
        newList.splice(events[index], 1);
        setEvents(newList);
        setEventBeingEdited(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editEvent();
    }

    const eventList = events.map((event, i) => 
        <Col key={i} sm={12} lg={6}>
            <Event 
                key={event.id} 
                appState={appState} 
                event={event} 
                setEventBeingEdited={setEventBeingEdited}
                setOriginal={setOriginal}/>
        </Col>
    )
    
    return (
        <main className="my-events-page">
            <Modal show={!!eventBeingEdited} onHide={() => setEventBeingEdited(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="event-input-form" id="event-input-form" onSubmit={handleSubmit}>
                        <EventInput key={0} parentState={eventBeingEdited} setParentState={setEventBeingEdited}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={() => deleteEvent()}>Delete</button>
                    <button type="button" onClick={() => setEventBeingEdited(null)}>Cancel</button> 
                    <button type="submit" form="event-input-form">Save</button>
                </Modal.Footer>
            </Modal>

            <Row className="gy-4">
                {eventList}
            </Row>
        </main>
    )
}

export default MyEvents;