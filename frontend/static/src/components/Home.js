import React from 'react';
import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import Search from './Search';
import './../styles/eventlist.css';

const Home = ({appState, setAppState}) => {
    const currentSearch = window.localStorage.openSeatSearchLocation ?? 'Greenville, SC, USA';
    const currentRadius = ['2', '5', '10', '25', '50', '100'].includes(window.localStorage.openSeatSearchRadius) ? window.localStorage.openSeatSearchRadius : '10';
   
    // const [radius, setRadius] = useState(10);
    
    const [state, setState] = useState({
        // location: appState.userZip.length > 0 ? appState.userZip : '29601',
        // location: defaultSearch,
        events: null,
    })

    const location = useLocation();


    // update origin_zip to origin in backend
    
    const getHomeEvents = async (searchLocation, searchRadius) => {
        const response = await fetch(`/api_v1/events/?origin_zip=${searchLocation}&radius=${searchRadius}`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setState({...state, events: data});
    }

    useEffect(() => {
        getHomeEvents(currentSearch, currentRadius);
    }, [location.key])

    const findEvents = (searchLocation, searchRadius) => {
        setState({...state, events: null});
        getHomeEvents(searchLocation, searchRadius);
        localStorage.setItem('openSeatSearchLocation', searchLocation);
        localStorage.setItem('openSeatSearchRadius', searchRadius);
    }

    const noneFound = `No events found. ${appState.auth ? "Create one!" : "Log in to create one!"}`;
    
    return (
        <main className="home-page">
            <Search 
                currentSearch={currentSearch} 
                currentRadius={currentRadius}
                findEvents={findEvents}/>

            {state.events === null ? 
                <div>Loading events...</div> : 

                state.events.length === 0 ?
                    <div>{noneFound}</div> :
                    
                    <Row className="gy-4">
                        {state.events.map((event, i) => 
                            <Col key={i} sm={12} lg={6}>
                                <Event key={event.id} appState={appState} event={event}/>
                            </Col>
                        )}
                    </Row>
                }
        </main>
    )
}

export default Home;