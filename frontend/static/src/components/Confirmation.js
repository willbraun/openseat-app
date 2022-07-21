import Modal from 'react-bootstrap/Modal';
import { format, parseISO } from 'date-fns';
import './../styles/confirmation.css';
import { useEffect, useState } from 'react';
import CreatorInfo from './CreatorInfo';
import check from './../images/check-solid.svg';

const Confirmation = ({event, eventState, isAttending, showConfirm, setShowConfirm, fillSeat, giveUpSeat}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const isFilling = isAttending === isFlipped;
    
    // useEffect(() => {
    //     if (showConfirm === false) {
    //         setIsFlipped(false);
    //     }
    // }, [showConfirm])

    const action = isAttending ? giveUpSeat : fillSeat;

    const close = () => {
        setTimeout(() => {
            setShowConfirm(false);
        }, 3000);
        setTimeout(() => {
            setIsFlipped(false);
        }, 4000);
    }

    const confirm = async () => {
        await action();
        if (event.participants !== eventState.participants) {
            setIsFlipped(true);
            close();
        }
        else {
            console.error('Seat update unsuccessful');
        }
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
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="confirmation-footer">
                <button className="cancel-button animate-button" type="button" onClick={close}>Exit</button> 
                <button className="confirm-button animate-button" type="submit" form="create-event-input-form" onClick={confirm}>{isFilling ? 'Fill Seat' : 'Cancel Seat' }</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation;