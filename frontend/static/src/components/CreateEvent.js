import { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import EventInput from './EventInput';
import './../styles/createevent.css'

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
    
    return (
        <main className="create-event">
            <Form className="event-input-form">
                <h2>Create Event</h2>
                <EventInput parentState={state} setParentState={setState}/>
                <div className="create-event-bottom">
                    <button>Cancel</button> 
                    <button>Create</button>
                </div> 
            </Form>
        </main>
    )
}

export default CreateEvent;