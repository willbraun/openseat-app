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
   
    // const [radius, setRadius] = useState(10);
    
    const [state, setState] = useState({
        // location: appState.userZip.length > 0 ? appState.userZip : '29601',
        // location: defaultSearch,
        radius: 20,
        events: null,
    })

    const location = useLocation();


    // update origin_zip to origin in backend
    
    const getHomeEvents = async (searchTerm) => {
        const response = await fetch(`/api_v1/events/?origin_zip=${searchTerm}&radius=${state.radius}`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setState({...state, events: data});
    }

    useEffect(() => {
        getHomeEvents(currentSearch);
    }, [location.key])

    const findEvents = (searchTerm) => {
        setState({...state, events: null});
        getHomeEvents(searchTerm);
        localStorage.setItem('openSeatSearchLocation', searchTerm);
    }

    const noneFound = `No events found. ${appState.auth ? "Create one!" : "Log in to create one!"}`;
    
    return (
        <main className="home-page">
            <Search currentSearch={currentSearch} findEvents={findEvents}/>

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