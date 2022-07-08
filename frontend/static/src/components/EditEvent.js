import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'; 
import EventInput from './EventInput';
import Cookies from 'js-cookie';
import './../styles/createevent.css';
import { handleError } from '../helpers';
import './../styles/editevent.css';

const EditEvent = ({eventBeingEdited}) => {
    const [state, setState] = useState(eventBeingEdited);
    
    const navigate = useNavigate();

    const deleteEvent = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }

        const response = await fetch(`/api_v1/events/${state.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        navigate('/my-events');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // editEvent();
        navigate('/my-events/');
    }
    
    return (
        <main className="edit-event">
            <Form className="event-input-form" onSubmit={handleSubmit}>
                <h2>Edit Event</h2>
                <EventInput key={0} parentState={state} setParentState={setState}/>
                <div className="edit-event-bottom">
                    <button type="button" onClick={() => deleteEvent()}>Delete</button>
                    <button type="button" onClick={() => navigate(-1)}>Cancel</button> 
                    <button type="submit">Save</button>
                </div> 
            </Form>
        </main>
    )
}

export default EditEvent;