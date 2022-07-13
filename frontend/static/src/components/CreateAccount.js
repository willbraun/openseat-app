import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import { handleError, handleInput, handleImage } from '../helpers';
import plus from './../images/plus-solid.svg';
import arrowLeft from './../images/arrow-left-solid.svg'; 

const CreateAccount = ({appState, setAppState}) => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const requiredFields = ['username', 'password1', 'password2', 'email', 'firstName', 'lastName', 'profilePic'];
    const [state, setState] = useState({
        username: '',
        password1: '',
        password2: '',
        email: '',
        firstName: '',
        lastName: '',
        profilePic: null,
        phoneNumber: '',
        zipCode: '',
    });

    const allowSubmit = requiredFields.every(field => !!state[field]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {...state, 
            password: state.password1,
            first_name: state.firstName, 
            last_name: state.lastName,
            profile_pic: state.profilePic,
            phone_number: state.phoneNumber,
            zip_code: state.zipCode,
        }
        delete payload.password1;
        delete payload.firstName;
        delete payload.lastName;
        delete payload.profilePic;
        delete payload.phoneNumber;
        delete payload.zipCode;

        const formData = new FormData();
        Object.entries(payload).forEach(entry => formData.append(entry[0], entry[1]))
        
        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);
        const data = await response.json();

        if (!response.ok) {
            const entry = Object.entries(data)[0];
            if (Array.isArray(entry[1])) {
                setError(entry[1][0]);
            }
            else {
                setError(entry[1]);
            }
            console.log(data);
            throw new Error('Network response not ok!');
        }

        Cookies.set("Authorization", `Token ${data.key}`);
        setAppState({
            ...appState, 
            auth: true, 
            userId: data.id, 
            userZip: data.zip
        });

        if (!window.localStorage.openSeatSearchLocation) {
            const newLocation = data.zip ? data.zip : 'Greenville, SC';
            localStorage.setItem('openSeatSearchLocation', newLocation);
        }

        navigate('/');
    }
    
    return (
        <main className="create-account">
            <h2>Create Account</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username <span className="required-asterisk">*</span></Form.Label>
                            <Form.Control 
                                name="username" 
                                value={state.username}
                                type="text" 
                                placeholder="Enter username" 
                                required 
                                onChange={(e) => handleInput(e, setState)}
                                autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword1">
                            <Form.Label>Password <span className="required-asterisk">*</span></Form.Label>
                            <div className="password-box">
                                <Form.Control 
                                    name="password1" 
                                    value={state.password1}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password" 
                                    required 
                                    onChange={(e) => handleInput(e, setState)} />
                                <Button variant="outline-primary" size="sm" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</Button>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Confirm Password <span className="required-asterisk">*</span></Form.Label>
                            <div className="password-box">
                                <Form.Control 
                                    name="password2" 
                                    value={state.password2}
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter password" 
                                    required 
                                    onChange={(e) => handleInput(e, setState)} />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email <span className="required-asterisk">*</span></Form.Label>
                            <Form.Control 
                                name="email" 
                                value={state.email}
                                type="email" 
                                placeholder="Enter email" 
                                required 
                                onChange={(e) => handleInput(e, setState)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name <span className="required-asterisk">*</span></Form.Label>
                            <Form.Control 
                                name="firstName" 
                                value={state.firstName}
                                type="text" 
                                placeholder="Enter first name" 
                                required 
                                onChange={(e) => handleInput(e, setState)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name <span className="required-asterisk">*</span></Form.Label>
                            <Form.Control 
                                name="lastName" 
                                value={state.lastName}
                                type="text" 
                                placeholder="Enter last name" 
                                required 
                                onChange={(e) => handleInput(e, setState)} />
                        </Form.Group>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3" controlId="formBasicProfilePic">
                            <Form.Label>Profile Picture <span className="required-asterisk">*</span></Form.Label>
                            <button 
                                type="button" 
                                className="image-button"
                                required
                                onClick={() => document.querySelector('.input-image.create-account-input').click()}>
                                <Form.Control 
                                    type="file"
                                    className="input-image create-account-input"
                                    onChange={(e) => handleImage(e, state, setState, 'profilePic', setPreview)} />
                                
                                    {preview ? 
                                        <img className="image-button-background" src={preview} alt={`${state.username} profile`}/> : 
                                        <div className="no-image-background">
                                            <img className="plus" src={plus} alt="plus icon" />
                                            <p>Add Profile Picture</p>
                                        </div>
                                    }
                            </button>
                        </Form.Group>
                        <Form.Text>Recommended</Form.Text>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Text> - for notifications</Form.Text>
                            <Form.Control 
                                name="phoneNumber" 
                                value={state.phoneNumber}
                                type="text" 
                                maxLength="16"
                                placeholder="Enter phone Number"
                                onChange={(e) => handleInput(e, setState)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicZipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Text> - for finding nearby events</Form.Text>
                            <Form.Control 
                                name="zipCode" 
                                value={state.zipCode}
                                type="number" 
                                min="0"
                                max="99999"
                                placeholder="Enter 5-digit zip code" 
                                onChange={(e) => handleInput(e, setState)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mx-0">
                    <Button variant="primary" className="create-account-button" disabled={!allowSubmit} type="submit">Create Account</Button>
                </Row>
                    <Link className="back-to-login" to={'/login'}>
                        <img src={arrowLeft} alt="left arrow" />
                        Back to login</Link>

            </Form>
            <p className="error-message">{error}</p>
            
        </main>
    )
}

export default CreateAccount;