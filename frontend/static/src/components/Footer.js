import { useNavigate, NavLink } from "react-router-dom";

const Footer = ({appState, logOut}) => {
    const navigate = useNavigate();

    const logOutNav = () => {
        logOut();
        navigate('/');
    }
    
    return (
        <>
            <div className="footer">
                <NavLink className="footer-nav" to={'/'}>Discover</NavLink>
                {appState.auth ? 
                    <>  
                        <NavLink className="footer-nav" to={'/my-seats'}>My Seats</NavLink>
                        <NavLink className="footer-nav" to={'/my-events'}>My Events</NavLink>
                        <button className="footer-nav" onClick={logOutNav}>Log out</button>
                    </>
                    :
                    <NavLink className="footer-nav login-link" to={"/login"}>Log in</NavLink>
                }   
            </div>
        </>
        
    )
}

export default Footer;