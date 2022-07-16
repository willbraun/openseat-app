import { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { handleInput, handleImage, states } from "../helpers";
import { format } from 'date-fns';
import plus from './../images/plus-solid.svg'; 
import './../styles/eventinput.css'

const EventInput = ({parentState, setParentState}) => {
    const [preview, setPreview] = useState(parentState?.image)

    if (!parentState) {
        return;
    }

    const newThing = (
        <>
        <Row>
            <Col xs={9}>
                <Row>
                    <Col xs={7}>
                        <Form.Group className="mb-2" controlId="name">
                            <Form.Label>Name <span className="required-asterisk">*</span></Form.Label>
                            <Form.Control  
                                name="name" 
                                value={parentState.name ?? ''} 
                                type="text"  
                                required
                                onChange={(e) => handleInput(e, setParentState)}
                                autoFocus/>
                        </Form.Group>
                    </Col>
                    <Col xs={5}>
                        <Form.Group className="mb-2" controlId="seats">
                            <Form.Label>Seats <span className="required-asterisk">*</span></Form.Label>
                            <Form.Text> - including yourself!</Form.Text>
                            <Form.Control 
                                name="seats" 
                                value={parentState.seats ?? 0}
                                type="number" 
                                min="2"
                                max="20"
                                required
                                onChange={(e) => handleInput(e, setParentState)} />
                        </Form.Group>
                    </Col>
                </Row>
            </Col>
            <Col xs={3}>
                <Form.Group>
                    <Form.Label>Image <span className="required-asterisk">*</span></Form.Label>
                    <button 
                        type="button" 
                        className="image-button event-image-button"
                        onClick={() => document.querySelector('.input-image.edit-event-image').click()}>
                        
                        <Form.Control 
                            type="file"
                            className="input-image edit-event-image"
                            form="create-event-input-form"
                            required
                            onChange={(e) => handleImage(e, parentState, setParentState, 'image', setPreview)} 
                        />
                        
                        {preview ? 
                            <img className="image-button-background" src={preview} alt={`${parentState.name} profile`}/> : 
                            <div className="no-image-background">
                                <img className="plus" src={plus} alt="plus icon" />
                                <p>Add Image</p>
                            </div>
                        }
                        
                    </button>
                </Form.Group>
            </Col>
        </Row>
        <Row>

        </Row>
        </>
    )

    return (
        <>
            {/* {newThing} */}
            
            <Row>
                <Col xs={12} lg={6}>
                    <Form.Group className="mb-2" controlId="name">
                        <Form.Label>Name <span className="required-asterisk">*</span></Form.Label>
                        <Form.Control  
                            name="name" 
                            value={parentState.name || ''} 
                            type="text"  
                            required
                            onChange={(e) => handleInput(e, setParentState)}
                            autoFocus/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="seats">
                        <Form.Label>Seats <span className="required-asterisk">*</span></Form.Label>
                        <Form.Text> - including yourself!</Form.Text>
                        <Form.Control 
                            name="seats" 
                            value={parentState.seats || 0}
                            type="number" 
                            min="2"
                            max="20"
                            required
                            onChange={(e) => handleInput(e, setParentState)} />
                    </Form.Group>
                </Col>
                <Col xs={12} lg={6}>
                    <Form.Group className="mb-2">
                        <Form.Label>Image <span className="required-asterisk">*</span></Form.Label>
                        <button 
                            type="button" 
                            className="image-button event-image-button"
                            onClick={() => document.querySelector('.input-image.edit-event-image').click()}>
                            
                            <Form.Control 
                                type="file"
                                className="input-image edit-event-image"
                                form="create-event-input-form"
                                required
                                onChange={(e) => handleImage(e, parentState, setParentState, 'image', setPreview)} 
                            />
                            
                            {preview ? 
                                <img className="image-button-background" src={preview} alt={`${parentState.name} profile`}/> : 
                                <div className="no-image-background">
                                    <img className="plus" src={plus} alt="plus icon" />
                                    <p>Add Image</p>
                                </div>
                            }
                            
                        </button>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group className="mb-2" controlId="description">
                    <Form.Label>Description <span className="required-asterisk">*</span></Form.Label>
                    <Form.Control 
                        name="description" 
                        value={parentState.description || ''} 
                        as="textarea"  
                        required
                        onChange={(e) => handleInput(e, setParentState)}
                    ></Form.Control > 
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-2">
                    <Form.Label>Location <span className="required-asterisk">*</span></Form.Label>
                    <div className="event-address-wrapper">
                        <input 
                            className="event-address-validation"
                            type="text" 
                            value={parentState.address || ''} 
                            required
                        />
                        <GooglePlacesAutocomplete 
                            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                            selectProps={{
                                placeholder: parentState.address || '',
                                onChange: (e) => setParentState({...parentState, address: e.label}),
                            }} 
                        />
                    </div>
                </Form.Group>
            </Row>
            <Row>
                <Col xs={6}>
                    <Form.Group className="mb-2" controlId="date">
                        <Form.Label>Date <span className="required-asterisk">*</span></Form.Label>
                        <Form.Control 
                            name="date" 
                            value={parentState.date || ''}
                            min={format(new Date(), "yyyy-MM-dd")}
                            type="date" 
                            required
                            onChange={(e) => handleInput(e, setParentState)} />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group controlId="time">
                        <Form.Label>Time <span className="required-asterisk">*</span></Form.Label>
                        <Form.Control 
                            name="time" 
                            value={parentState.time || ''}
                            type="time"
                            required 
                            onChange={(e) => handleInput(e, setParentState)} />
                    </Form.Group>
                </Col>
            </Row>







            {/* <Row>
                <Col xs={9}>
                    <Row>
                        <Form.Group>
                            <Form.Label>Location <span className="required-asterisk">*</span></Form.Label>
                            <div className="event-address-wrapper">
                                <input 
                                    className="event-address-validation"
                                    type="text" 
                                    value={parentState.address} 
                                    required
                                />
                                <GooglePlacesAutocomplete 
                                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                    selectProps={{
                                        placeholder: parentState.address || '',
                                        onChange: (e) => setParentState({...parentState, address: e.label}),
                                    }} 
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="address">
                            <Form.Label>Address / Business <span className="required-asterisk">*</span></Form.Label>
                            <Form.Control  
                                name="address" 
                                value={parentState.address ?? ''} 
                                type="text"  
                                required
                                onChange={(e) => handleInput(e, setParentState)}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Form.Group controlId="city">
                                <Form.Label>City <span className="required-asterisk">*</span></Form.Label>
                                <Form.Control  
                                    name="city" 
                                    value={parentState.city ?? ''} 
                                    type="text"
                                    required  
                                    onChange={(e) => handleInput(e, setParentState)}/>
                            </Form.Group>
                        </Col>
                        <Col xs={5}>
                            <Form.Group>
                                <Form.Label>State <span className="required-asterisk">*</span></Form.Label>
                                <Form.Select
                                    name="state" 
                                    value={parentState.state ?? ''}
                                    required
                                    onChange={(e) => handleInput(e, setParentState)}>
                                    <option value="">Select state...</option>
                                    {states.map((state, i) => <option key={i} value={state.abbreviation}>{state.name}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={3}>
                            <Form.Group controlId="zip_code">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control 
                                    name="zip_code" 
                                    value={parentState.zip_code ? undefined : ""}
                                    type="text" 
                                    min="0"
                                    max="99999"
                                    placeholder="Optional"
                                    onChange={(e) => handleInput(e, setParentState)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col xs={3}>
                    <Form.Group className="mb-2" controlId="date">
                        <Form.Label>Date <span className="required-asterisk">*</span></Form.Label>
                        <Form.Control 
                            name="date" 
                            value={parentState.date ?? ''}
                            min={format(new Date(), "yyyy-MM-dd")}
                            type="date" 
                            required
                            onChange={(e) => handleInput(e, setParentState)} />
                    </Form.Group>
                    <Form.Group controlId="time">
                        <Form.Label>Time <span className="required-asterisk">*</span></Form.Label>
                        <Form.Control 
                            name="time" 
                            value={parentState.time ?? ''}
                            type="time"
                            required 
                            onChange={(e) => handleInput(e, setParentState)} />
                    </Form.Group>
                </Col>
            </Row> */}
        </>
    )
}

export default EventInput;