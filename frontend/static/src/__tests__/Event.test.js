// import { render, screen } from '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Event from '../components/Event';
import testImage from './../images/test-image.jpeg';

const testAppStateAuth = {
    auth: true,
    userId: 1,
    userZip: '29601',
}

const testAppStateNoAuth = {
    auth: false,
    userId: 1,
    userZip: '29601',
}

const testCreator = {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    username: 'testUser',
    email: 'testUser@example.com',
    profile_pic: testImage,
}

const testEvent1 = {
    id: 1,
    name: 'Fishing',
    description: 'Lets go fishing',
    seats: 4,
    profile_pic: testImage,
    creator: testCreator,
    participants: [testCreator],
    address: '1234 Testing Lane',
    city: 'Greenville',
    state: 'SC',
    zip_code: '29615',
    date: "2100-01-01",
    time: "12:00:00",
    distance: 5.0,
}

const testEvent2 = {
    id: 2,
    name: 'Dancing',
    description: 'Lets go dancing',
    seats: 4,
    profile_pic: testImage,
    creator: testCreator,
    participants: [testCreator],
    address: '1234 Testing Lane',
    city: 'Greenville',
    state: 'SC',
    zip_code: '29615',
    date: "2100-01-01",
    time: "12:00:00",
    distance: 5.0,
}

describe('<Event />', () => {
    test('renders authorized event', () => {
        render(
            <BrowserRouter>
                <Event key={1} appState={testAppStateAuth} event={testEvent1}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent1.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent1.name)).toBeInTheDocument();
    });

    test('renders unauthorized event', () => {
        render(
            <BrowserRouter>
                <Event key={2} appState={testAppStateNoAuth} event={testEvent2}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent2.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent2.name)).toBeInTheDocument();
    });

});