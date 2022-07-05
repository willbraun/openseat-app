import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const Header = ({appState, setAppState}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const showHeader = !(location.pathname.includes('login') || location.pathname.includes('create-account'));

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

    const headerItems = (
        <>
        <Link to={'/'}>Home</Link>
        <Link to={'my-events'}>My Events</Link>
        <Link to={'/'}>Settings</Link> 
        {/* Edit settings routes */}
        <Nav.Item>
            {appState.auth ? 
                <Button onClick={logOut}>Log out</Button> :
                <Link to={"/login"}>Log in</Link>
            }
        </Nav.Item>
        </>
    )

    return (
        <Navbar>
            {showHeader && headerItems}
        </Navbar>
    )
}

export default Header;