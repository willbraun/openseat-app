import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import Cookies from 'js-cookie';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [state, setState] = useState({
		auth: !!Cookies.get('Authorization'),
		userId: 0,
		userZip: '',
	})
	
	return (
		<ReactRouter appState={state} setAppState={setState}/>
	);
}

export default App;