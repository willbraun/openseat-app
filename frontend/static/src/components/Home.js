import { Link } from 'react-router-dom';
import Event from './Event';

const Home = ({appState}) => {

    // state has user's zipcode. If user doesn't have one, use 29601
    // state also has radius in miles

    // dropdowns in UI for each state item
    // update state when dropdowns are changed
    // make filter button to get events from API with query params from state

    // map over response and convert each to an Event component - pass down appState
    // use react-bootstrap to fill the cards into a grid

    
    return (
        <main>
            <div>Home</div>
            <Link to={'my-events/create'}>Create Event</Link>
        </main>
    )
}

export default Home;