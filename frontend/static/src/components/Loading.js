import Spinner from 'react-bootstrap/Spinner';
import './../styles/loading.css';

const Loading = () => {
    return (
        <div className="loading">
            <Spinner animation="border" />
        </div>
    )
}

export default Loading;