import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import './../styles/eventlist.css';

const MySeats = ({appState}) => {
    const [state, setState] = useState({
        events: null,
    })

    useEffect(() => {
        const getSeats = async () => {
            const response = await fetch(`/api_v1/events/my-seats/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, events: data});
        }

        getSeats();
    }, [])

    if (state.events === null) {
        return <div>Loading events...</div>
    }
    else if (state.events.length === 0) {
        return <div>No events found.</div>
    }

    const eventList = state.events.map((event, i) => 
        <Col key={i} sm={12} lg={6}>
            <Event key={i} appState={appState} event={event}/>
        </Col>
    )
    
    return (
        <main className="my-seats-page">
            <Row className="gy-4">
                {eventList}
            </Row>
        </main>
    )
}

export default MySeats;