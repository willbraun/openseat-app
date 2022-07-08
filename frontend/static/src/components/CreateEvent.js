import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'; 
import EventInput from './EventInput';
import Cookies from 'js-cookie';
import './../styles/createevent.css';
import { handleError } from '../helpers';

const CreateEvent = () => {
    const blank = {
        name: '',
        description: '',
        seats: 0,
        image: null,
        address: '',
        city: '',
        state: '',
        zipCode: '',
        date: '',
        time: '',
    }

    const [state, setState] = useState(blank);

    const navigate = useNavigate();

    const createEvent = async () => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => formData.append(entry[0], entry[1]));
        
        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch('/api_v1/events/mine/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createEvent();
        navigate('/my-events/');
    }
    
    return (
        <main className="create-event">
            <Form className="event-input-form" onSubmit={handleSubmit}>
                <h2>Create Event</h2>
                <EventInput parentState={state} setParentState={setState}/>
                <div className="create-event-bottom">
                    <button type="button" onClick={() => navigate(-1)}>Cancel</button> 
                    <button type="submit">Create</button>
                </div> 
            </Form>
        </main>
    )
}

export default CreateEvent;