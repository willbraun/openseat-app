import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Home from './Home';
import MyEvents from './MyEvents';
import MySeats from './MySeats';

const ReactRouter = ({appState, setAppState, isCreating, setIsCreating, logOut}) => {
    
    return (
        <BrowserRouter>
            <Header appState={appState} isCreating={isCreating} setIsCreating={setIsCreating} logOut={logOut}/>
            <Footer appState={appState} logOut={logOut}/>
            <Routes>
                <Route path='/' >
                    <Route index element={<Home appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                    <Route path='/my-seats' element={<MySeats appState={appState} setIsCreating={setIsCreating}/>}/>
                    <Route path='/my-events' element={<MyEvents appState={appState}/>}/>
                </Route>
                <Route path='/*' element={<p>Page not found</p>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default ReactRouter;