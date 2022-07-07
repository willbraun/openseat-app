import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
        <Navbar className="header">
            <Link className="logo-link" to={'/'}>OpenSeat</Link>
            <Link className="header-nav" to={'/'}>Home</Link>
            <Link className="header-nav" to={'my-events'}>My Events</Link>
            <Link className="header-nav" to={'/'}>Settings</Link> 
            {/* Edit settings routes */}
            <Nav.Item >
                {appState.auth ? 
                    <button className="header-nav" onClick={logOut}>Log out</button> :
                    <Link className="header-nav" to={"/login"}>Log in</Link>
                }
            </Nav.Item>
        </Navbar>
    )
}

export default Header;