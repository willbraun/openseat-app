import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import './App.css';

function App() {
	const [state, setState] = useState({
		auth: false,
		userId: 0,
	})
	
	return (
		<>
			<ReactRouter appState={state} setAppState={setState}/>
		</>
	);
}

export default App;