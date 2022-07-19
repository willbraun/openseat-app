import '@testing-library/jest-dom';
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

const testUser1 = {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    username: 'testUser',
    email: 'testUser@example.com',
    profile_pic: testImage,
}

const testUser2 = {
    id: 2,
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
    creator: testUser1,
    participants: [testUser1],
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
    creator: testUser2,
    participants: [testUser2],
    address: '1234 Testing Lane',
    city: 'Greenville',
    state: 'SC',
    zip_code: '29615',
    date: "2100-01-01",
    time: "12:00:00",
    distance: 5.0,
}

const testEvent3 = {
    id: 3,
    name: 'Churning Butter',
    description: 'Lets go churn butter',
    seats: 4,
    profile_pic: testImage,
    creator: testUser1,
    participants: [testUser1],
    address: '1234 Testing Lane',
    city: 'Greenville',
    state: 'SC',
    zip_code: '29615',
    date: "1900-01-01",
    time: "12:00:00",
    distance: 5.0,
}

const testEvent4 = {
    id: 4,
    name: 'Baking',
    description: 'Lets bake a cake',
    seats: 4,
    profile_pic: testImage,
    creator: testUser2,
    participants: [testUser2, testUser1],
    address: '1234 Testing Lane',
    city: 'Greenville',
    state: 'SC',
    zip_code: '29615',
    date: "2100-01-01",
    time: "12:00:00",
    distance: 5.0,
}

describe('<Event />', () => {
    test('renders my event, future, authorized', () => {
        render(
            <BrowserRouter>
                <Event key={1} appState={testAppStateAuth} event={testEvent1}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent1.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent1.name)).toBeInTheDocument();
        expect(screen.getByTestId('auth-content')).toBeInTheDocument();
        expect(screen.queryByTestId('no-auth-content')).not.toBeInTheDocument();

        expect(screen.queryByTestId('log-in-to-join')).not.toBeInTheDocument();
        expect(screen.getByTestId('edit-event-button')).toBeInTheDocument();
        expect(screen.queryByTestId('event-completed')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fill-seat-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('give-up-seat-button')).not.toBeInTheDocument();

        expect(screen.getByTestId('event-star')).toBeInTheDocument();
    });

    test('renders my event, past, authorized', () => {
        render(
            <BrowserRouter>
                <Event key={2} appState={testAppStateAuth} event={testEvent3}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent3.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent3.name)).toBeInTheDocument();
        expect(screen.getByTestId('auth-content')).toBeInTheDocument();
        expect(screen.queryByTestId('no-auth-content')).not.toBeInTheDocument();

        expect(screen.queryByTestId('log-in-to-join')).not.toBeInTheDocument();
        expect(screen.queryByTestId('edit-event-button')).not.toBeInTheDocument();
        expect(screen.getByTestId('event-completed')).toBeInTheDocument();
        expect(screen.queryByTestId('fill-seat-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('give-up-seat-button')).not.toBeInTheDocument();

        expect(screen.getByTestId('event-star')).toBeInTheDocument();
    });

    test("renders someone else's event, seat not filled, authorized", () => {
        render(
            <BrowserRouter>
                <Event key={3} appState={testAppStateAuth} event={testEvent2}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent2.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent2.name)).toBeInTheDocument();
        expect(screen.getByTestId('auth-content')).toBeInTheDocument();
        expect(screen.queryByTestId('no-auth-content')).not.toBeInTheDocument();

        expect(screen.queryByTestId('log-in-to-join')).not.toBeInTheDocument();
        expect(screen.queryByTestId('edit-event-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('event-completed')).not.toBeInTheDocument();
        expect(screen.getByTestId('fill-seat-button')).toBeInTheDocument();
        expect(screen.queryByTestId('give-up-seat-button')).not.toBeInTheDocument();

        expect(screen.queryByTestId('event-star')).not.toBeInTheDocument();
    });

    test("renders someone else's event, seat filled, authorized", () => {
        render(
            <BrowserRouter>
                <Event key={3} appState={testAppStateAuth} event={testEvent4}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent4.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent4.name)).toBeInTheDocument();
        expect(screen.getByTestId('auth-content')).toBeInTheDocument();
        expect(screen.queryByTestId('no-auth-content')).not.toBeInTheDocument();

        expect(screen.queryByTestId('log-in-to-join')).not.toBeInTheDocument();
        expect(screen.queryByTestId('edit-event-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('event-completed')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fill-seat-button')).not.toBeInTheDocument();
        expect(screen.getByTestId('give-up-seat-button')).toBeInTheDocument();

        expect(screen.queryByTestId('event-star')).not.toBeInTheDocument();
    });

    test('renders unauthorized event', () => {
        render(
            <BrowserRouter>
                <Event key={4} appState={testAppStateNoAuth} event={testEvent2}/>
            </BrowserRouter>
        );
        expect(screen.getByText(testEvent2.name)).toBeInTheDocument();
        expect(screen.getByAltText(testEvent2.name)).toBeInTheDocument();
        expect(screen.getByTestId('no-auth-content')).toBeInTheDocument();
        expect(screen.queryByTestId('auth-content')).not.toBeInTheDocument();

        expect(screen.getByTestId('log-in-to-join')).toBeInTheDocument();
        expect(screen.queryByTestId('edit-event-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('event-completed')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fill-seat-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('give-up-seat-button')).not.toBeInTheDocument();

        expect(screen.queryByTestId('event-star')).not.toBeInTheDocument();
    });

});