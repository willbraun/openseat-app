import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import Search from './Search';
import Fuse from 'fuse.js';
import { geocodeByLatLng } from 'react-google-places-autocomplete';
import './../styles/eventlist.css';

const Home = ({appState}) => {
    const [currentPhrase, setCurrentPhrase] = useState(window.localStorage.openSeatSearchPhrase || "")
    const [currentLocation, setCurrentLocation] = useState(window.localStorage.openSeatSearchLocation);
    const [currentRadius, setCurrentRadius] = useState(['2', '5', '10', '25', '50', '100'].includes(window.localStorage.openSeatSearchRadius) ? window.localStorage.openSeatSearchRadius : '25');
    const [events, setEvents] = useState(null);

    const location = useLocation();
    const locationDefault = 'Location...';
    
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
                threshold: 0.2,
                keys: ['name', 'description', 'address', 'creator']
            }
        
            const fuse = new Fuse(data, options);
            const result = fuse.search(searchPhrase);
            const newData = result.map(entry => entry.item);
            setEvents(newData);
        }
        else {
            setEvents(data);
        }
    }

    useEffect(() => {
        const getReadableLocation = position => {
            const { latitude, longitude } = position.coords;
    
            geocodeByLatLng({ lat: latitude, lng: longitude })
            .then(results => {
                const address = results.find(result => result.types.includes('postal_code')).formatted_address
                setCurrentLocation(address);
            })
            .catch(error => console.error(error));
        }

        const failure = () => {
            setCurrentLocation(locationDefault);
        }

        if (!currentLocation) {
            window.navigator.geolocation.getCurrentPosition(getReadableLocation, failure);
        }
    }, [])

    useEffect(() => {
        setEvents(null);
        getHomeEvents(currentPhrase, currentLocation, currentRadius)
        localStorage.setItem('openSeatSearchPhrase', currentPhrase);
        localStorage.setItem('openSeatSearchLocation', currentLocation);
        localStorage.setItem('openSeatSearchRadius', currentRadius);
    }, [location.key, currentPhrase, currentLocation, currentRadius]);

    const noneFound = `No events found. ${appState.auth ? "Create one!" : "Log in to create one!"}`;
    
    return (
        <main className="home-page">
            <Search 
                currentPhrase={currentPhrase}
                currentLocation={currentLocation} 
                currentRadius={currentRadius}
                setCurrentPhrase={setCurrentPhrase}
                setCurrentLocation={setCurrentLocation}
                setCurrentRadius={setCurrentRadius}
            />

            {!currentLocation ?
                <p className="center-message">Loading...</p>
            :
            currentLocation === locationDefault ?
                <p className="center-message">{'Welcome to OpenSeat! \nSelect your location from above or allow location services in your web browser.'}</p>
            :
            events === null ? 
                <p className="center-message">Loading...</p> 
            : 
            events.length === 0 ?
                <p className="center-message">{noneFound}</p> 
            :
            <Row className="gy-4">
                {events.map(event => 
                    <Col key={event.id} sm={12} lg={6}>
                        <Event key={event.id} appState={appState} event={event}/>
                    </Col>
                )}
            </Row>
            }
        </main>
    )
}

export default Home;