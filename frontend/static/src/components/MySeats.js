import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from './Event';
import { handleError } from '../helpers';
import './../styles/myseats.css';

const MySeats = ({appState}) => {
    const [state, setState] = useState({
        events: null,
        isFuture: true,
    })

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
    }, [state.isFuture])
    
    return (
        <main className="my-seats-page">
            <select  
                className="my-seats-timeperiod"
                defaultValue={state.isFuture.toString()}
                onChange={(e) => setState({...state, events: null, isFuture: e.target.value === 'true'})}>
                <option value="true">Upcoming</option>
                <option value="false">Past</option>
            </select>

            {state.events === null ?
                <>
                    <div>Loading events...</div>
                </>
                :
                state.events.length === 0 ?
                    <p className="center-message">{state.isFuture ? "You don't have any upcoming seats. \nFill a seat on Discover to see it here!" : "You don't have any seats in the past."}</p>
                    :
                    <Row className="gy-4">
                        {state.events.map((event, i) => 
                            <Col key={i} sm={12} lg={6}>
                                <Event key={i} appState={appState} event={event}/>
                            </Col>
                        )}
                    </Row>
                }
        </main>
    )
}

export default MySeats;