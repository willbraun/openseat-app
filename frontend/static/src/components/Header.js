import { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import './../styles/headerfooter.css';
import CreateEvent from './CreateEvent';

const Header = ({appState, logOut}) => {
    const [isCreating, setIsCreating] = useState(false);
    
    const navigate = useNavigate();

    const logOutNav = () => {
        logOut();
        navigate('/');
    }

    return (
        <>
            <div className="header">
                <div className="logo-link-box">
                    <Link className="logo-link" to={'/'}>OpenSeat</Link>
                </div>
                {appState.auth ? 
                    <>
                        <button className="create-event-nav" type="button" onClick={() => setIsCreating(true)}>Create Event</button>
                        <NavLink className="header-nav" to={'/'}>Discover</NavLink>
                        <NavLink className="header-nav" to={'/my-seats'}>My Seats</NavLink>
                        <NavLink className="header-nav" to={'my-events'}>My Events</NavLink>
                        <button className="header-nav" onClick={logOutNav}>Log out</button>
                    </>
                    :
                    <Link className="header-nav" to={"/login"}>Log in</Link>
                }   
                <CreateEvent isCreating={isCreating} setIsCreating={setIsCreating}/>
            </div>
            <div className="spacer"></div>
        </>
    )
}

export default Header;