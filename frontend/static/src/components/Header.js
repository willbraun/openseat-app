import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import EventInput from './EventInput';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import './../styles/header.css';
import CreateEvent from './CreateEvent';

const Header = ({appState, setAppState}) => {
    const [isCreating, setIsCreating] = useState(false);
    
    const navigate = useNavigate();

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
        setAppState({...appState, auth: false});
        navigate('/');
    }

    return (
        <>
            <div className="header">
                <div className="logo-link-box">
                    <Link className="logo-link" to={'/'}>OpenSeat</Link>
                </div>
                {appState.auth && 
                <>
                    <button className="" type="button" onClick={() => setIsCreating(true)}>Create Event</button>
                    <Link className="header-nav" to={'/'}>Home</Link>
                    <Link className="header-nav" to={'/my-seats'}>My Seats</Link>
                    <Link className="header-nav" to={'my-events'}>My Events</Link>
                    {/* <Link className="header-nav" to={'/'}>Settings</Link>  */}
                </>
                }   
                <div >
                    {appState.auth ? 
                        <button className="header-nav" onClick={logOut}>Log out</button> :
                        <Link className="header-nav" to={"/login"}>Log in</Link>
                    }
                </div>
                <CreateEvent isCreating={isCreating} setIsCreating={setIsCreating}/>
            </div>
            <div className="spacer"></div>
        </>
    )
}

export default Header;