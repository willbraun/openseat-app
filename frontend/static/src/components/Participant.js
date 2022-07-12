const Participant = ({first_name, last_name, username, profile_pic}) => {
    return (
        <div className="participant-info">
            <div className="participant-profile-pic-box">
                <img className="participant-profile-pic" src={profile_pic} alt={username} />
            </div>
            <p className="participant-name">{`${first_name} ${last_name} (${username})`}</p>
        </div>
    )
}

export default Participant;