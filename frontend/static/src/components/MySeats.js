import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import Loading from './Loading';
import { useLocation } from 'react-router-dom';
import { handleError } from '../helpers';
import './../styles/myseats.css';

const MySeats = ({appState, setIsCreating}) => {
    const [state, setState] = useState({
        events: null,
        isFuture: true,
    })

    const location = useLocation();

    useEffect(() => {
        const getSeats = async () => {
            const response = await fetch(`/api_v1/events/my-seats/${state.isFuture ? 'future' : 'past'}/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, events: data});
        }

        getSeats();
    }, [location.key, state.isFuture]);
    
    return (
        <main className="my-seats-bg">
            <div className="my-seats-page">
                <select  
                    className="my-seats-timeperiod"
                    defaultValue={state.isFuture.toString()}
                    onChange={(e) => setState({...state, events: null, isFuture: e.target.value === 'true'})}>
                    <option value="true">Upcoming</option>
                    <option value="false">Past</option>
                </select>
            
                {state.events === null ?
                    <>
                        <Loading />
                    </>
                    :
                    state.events.length === 0 ?
                        state.isFuture ? <p className="center-message">You don't have any upcoming events. Fill a seat on <Link to={'/'}>Discover</Link> or <button className="my-seats-create-event-button animate-button" onClick={() => setIsCreating(true)}>create an event</button> to see it here!</p> : <p className="center-message">You don't have any events in the past.</p> 
                        :
                        <Row className="gy-4">
                            {state.events.map((event, i) => 
                                <Col key={i} sm={12} lg={6}>
                                    <Event key={event.id} appState={appState} event={event}/>
                                </Col>
                            )}
                        </Row>
                    }
            </div>
        </main>
    )
}

export default MySeats;