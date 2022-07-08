import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import EditEvent from './EditEvent';

const MyEvents = ({appState}) => {
    const [events, setEvents] = useState(null)
    const [eventBeingEdited, setEventBeingEdited] = useState(null)

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

    const eventList = events.map((event, i) => 
        <Col key={i} sm={12} lg={6}>
            <Event key={event.id} appState={appState} event={event} setEventBeingEdited={setEventBeingEdited}/>
        </Col>
    )
    
    return (
        <main className="my-events-page">
            {eventBeingEdited && <EditEvent 
                eventBeingEdited={eventBeingEdited} 
                setEventBeingEdited={setEventBeingEdited}
                events={events} 
                setEvents={setEvents}/>
            }
            <Row className="gy-4">
                {eventList}
            </Row>
        </main>
    )
}

export default MyEvents;