import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import EventInput from './EventInput';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const EditEvent = ({event, eventState, setEventState, isEditing, setIsEditing, editEventList, deleteEvent}) => {
    const [state, setState] = useState(event)

    const editEvent = async () => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => {
            if (entry[1] !== event[entry[0]] ) {
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

        const response = await fetch(`/api_v1/events/${event.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setEventState(data);

        // const index = events.findIndex(event => event.id === eventBeingEdited.id);

        // const newList = events;
        // newList[index] = data;
        // setEvents(newList);
        // setEventBeingEdited(null);
    }

    // const deleteEvent = async () => {
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             'X-CSRFToken': Cookies.get('csrftoken'),
    //         }
    //     }

    //     const response = await fetch(`/api_v1/events/${eventBeingEdited.id}/`, options).catch(handleError);

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok!');
    //     }

    //     const index = events.findIndex(event => event.id === eventBeingEdited.id);
    //     const newList = events;
    //     newList.splice(events[index], 1);
    //     setEvents(newList);
    //     setEventBeingEdited(null);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        editEvent();
        setIsEditing(false);
    }

    return (
        <Modal 
            show={isEditing} 
            onHide={() => setIsEditing(false)}
            backdrop="static" 
            keyboard={false}
            size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="event-input-form" id="event-input-form" onSubmit={handleSubmit}>
                    <EventInput key={0} parentState={state} setParentState={setState}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={() => {deleteEvent(event.id); setIsEditing(false)}}>Delete</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button> 
                <button type="submit" form="event-input-form">Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditEvent;