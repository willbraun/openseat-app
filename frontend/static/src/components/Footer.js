import { useNavigate, NavLink, Link } from "react-router-dom";

const Footer = ({appState, logOut}) => {
    const navigate = useNavigate();

    const logOutNav = () => {
        logOut();
        navigate('/');
    }
    
    return (
        <div className="footer">
            {appState.auth ? 
                <>
                    <NavLink className="footer-nav" to={'/'}>Discover</NavLink>
                    <NavLink className="footer-nav" to={'/my-seats'}>My Seats</NavLink>
                    <NavLink className="footer-nav" to={'my-events'}>My Events</NavLink>
                    <button className="footer-nav" onClick={logOutNav}>Log out</button>
                </>
                :
                <Link className="footer-nav" to={"/login"}>Log in</Link>
            }   
        </div>
    )
}

export default Footer;