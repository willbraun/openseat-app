import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Participant from './Participant';
import { format, parseISO } from 'date-fns';
import './../styles/eventparticipants.css'

const EventParticipants = ({eventState, showParticipants, setShowParticipants}) => {
    if (!eventState.participants) {
        return <div>Loading participants...</div>
    }
    
    const participantList = eventState.participants.map(participant => 
        <Col xs={6} className="px-0" key={participant.id}>
            <Participant key={participant.id} {...participant} creatorId={eventState.creator.id}/>
        </Col>
    )

    const index = participantList.findIndex(participant => participant.props.children.props.id === eventState.creator.id)
    const creator = participantList.splice(index, 1)

    participantList.sort((a, b) => {
        const aString = a.props.children.props.first_name.toLowerCase();
        const bString = b.props.children.props.first_name.toLowerCase();
        return aString.localeCompare(bString);
    })

    participantList.unshift(creator)

    return (
        <Modal
            className="event-participants"
            show={showParticipants}
            onHide={() => setShowParticipants(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>
                    {eventState.name} 
                    <div className="participants-subheader">
                        <address>{eventState.address}</address>
                        <time>{format(parseISO(`${eventState.date} ${eventState.time}`), 'h:mm a, M/d/yyyy (eee)')}</time>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="participant-list-body">
                <Row>
                    {participantList}
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <p className="participant-list-filled">{eventState.participants.length} / {eventState.seats} seats filled</p>
                <button type="button" className="participant-list-back" onClick={() => setShowParticipants(false)}>Back</button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventParticipants;