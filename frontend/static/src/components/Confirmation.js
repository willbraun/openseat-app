import Modal from 'react-bootstrap/Modal';
import { format, parseISO } from 'date-fns';
import './../styles/confirmation.css';
import CreatorInfo from './CreatorInfo';

const Confirmation = ({event, isAttending, showConfirm, setShowConfirm, fillSeat, giveUpSeat}) => {

    const action = isAttending ? giveUpSeat : fillSeat;

    const close = () => {
        setShowConfirm(false);
    }

    const confirm = () => {
        action();
        close();
    }

    return (
        <Modal 
            show={showConfirm} 
            onHide={close} 
        >
            <Modal.Header closeButton className="confirmation border-0"></Modal.Header>
            <Modal.Body className="confirmation-body">
                <p className="confirmation-header">{isAttending ? 'Are you sure you want to cancel your seat?' : 'Great choice! Confirm your attendance for'}</p>
                <div className="confirmation-card">
                    <div className="confirmation-image-box">
                        <img src={event.image} alt="" />
                    </div>
                    <div className="confirmation-details">
                        <CreatorInfo creator={event.creator}/>
                        <address>{event.address}</address>
                        <time>{format(parseISO(`${event.date} ${event.time}`), 'h:mm a, M/d/yyyy (eee)')}</time>
                    </div>
                    <p className="confirmation-event-name">{event.name}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="confirmation-footer">
                <button className="cancel-button animate-button" type="button" onClick={close}>Exit</button> 
                <button className="confirm-button animate-button" type="submit" form="create-event-input-form" onClick={confirm}>{isAttending ? 'Cancel Seat' : 'Fill Seat'}</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation;