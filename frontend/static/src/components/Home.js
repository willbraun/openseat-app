import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import Loading from './Loading';
import { handleError, locationDefault } from '../helpers';
import Search from './Search';
import Fuse from 'fuse.js';
import { geocodeByLatLng, geocodeByAddress } from 'react-google-places-autocomplete';
import './../styles/eventlist.css';

const Home = ({appState}) => {
    const [currentPhrase, setCurrentPhrase] = useState(window.localStorage.openSeatSearchPhrase || "");
    const [currentLocation, setCurrentLocation] = useState(window.localStorage.openSeatSearchLocation);
    const [currentRadius, setCurrentRadius] = useState(['2', '5', '10', '25', '50', '100'].includes(window.localStorage.openSeatSearchRadius) ? window.localStorage.openSeatSearchRadius : '25');
    const [serverEvents, setServerEvents] = useState(null);
    const [events, setEvents] = useState(null);

    const location = useLocation();
    const blankLocation = [locationDefault, null, undefined, ""].includes(currentLocation);
    
    const getHomeEvents = async (searchLocation, searchRadius) => {
        const response = await fetch(`/api_v1/events/?origin=${searchLocation}&radius=${searchRadius}`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        
        if (appState.auth) {
            data.forEach(event => event.creator.fullName = `${event.creator.first_name} ${event.creator.last_name}`);
        }

        setServerEvents(data);
        setEvents(data);
    }

    const filterByPhrase = () => {
        const options = {
            includeScore: true,
            ignoreLocation: true,
            threshold: 0.1,
            keys: ['name', 'description', 'address', 'creator.first_name', 'creator.last_name', `creator.fullName`, 'creator.username']
        }
    
        const fuse = new Fuse(serverEvents, options);
        const result = fuse.search(currentPhrase);
        const filtered = result.map(entry => entry.item);
        return filtered;
    }

    const getReadableLocation = position => {
        const { latitude, longitude } = position.coords;

        geocodeByLatLng({ lat: latitude, lng: longitude })
        .then(results => {
            const address = results.find(result => result.types.includes('postal_code')).formatted_address
            setCurrentLocation(address);
        })
        .catch(error => {
            console.error(error);
            tryUserZip();
        });
    }

    const tryUserZip = () => {
        if (appState.userZip.length > 0) {
            geocodeByAddress(appState.userZip)
                .then(results => {
                    const address = results[0].formatted_address;
                    setCurrentLocation(address);
                })
                .catch(error => {
                    console.error(error);
                    setCurrentLocation(locationDefault);
                });
        }
        else {
            setCurrentLocation(locationDefault);
        }
    }

    useEffect(() => {
        if (blankLocation) {
            window.navigator.geolocation.getCurrentPosition(getReadableLocation, tryUserZip);
        }
    }, [])

    useEffect(() => {
        if (blankLocation) {
            return;
        }

        setEvents(null);
        getHomeEvents(currentLocation, currentRadius);
        localStorage.setItem('openSeatSearchRadius', currentRadius);
        localStorage.setItem('openSeatSearchLocation', currentLocation);

    }, [appState, location.key, currentLocation, currentRadius]);

    useEffect(() => {
        if (!serverEvents) {
            return;
        }
        else if (currentPhrase.length === 0) {
            setEvents(serverEvents);
            localStorage.setItem('openSeatSearchPhrase', currentPhrase);
            return;
        }

        setEvents(filterByPhrase());
        localStorage.setItem('openSeatSearchPhrase', currentPhrase);

    }, [currentPhrase])

    const noneFound = `No events found. ${appState.auth ? "Create one!" : "Log in to create one!"}`;
    
    return (
        <main className="home-page-bg">
            <div className="home-page">
                <Search 
                    appState={appState}
                    currentPhrase={currentPhrase}
                    currentLocation={currentLocation} 
                    currentRadius={currentRadius}
                    setCurrentPhrase={setCurrentPhrase}
                    setCurrentLocation={setCurrentLocation}
                    setCurrentRadius={setCurrentRadius}
                />
                
                {!currentLocation ?
                    <p className="center-message">{`Welcome! OpenSeat would like to use your location to show you events in your area`}</p>
                :
                currentLocation === locationDefault ?
                    <p className="center-message">{'Select your location from above or allow location services in your web browser'}</p>
                :
                events === null ? 
                    <Loading />
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
            </div>
        </main>
    )
}

export default Home;