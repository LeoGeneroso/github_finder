import { UserInfo } from "../types/UserInfo"
import { MdLocationPin } from "react-icons/md"
import { Link } from "react-router-dom"
import styles from "./User.module.css"

const User = ({ avatar_url, login, bio, location, followers, following }: UserInfo) => {
    return (
        <div className={styles.user}>
            <img src={avatar_url} alt={login} />
            <h2>{login}</h2>
            <p>{bio}</p>
            {location && (
                <p className={styles.location}>
                    <MdLocationPin />
                    <span>{location}</span>
                </p>
            )}
            <div className={styles.stats}>
                <div>
                    <p>Followers:</p>
                    <p className={styles.number}>{followers}</p>
                </div>
                <div>
                    <p>Following:</p>
                    <p className={styles.number}>{following}</p>
                </div>
            </div>
            <Link to={`/repos/${login}`}>See the best projects</Link>
        </div>
    )
}

export default User