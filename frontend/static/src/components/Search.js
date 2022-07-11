import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './../styles/search.css';

const Search = ({currentSearch, currentRadius, findEvents}) => {
    const [value, setValue] = useState(null);
    const [radius, setRadius] = useState(currentRadius);

    return (
        <div className="search-bar">
            <Form onSubmit={() => findEvents(value.label, radius)}>
                <Row className="search-bar-row">
                    <Col xs={6}>
                        <Form.Group className="location-search-input">
                            <GooglePlacesAutocomplete selectProps={{
                                value,
                                onChange: setValue,
                                placeholder: currentSearch,
                            }} />
                        </Form.Group>
                    </Col>
                    <Col xs={1}>
                        <p>Within</p>
                    </Col>
                    <Col xs={2}>
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
                    </Col>
                    <Col xs={3}>
                        <button className="search-submit" type="submit">Find Events</button>
                    </Col>
                </Row>
            </Form>
        </div>
        
    )
}

export default Search;