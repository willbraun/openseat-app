import star from './../images/star.svg';
import './../styles/star.css';

const Participant = ({id, creatorId, first_name, last_name, username, profile_pic}) => {
    return (
        <div className="participant-info">
            {id === creatorId && 
                <div className="star-box participant-star">
                    <img className="star-icon" src={star} alt="star" />
                </div>
            }
            <div className="participant-profile-pic-box">
                <img className="participant-profile-pic" src={profile_pic} alt={username} />
            </div>
            <p className="participant-name">{`${first_name} ${last_name} (${username})`}</p>
        </div>
    )
}

export default Participant;