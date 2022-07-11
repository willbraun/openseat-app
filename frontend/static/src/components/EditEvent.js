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
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editEvent();
        setIsEditing(false);
    }

    return (
        <Modal 
            className="edit-modal"    
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
            <Modal.Footer className="edit-footer d-flex">
                <button className="delete-button me-auto" type="button" onClick={() => {deleteEvent(event.id); setIsEditing(false)}}>Delete Event</button>
                <button className="cancel-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button> 
                <button className="save-button" type="submit" form="event-input-form">Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditEvent;