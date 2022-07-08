import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'; 
import EventInput from './EventInput';
import Cookies from 'js-cookie';
import './../styles/createevent.css';
import { handleError } from '../helpers';

const EditEvent = ({eventState, setEventState}) => {
    const [state, setState] = useState(eventState);
    const { id } = useParams();

    useEffect(() => {
        const getEvent = async () => {
            const response = await fetch(`/api_v1/events/${id}/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState(data);
        }

        getEvent();
    }, [])

    const navigate = useNavigate();

    // const createEvent = async () => {
    //     const formData = new FormData();
    //     Object.entries(state).forEach(entry => formData.append(entry[0], entry[1]));
        
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'X-CSRFToken': Cookies.get('csrftoken'),
    //         },
    //         body: formData,
    //     }

    //     const response = await fetch('/api_v1/events/mine/', options).catch(handleError);

    //     if (!response.ok) {
    //         throw new Error('Network request not ok!');
    //     }
        
    // }

    const deleteEvent = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            }
        }

        const response = await fetch(`/api_v1/events/${id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        navigate('/my-events');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // createEvent();
        navigate('/my-events/');
    }
    
    return (
        <main className="create-event">
            <Form className="event-input-form" onSubmit={handleSubmit}>
                <h2>Edit Event</h2>
                <EventInput key={0} parentState={state} setParentState={setState}/>
                <div className="create-event-bottom">
                    <button type="button" onClick={() => deleteEvent()}>Delete</button>
                    <button type="button" onClick={() => navigate(-1)}>Cancel</button> 
                    <button type="submit">Save</button>
                </div> 
            </Form>
        </main>
    )
}

export default EditEvent;