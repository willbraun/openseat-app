import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Search = ({currentSearch, findEvents}) => {
    const [value, setValue] = useState(null);

    return (
        <div>
            <p>Events near</p>
            <GooglePlacesAutocomplete selectProps={{
                value,
                onChange: setValue,
                placeholder: currentSearch,
            }} />
            <p>within</p>
            
            <button type="button" onClick={() => findEvents(value.label)}>Find Events</button>
        </div>
    )
}

export default Search;