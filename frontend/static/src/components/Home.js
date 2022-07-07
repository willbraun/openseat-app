import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import './../styles/home.css';

const Home = ({appState}) => {
    const [state, setState] = useState({
        searchZip: appState.userZip.length > 0 ? appState.userZip : '29601',
        radius: 20,
        events: [],
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

    // map over response and convert each to an Event component - pass down appState
    const eventList = state.events.map((event, i) => 
        <Col xs={6}>
            <Event key={i} {...event} appState={appState}/>
        </Col>
        )

    // use react-bootstrap to fill the cards into a grid

    
    return (
        <main className="home-page">
            <Row>
                {eventList}
            </Row>

            {appState.auth && <Link to={'my-events/create'}>Create Event</Link>}
        </main>
    )
}

export default Home;