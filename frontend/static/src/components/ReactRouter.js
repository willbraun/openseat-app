import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';

const ReactRouter = ({appState, setAppState}) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' >
                    <Route index element={<Home appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;