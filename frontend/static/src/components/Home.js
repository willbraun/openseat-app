import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import Search from './Search';
import Fuse from 'fuse.js';
import './../styles/eventlist.css';

const Home = ({appState}) => {
    const [currentPhrase, setCurrentPhrase] = useState(window.sessionStorage.openSeatSearchPhrase || "")
    const [currentLocation, setCurrentLocation] = useState(window.sessionStorage.openSeatSearchLocation || 'Greenville, SC, USA');
    const [currentRadius, setCurrentRadius] = useState(['2', '5', '10', '25', '50', '100'].includes(window.sessionStorage.openSeatSearchRadius) ? window.sessionStorage.openSeatSearchRadius : '25');
    const [events, setEvents] = useState(null);

    const location = useLocation();
    
    const getHomeEvents = async (searchPhrase, searchLocation, searchRadius) => {
        const response = await fetch(`/api_v1/events/?origin=${searchLocation}&radius=${searchRadius}`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        
        if (searchPhrase.length > 0) {
            const options = {
                includeScore: true,
                ignoreLocation: true,
                keys: ['name', 'description', 'address', 'creator']
            }
        
            const fuse = new Fuse(data, options);
            const result = fuse.search(searchPhrase);
            setEvents(result);
        }
        else {
            setEvents(data);
        }
    }

    useEffect(() => {
        setEvents(null);
        getHomeEvents(currentPhrase, currentLocation, currentRadius)
        sessionStorage.setItem('openSeatSearchPhrase', currentPhrase);
        sessionStorage.setItem('openSeatSearchLocation', currentLocation);
        sessionStorage.setItem('openSeatSearchRadius', currentRadius);
    }, [location.key, currentLocation, currentRadius])

    // function to set phrase
    

    const noneFound = `No new events found. ${appState.auth ? "Create one!" : "Log in to create one!"}`;
    
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