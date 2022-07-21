import Modal from 'react-bootstrap/Modal';
import { format, parseISO } from 'date-fns';
import './../styles/confirmation.css';
import { useEffect, useState } from 'react';
import CreatorInfo from './CreatorInfo';

const Confirmation = ({event, isAttending, showConfirm, setShowConfirm, fillSeat, giveUpSeat}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    useEffect(() => {
        setIsFlipped(false);
    }, [showConfirm])

    const action = isAttending ? giveUpSeat : fillSeat;

    const close = () => {
        setShowConfirm(false);
    }

    const confirm = () => {
        setIsFlipped(true);
        setTimeout(() => {
            action();
            close();
        }, 3000);
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
                    <div className={`card-inner${isFlipped ? ' flipped' : ''}`}>
                        <div className="card-front">
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
                        <div className="card-back">
                            Back of card
                        </div>
                    </div>
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