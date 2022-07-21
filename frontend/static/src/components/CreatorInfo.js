import './../styles/creatorinfo.css';

const CreatorInfo = ({creator, isCreator}) => {
    return (
        <div className="creator-info">
            <div className="creator-profile-pic-box">
                <img className="creator-profile-pic" src={creator.profile_pic} alt={creator.username} />
            </div>
            <p className="creator-name">{creator.first_name} {creator.last_name} {isCreator && '(you)'}</p>
        </div>
    )
}

export default CreatorInfo;