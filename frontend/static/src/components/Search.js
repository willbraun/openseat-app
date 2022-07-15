import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './../styles/search.css';

const Search = ({currentPhrase, currentLocation, currentRadius, setCurrentPhrase, setCurrentLocation, setCurrentRadius}) => {
    const [newPhrase, setNewPhrase] = useState(currentPhrase);

    const handleSubmitPhrase = (e) => {
        e.preventDefault();
        setCurrentPhrase(newPhrase);
    }

    return (
        <section className="search-bar">
            <div className="search-options">
                <div className="phrase-search-input">
                    <Form onSubmit={handleSubmitPhrase}>
                        <Form.Control 
                            name="phrase"
                            value={newPhrase}
                            placeholder="Search..."
                            onChange={(e) => setNewPhrase(e.target.value)}
                        />
                    </Form>
                </div>
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