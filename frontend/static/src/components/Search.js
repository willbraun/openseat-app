import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './../styles/search.css';

const Search = ({appState, currentPhrase, currentLocation, currentRadius, setCurrentPhrase, setCurrentLocation, setCurrentRadius}) => {
    
    const searchOptions = (
        <Row className="mx-3 mx-md-5 mx-lg-0 gx-2 gy-2">
            <Col xs={12} lg={5} className="phrase-search-input">
                <Form.Control 
                    name="phrase"
                    value={currentPhrase}
                    placeholder={`${appState.auth ? "Search by activity, address, or host..." : "Search by activity..."}`}
                    onChange={(e) => setCurrentPhrase(e.target.value)}
                />
            </Col>
            <Col xs={12} lg={5} className="location-search-input">
                <GooglePlacesAutocomplete 
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    selectProps={{
                        placeholder: currentLocation,
                        onChange: (e) => setCurrentLocation(e.label),
                    }} />
            </Col>
            <Col xs={12} lg={2} className="radius-search-input">
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
            </Col>
        </Row>
    )

    return (
        <section className="search-bar">
            <Container fluid className="px-0 my-2 d-none d-lg-block search-options">
                {searchOptions}
            </Container>

            <Accordion flush className="d-lg-none search-options-mobile">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="mobile-search-header">Search Filters</Accordion.Header>
                    <Accordion.Body className="px-0">
                        {searchOptions}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </section>
    )
}

export default Search;