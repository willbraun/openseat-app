import React from 'react';
import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import './../styles/eventlist.css';

const Home = ({appState, setAppState}) => {
    const [value, setValue] = useState(null);
    
    const [state, setState] = useState({
        // location: appState.userZip.length > 0 ? appState.userZip : '29601',
        // location: defaultSearch,
        radius: 20,
        events: [],
    })

    // update origin_zip to origin in backend
    
    const getHomeEvents = async (location) => {
        const response = await fetch(`/api_v1/events/?origin_zip=${location}&radius=${state.radius}`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setState({...state, events: data});
    }

    useEffect(() => {
        getHomeEvents(appState.searchLocation);
    }, [])

    const search = () => {
        console.log(value.label);
        getHomeEvents(value.label);
        setAppState({...appState, searchLocation: value.label})
    }

    // if (state.events === null) {
    //     return <div>Loading events...</div>
    // }
    // else if (state.events.length === 0) {
    //     return <div>No new events found. Create one!</div>
    // }

    const eventList = state.events.map((event, i) => 
        <Col key={i} sm={12} lg={6}>
            <Event key={i} appState={appState} event={event}/>
        </Col>
    )
    
    return (
        <main className="home-page">
            <GooglePlacesAutocomplete selectProps={{
                value,
                onChange: setValue,
            }} />
            <button type="button" onClick={search}>Find Events</button>

            {state.events === null && <div>Loading events...</div>}
            {state.events.length === 0 && <div>No new events found. Create one!</div>}

            <Row className="gy-4">
                {eventList}
            </Row>
        </main>
    )
}

export default Home;