import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import './../styles/headerfooter.css';
import CreateEvent from './CreateEvent';
import chair from './../images/icons8-armchair-80.png';
import calendarPlus from './../images/calendar-plus-solid.svg';


const Header = ({appState, isCreating, setIsCreating, logOut}) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const logOutNav = async () => {
        await logOut();
        navigate('/');
    }

    return (
        <>
            <div className={`header${location.pathname === '/' ? ' header-home' : ''}${appState.auth ? ' auth' : ''}`}>
                <div className={`logo-link-box`}>
                    <Link className="logo-link" to={'/'}>
                        OpenSeat
                        <img className="chair-icon" src={chair} alt="chair" />
                    </Link>
                </div>
                <div className="header-options">
                    {appState.auth ? 
                        <>
                            <button className="create-event-nav animate-button" type="button" onClick={() => setIsCreating(true)}>
                                <img className="calendar-plus" src={calendarPlus} alt="calendar plus" />
                                <p>Create Event</p>
                            </button>
                            <NavLink className="header-nav" to={'/'}>Discover</NavLink>
                            <NavLink className="header-nav" to={'/my-seats'}>My Seats</NavLink>
                            <NavLink className="header-nav" to={'/my-events'}>My Events</NavLink>
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