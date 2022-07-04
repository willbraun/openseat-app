import { useState } from 'react';
import Header from './components/Header';
import ReactRouter from './components/ReactRouter';
import './App.css';

function App() {
	const [state, setState] = useState({
		auth: false,
		userId: 0,
	})
	
	return (
		<>
			<Header appState={state} setAppState={setState}/>
			<ReactRouter appState={state} setAppState={setState}/>
		</>
	);
}

export default App;