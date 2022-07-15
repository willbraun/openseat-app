import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import Search from './Search';
import './../styles/eventlist.css';

const Home = ({appState}) => {
    const [currentLocation, setCurrentLocation] = useState(window.localStorage.openSeatSearchLocation || 'Greenville, SC, USA');
    const [currentRadius, setCurrentRadius] = useState(['2', '5', '10', '25', '50', '100'].includes(window.localStorage.openSeatSearchRadius) ? window.localStorage.openSeatSearchRadius : '25');
    const [events, setEvents] = useState(null);

    const location = useLocation();
    
    const getHomeEvents = async (searchLocation, searchRadius) => {
        const response = await fetch(`/api_v1/events/?origin=${searchLocation}&radius=${searchRadius}`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setEvents(data);
    }

    useEffect(() => {
        setEvents(null);
        getHomeEvents(currentLocation, currentRadius)
        localStorage.setItem('openSeatSearchLocation', currentLocation);
        localStorage.setItem('openSeatSearchRadius', currentRadius);
    }, [location.key, currentLocation, currentRadius])

    const noneFound = `No events found. ${appState.auth ? "Create one!" : "Log in to create one!"}`;
    
    return (
        <main className="home-page">
            <Search 
                currentLocation={currentLocation} 
                currentRadius={currentRadius}
                setCurrentLocation={setCurrentLocation}
                setCurrentRadius={setCurrentRadius}
            />

            {events === null ? 
                <div>Loading events...</div> 
                : 
                events.length === 0 ?
                    <p className="center-message">{noneFound}</p> 
                    :
                    <Row className="gy-4">
                        {events.map((event, i) => 
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