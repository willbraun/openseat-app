import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import './../styles/header.css';

const Header = ({appState, setAppState}) => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const showHeader = !(location.pathname.includes('login') || location.pathname.includes('create-account'));

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
                    <Link className="header-nav" to={'my-events/create'}>Create Event</Link>
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
            </div>
            <div className="spacer"></div>
        </>
    )
}

export default Header;