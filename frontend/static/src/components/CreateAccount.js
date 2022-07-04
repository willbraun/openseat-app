import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { handleError, handleInput, handleImage } from '../helpers';
import plus from './../images/plus-solid.svg'; 

const CreateAccount = ({appState, setAppState}) => {
    const [preview, setPreview] = useState(null);
    const [state, setState] = useState({
        username: '',
        password1: '',
        password2: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        zipCode: '',
        profilePic: null,
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {...state, 
            password: state.password1,
            first_name: state.firstName, 
            last_name: state.lastName,
            phone_number: state.phoneNumber,
            zip_code: state.zipCode,
            profile_pic: state.profilePic,
        }
        delete payload.password1;
        delete payload.firstName;
        delete payload.lastName;
        delete payload.phoneNumber;
        delete payload.zipCode;
        delete payload.profilePic;

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

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        navigate('/');
        setAppState({...appState, auth: true});
    }
    
    return (
        <main className="create-account">
            <h2>Create Account</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username <span className="required-asterisk">*</span></Form.Label>
                    <Form.Control 
                        name="username" 
                        value={state.username}
                        type="text" 
                        placeholder="Enter username" 
                        required 
                        onChange={(e) => handleInput(e, setState)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Password <span className="required-asterisk">*</span></Form.Label>
                    <Form.Control 
                        name="password1" 
                        value={state.password1}
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        onChange={(e) => handleInput(e, setState)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Confirm Password <span className="required-asterisk">*</span></Form.Label>
                    <Form.Control 
                        name="password2" 
                        value={state.password2}
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        onChange={(e) => handleInput(e, setState)} />
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
                <Form.Text>Recommended</Form.Text>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Group className="mb-3" controlId="formBasicProfilePic">
                    <button 
                        type="button" 
                        className="create-account-image-button"
                        onClick={() => document.querySelector('.create-account-input-image').click()}>
                        <Form.Control 
                            type="file"
                            className="create-account-input-image"
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
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Text> - for notifications</Form.Text>
                    <Form.Control 
                        name="phoneNumber" 
                        value={state.phoneNumber}
                        type="text" 
                        maxlength="16"
                        placeholder="Enter phone Number"
                        onChange={(e) => handleInput(e, setState)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Text> - for finding nearby events</Form.Text>
                    <Form.Control 
                        name="zipCode" 
                        value={state.zipCode}
                        type="text" 
                        maxlength="5"
                        placeholder="Enter zip code" 
                        onChange={(e) => handleInput(e, setState)} />
                </Form.Group>
                
                <Button variant="primary" type="submit">Create Account</Button>
            </Form>
            <Link className="back-to-login" to={'/login'}>Back to login</Link>
        </main>
    )
}

export default CreateAccount;