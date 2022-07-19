import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import Loading from './Loading';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const MyEvents = ({appState}) => {
    const [events, setEvents] = useState(null);

    const location = useLocation();
    
    useEffect(() => {
        const getMyEvents = async () => {
            const response = await fetch(`/api_v1/events/mine/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setEvents(data);
        }

        getMyEvents();
    }, [location.key])

    if (events === null) {
        return <Loading />
    }
    else if (events.length === 0) {
        return <p className="center-message">You don't have any events. Create one!</p>
    }

    const deleteEvent = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }

        const response = await fetch(`/api_v1/events/${id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const index = events.findIndex(event => event.id === id);
        const newList = [...events];
        newList.splice(events[index], 1);
        setEvents(newList);
    }

    const eventList = events.map((event, i) => 
        <Col key={i} sm={12} lg={6}>
            <Event 
                key={event.id} 
                appState={appState} 
                event={event} 
                deleteEvent={deleteEvent}/>
        </Col>
    )
    
    return (
        <main className="my-events-bg">
            <div className="my-events-page">
                <Row className="gy-4">
                    {eventList}
                </Row>
            </div>
        </main>
    )
}

export default MyEvents;