import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import Cookies from 'js-cookie';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleError } from './helpers';

function App() {
	const [state, setState] = useState({
		auth: !!Cookies.get('Authorization'),
		userId: 0,
		userZip: '',
	})

	const logOut = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        Cookies.remove("Authorization");
        setState({...state, auth: false});
    }
	
	return (
		<ReactRouter appState={state} setAppState={setState} logOut={logOut}/>
	);
}

export default App;