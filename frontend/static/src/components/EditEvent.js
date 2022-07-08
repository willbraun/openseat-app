import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'; 
import EventInput from './EventInput';
import Cookies from 'js-cookie';
import './../styles/createevent.css';
import { handleError } from '../helpers';
import './../styles/editevent.css';

const EditEvent = ({eventBeingEdited, setEventBeingEdited, events, setEvents}) => {
    const [state, setState] = useState(eventBeingEdited);

    const editEvent = async () => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => {
            if (entry[1] !== eventBeingEdited[entry[0]] ) {
                formData.append(entry[0], entry[1]);
            }
        });

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch(`/api_v1/events/${state.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        const index = events.findIndex(event => event.id === state.id);

        const newList = events;
        newList[index] = data;
        setEvents(newList);
        setEventBeingEdited(null);
    }

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

        const index = events.findIndex(event => event.id === state.id);
        const newList = events;
        newList.splice(events[index], 1);
        setEvents(newList);
        setEventBeingEdited(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editEvent();
    }
    
    return (
        <main className="edit-event">
            <Form className="event-input-form" onSubmit={handleSubmit}>
                <h2>Edit Event</h2>
                <EventInput key={0} parentState={state} setParentState={setState}/>
                <div className="edit-event-bottom">
                    <button type="button" onClick={() => deleteEvent()}>Delete</button>
                    <button type="button" onClick={() => setEventBeingEdited(null)}>Cancel</button> 
                    <button type="submit">Save</button>
                </div> 
            </Form>
        </main>
    )
}

export default EditEvent;