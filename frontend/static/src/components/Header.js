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
                <div className={`logo-link-box${appState.auth ? ' auth' : ''}`}>
                    <Link className="logo-link" to={'/'}>OpenSeat</Link>
                </div>
                <div className="header-options">
                    {appState.auth ? 
                        <>
                            <button className="create-event-nav" type="button" onClick={() => setIsCreating(true)}>Create Event</button>
                            <NavLink className="header-nav" to={'/'}>Discover</NavLink>
                            <NavLink className="header-nav" to={'/my-seats'}>My Seats</NavLink>
                            <NavLink className="header-nav" to={'my-events'}>My Events</NavLink>
                            <button className="header-nav" onClick={logOutNav}>Log out</button>
                        </>
                        :
                        <>
                            <NavLink className="header-nav" to={'/'}>Discover</NavLink>
                            <NavLink className="header-nav login-link" to={"/login"}>Log in</NavLink>
                        </>
                    }   
                </div>
                <CreateEvent isCreating={isCreating} setIsCreating={setIsCreating}/>
            </div>
            <div className="spacer"></div>
        </>
    )
}

export default Header;