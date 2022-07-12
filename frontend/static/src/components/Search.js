import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './../styles/search.css';

const Search = ({currentSearch, currentRadius, findEvents}) => {
    const [value, setValue] = useState(null);
    const [radius, setRadius] = useState(currentRadius);

    return (
        <div className="search-bar">
            <Form className="search-bar-form" onSubmit={() => findEvents(value.label, radius)}>
                <Form.Group className="location-search-input">
                    <GooglePlacesAutocomplete 
                        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                        selectProps={{
                            value,
                            onChange: setValue,
                            placeholder: currentSearch,
                        }} />
                </Form.Group>
                <p>within</p>
                <Form.Group >
                    <Form.Select
                        name="radius" 
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}>
                        <option value="2">2 miles</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                        <option value="50">50 miles</option>
                        <option value="100">100 miles</option>
                    </Form.Select>
                </Form.Group>
                <button className="search-submit" type="submit">Find Events</button>
            </Form>
        </div>
        
    )
}

export default Search;