import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';

const MyEvents = ({appState}) => {
    const [events, setEvents] = useState(null)
    
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
    }, [])

    if (events === null) {
        return <div>Loading events...</div>
    }
    else if (events.length === 0) {
        return <div>You don't have any events. Create one!</div>
    }

    const eventList = events.map((event, i) => 
        <Col key={i} xs={6}>
            <Event key={i} {...event} appState={appState}/>
        </Col>
    )
    
    return (
        <main className="my-events-page">
            <Row className="gy-4">
                {eventList}
            </Row>
        </main>
    )
}

export default MyEvents;