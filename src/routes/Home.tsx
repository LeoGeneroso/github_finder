import { useState } from "react"
import { UserInfo } from "../types/UserInfo";
import Search from "../components/Search"
import User from "../components/User";
import Error from "../components/Error";
import Loading from "../components/Loading";

const Home = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadUser = async(userName: string) => {
        setLoading(true);
        setError(false);
        setUser(null);

        const res = await fetch(`http://api.github.com/users/${userName}`);
        const data = await res.json();
        
        setLoading(false);

        if (res.status === 404) {
            setError(true);
            return;
        }

        const { avatar_url, login, bio, location, followers, following } = data;

        const userData: UserInfo = {
            avatar_url,
            login,
            bio,
            location,
            followers,
            following,
        }

        setUser(userData);
    }

    return (
        <div>
            <Search loadUser={loadUser} />
            {loading && <Loading />}
            {user && <User {...user} />}
            {error && <Error />}
        </div>
    )
}

export default Home