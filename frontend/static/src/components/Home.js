import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main>
            <div>Home</div>
            <Link to={'my-events/create'}>Create Event</Link>
        </main>
    )
}

export default Home;