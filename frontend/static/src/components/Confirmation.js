import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { format, parseISO } from 'date-fns';
import './../styles/confirmation.css';
import { useState } from 'react';
import CreatorInfo from './CreatorInfo';
import check from './../images/check-solid.svg';

const Confirmation = ({event, eventState, isAttending, showConfirm, setShowConfirm, fillSeat, giveUpSeat}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isFilling = isAttending === isFlipped;
    

    const action = isAttending ? giveUpSeat : fillSeat;

    const close = () => {
        setTimeout(() => {
            setShowConfirm(false);
        }, 3000);
        setTimeout(() => {
            setIsFlipped(false);
        }, 3200);
    }

    const confirm = async () => {
        setIsLoading(true);
        const newParticipants = await action();
        if (Array.isArray(newParticipants)) {
            setIsFlipped(true);
            close();
        }
        else {
            console.error('Seat update unsuccessful');
        }
        setIsLoading(false);
    }

    return (
        <Modal 
            show={showConfirm} 
            onHide={close} 
        >
            <Modal.Header closeButton className="confirmation border-0"></Modal.Header>
            <Modal.Body className="confirmation-body">
                <p className="confirmation-header">{isFilling ? 'Great choice! Confirm your attendance.' : 'Are you sure you want to cancel your seat?'}</p>
                <div className="confirmation-card">
                    <div className={`card-inner${isFlipped ? ' flipped' : ''}`}>
                        <div className="card-front">
                            <div className="confirmation-image-box">
                                <img src={eventState.image} alt="" />
                            </div>
                            <div className="confirmation-details">
                                <CreatorInfo creator={eventState.creator}/>
                                <address>{eventState.address}</address>
                                <time>{format(parseISO(`${eventState.date} ${eventState.time}`), 'h:mm a, M/d/yyyy (eee)')}</time>
                            </div>
                            <p className="confirmation-event-name">{eventState.name}</p>
                        </div>
                        <div className="card-back">
                            <div className="check-circle">
                                <img src={check} alt="check mark" />
                            </div>
                            <p className="success-message">{isFilling ? 'You filled a seat! 🎉' : 'Seat canceled'}</p>
                            <p className="back-event-name">{event.name}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="confirmation-footer">
                <button className="cancel-button animate-button" type="button" disabled={isFlipped} onClick={close}>Exit</button> 
                <button className="confirm-button animate-button" type="button" disabled={isFlipped} onClick={confirm}>
                    {isFilling ? 'Fill Seat' : 'Cancel Seat' }
                    {isLoading ? <Spinner className="confirmation-spinner" animation="border" variant="light" size="sm"/> : undefined}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation;