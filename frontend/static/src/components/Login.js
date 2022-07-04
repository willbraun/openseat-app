import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { handleError } from './../helpers';
import './../styles/auth.css'

const Login = ({appState, setAppState}) => {
    const [state, setState] = useState({
        username: '',
        password: '',
    })

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

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        navigate('/');
        setAppState({...appState, auth: true});
    }
    
    return (
        <main className="login">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        name="username" 
                        value={state.username}
                        type="text" 
                        placeholder="Enter username" 
                        required 
                        onChange={handleInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name="password" 
                        value={state.password}
                        type="password" 
                        placeholder="Enter password" 
                        required 
                        onChange={handleInput}/>
                </Form.Group>
                <Button variant="primary" type="submit">Log in</Button>
                <Form.Text>Don't have an account? Click <Link className="create-account-link" to={'/create-account'}>here</Link> to create one.</Form.Text>
            </Form>
        </main>
    )
}

export default Login;