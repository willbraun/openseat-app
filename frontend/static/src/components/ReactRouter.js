import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import MyEvents from './MyEvents';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import MySeats from './MySeats';
import EditEventParent from './EditEventParent';

const ReactRouter = ({appState, setAppState}) => {
    
    return (
        <BrowserRouter>
            <Header appState={appState} setAppState={setAppState}/>
            <Routes>
                <Route path='/' >
                    <Route index element={<Home appState={appState}/>}/>
                    <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/my-seats' element={<MySeats appState={appState} />}/>
                    <Route path='/my-events/create' element={<CreateEvent />}/>
                    <Route path='/my-events/*' element={<MyEvents appState={appState}/>}>
                        {/* <Route index element=/> */}
                        {/* <Route path='create' element={<CreateEvent />}/> */}
                        {/* <Route path='edit/:id' /> */}
                    </Route>
                    {/* <Route path='/my-events/edit/:id' element={<EditEvent />}/> */}
                    
                </Route>

                <Route path='/*' element={<p>Page not found</p>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default ReactRouter;