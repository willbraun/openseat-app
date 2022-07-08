import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import './../styles/eventlist.css';

const Home = ({appState}) => {
    const [state, setState] = useState({
        searchZip: appState.userZip.length > 0 ? appState.userZip : '29601',
        radius: 20,
        events: null,
    })

    // dropdowns in UI for each state item
    // update state when dropdowns are changed
    // make filter button to get events from API with query params from state

    
    useEffect(() => {
        const getHomeEvents = async () => {
            const response = await fetch(`/api_v1/events/?origin_zip=${state.searchZip}&radius=${state.radius}`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, events: data});
        }

        getHomeEvents();
    }, [])

    if (state.events === null) {
        return <div>Loading events...</div>
    }
    else if (state.events.length === 0) {
        return <div>No new events found. Create one!</div>
    }

    const eventList = state.events.map((event, i) => 
        <Col key={i} sm={12} lg={6}>
            <Event key={i} appState={appState} event={event}/>
        </Col>
    )
    
    return (
        <main className="home-page">
            <Row className="gy-4">
                {eventList}
            </Row>
        </main>
    )
}

export default Home;