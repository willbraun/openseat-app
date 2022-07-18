import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'; 
import EventInput from './EventInput';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import './../styles/createeditevent.css';

const CreateEvent = ({isCreating, setIsCreating}) => {
    const blank = {
        name: '',
        seats: 0,
        description: '',
        address: '',
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

    const close = () => {
        setIsCreating(false);
        setState(blank);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createEvent();
        close();
        navigate('/my-events');
    }
    
    return (
        <Modal 
            show={isCreating} 
            onHide={close} 
            backdrop="static" 
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton className="create-event-header">
                <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="create-event-input-form" id="create-event-input-form" onSubmit={handleSubmit}>
                    <EventInput key={0} parentState={state} setParentState={setState}/>
                </Form>
            </Modal.Body>
            <Modal.Footer className="create-footer">
                <button className="cancel-button" type="button" onClick={close}>Cancel</button> 
                <button className="create-button" type="submit" form="create-event-input-form">Create</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateEvent;