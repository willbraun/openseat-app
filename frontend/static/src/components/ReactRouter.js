import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import MyEvents from './MyEvents';
import CreateEvent from './CreateEvent';

const ReactRouter = ({appState, setAppState}) => {
    
    return (
        <BrowserRouter>
            <Header appState={appState} setAppState={setAppState}/>
            <Routes>
                <Route path='/' >
                    <Route index element={<Home appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                    <Route path='my-events' >
                        <Route index element={<MyEvents appState={appState} setAppState={setAppState}/>}/>
                        <Route path='create' element={<CreateEvent />}/>
                    </Route>
                    {/* Add routes for settings */}
                </Route>

                <Route path='/*' element={<p>Page not found</p>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default ReactRouter;