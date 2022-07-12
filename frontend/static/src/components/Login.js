import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { handleError } from './../helpers';
import './../styles/auth.css'

const Login = ({appState, setAppState}) => {
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState({
        username: '',
        password: '',
    })

    const allowSubmit = Object.keys(state).every(field => !!state[field]);

    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch("/dj-rest-auth/login/", options).catch(handleError);
        const data = await response.json();

        if (!response.ok) {
            setError(Object.values(data)[0])
            throw new Error('Network response not ok!');
        }

        Cookies.set("Authorization", `Token ${data.key}`);
        setAppState({
            ...appState, 
            auth: true, 
            userId: data.id, 
            userZip: data.zip, 
        });
        
        if (!window.localStorage.openSeatSearchLocation) {
            const newLocation = data.zip ? data.zip : 'Greenville, SC';
            localStorage.setItem('openSeatSearchLocation', newLocation);
        }
        
        navigate('/');
    }
    
    return (
        <main className="login">
            <h2>Log in</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        name="username" 
                        value={state.username}
                        type="text" 
                        placeholder="Enter username" 
                        required 
                        onChange={handleInput}
                        autoFocus />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-box">
                        <Form.Control 
                            name="password" 
                            value={state.password}
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter password" 
                            required 
                            onChange={handleInput}/>
                        <Button variant="outline-primary" size="sm" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</Button>
                    </div>
                </Form.Group>
                <Button variant="primary" className="login-button" disabled={!allowSubmit} type="submit">Log in</Button>
                <div className="login-footer">
                    <p className="error-message">{error}</p>
                    <p>Don't have an account? Click <Link className="create-account-link" to={'/create-account'}>here</Link> to create one.</p>
                </div>
            </Form>
        </main>
    )
}

export default Login;