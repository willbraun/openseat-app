import Form from 'react-bootstrap/Form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './../styles/search.css';

const Search = ({currentLocation, currentRadius, setCurrentLocation, setCurrentRadius}) => {

    return (
        <section className="search-bar">
            <div className="search-options">
                <div className="location-search-input">
                    <GooglePlacesAutocomplete 
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        selectProps={{
                            placeholder: currentLocation,
                            onChange: (e) => setCurrentLocation(e.label),
                        }} />
                </div>
                <div className="radius-search-input">
                    <Form.Select
                        name="radius" 
                        className="radius-select"
                        value={currentRadius}
                        onChange={(e) => setCurrentRadius(e.target.value)}>
                        <option value="2">2 miles</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                        <option value="50">50 miles</option>
                        <option value="100">100 miles</option>
                    </Form.Select>
                </div>
            </div>
        </section>
    )
}

export default Search;