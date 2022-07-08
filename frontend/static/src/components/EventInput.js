import { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import { handleInput, handleImage, states } from "../helpers";
import plus from './../images/plus-solid.svg'; 

const EventInput = ({parentState, setParentState}) => {
    const [preview, setPreview] = useState(parentState.image)
    
    
    return (
        <>
            <Form.Text>All fields required</Form.Text>
            <Form.Group controlId="name">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control  
                    name="name" 
                    value={parentState.name} 
                    type="text"  
                    onChange={(e) => handleInput(e, setParentState)}/>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control 
                    name="description" 
                    value={parentState.description} 
                    as="textarea"  
                    onChange={(e) => handleInput(e, setParentState)}
                ></Form.Control > 
            </Form.Group>
            <Form.Group className="mb-3" controlId="seats">
                <Form.Label>Seats</Form.Label>
                <Form.Text> - including yourself!</Form.Text>
                <Form.Control 
                    name="seats" 
                    value={parentState.seats}
                    type="number" 
                    min="2"
                    max="20"
                    onChange={(e) => handleInput(e, setParentState)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="event-image">
                <Form.Label>Image</Form.Label>
                <button 
                    type="button" 
                    className="image-button"
                    required
                    onClick={() => document.querySelector('.input-image .event-input').click()}>
                    <Form.Control 
                        type="file"
                        className="input-image event-image"
                        onChange={(e) => handleImage(e, parentState, setParentState, 'image', setPreview)} />
                    
                        {preview ? 
                            <img className="image-button-background" src={preview} alt={`${parentState.name} profile`}/> : 
                            <div className="no-image-background">
                                <img className="plus" src={plus} alt="plus icon" />
                                <p>Add Image</p>
                            </div>
                        }
                </button>
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label htmlFor="address">Address</Form.Label>
                <Form.Control  
                    address="address" 
                    value={parentState.address} 
                    type="text"  
                    onChange={(e) => handleInput(e, setParentState)}/>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control  
                    city="city" 
                    value={parentState.city} 
                    type="text"  
                    onChange={(e) => handleInput(e, setParentState)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="state">State</Form.Label>
                <Form.Select value={parentState.state}>
                    <option value="">Select state...</option>
                    {states.map(state => <option value={state.abbreviation}>{state.name}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control 
                    name="zipCode" 
                    value={parentState.zipCode}
                    type="number" 
                    min="0"
                    max="99999"
                    onChange={(e) => handleInput(e, setParentState)} />
            </Form.Group>
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                    name="date" 
                    value={parentState.date}
                    type="date" 
                    onChange={(e) => handleInput(e, setParentState)} />
            </Form.Group>
            <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control 
                    name="time" 
                    value={parentState.time}
                    type="time" 
                    onChange={(e) => handleInput(e, setParentState)} />
            </Form.Group>
        </>
    )
}

export default EventInput;