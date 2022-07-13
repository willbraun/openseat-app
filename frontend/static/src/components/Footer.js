import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";

const Footer = ({appState, logOut}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const loginOrCA = location.pathname.endsWith('/login') || location.pathname.endsWith('/create-account');

    const logOutNav = () => {
        logOut();
        navigate('/');
    }
    
    return (
        <>
        {!loginOrCA && 
            <div className="footer">
                {appState.auth ? 
                    <>
                        <NavLink className="footer-nav" to={'/'}>Discover</NavLink>
                        <NavLink className="footer-nav" to={'/my-seats'}>My Seats</NavLink>
                        <NavLink className="footer-nav" to={'my-events'}>My Events</NavLink>
                        <button className="footer-nav" onClick={logOutNav}>Log out</button>
                    </>
                    :
                    <Link className="footer-nav login-link" to={"/login"}>Log in</Link>
                }   
            </div>
        }
        </>
        
    )
}

export default Footer;