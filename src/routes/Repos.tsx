import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackBtn from "../components/BackBtn"
import Loading from "../components/Loading"
import Repo from "../components/Repo"
import { RepoInfo } from "../types/RepoInfo"
import styles from "./Repos.module.css"

const Repos = () => {
    const { username } = useParams();
    const [repos, setRepos] = useState<RepoInfo[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadRepos = async function(username: string) {
            setLoading(true);
            
            const res = await fetch(`http://api.github.com/users/${username}/repos`);
            const data = await res.json();

            setLoading(false);

            let orderedRepos = data.sort((a: RepoInfo, b: RepoInfo) => b.stargazers_count - a.stargazers_count);

            setRepos(orderedRepos);
        }

        loadRepos(username!);
    }, []);

    return (
        <div className={styles.repos}>
            <BackBtn />
            <h2>Explore repositories of the user: {username}</h2>
            {loading && <Loading />}
            {(repos?.length === 0) && <p>There are no repositories.</p>}
            {(repos && repos?.length > 0) && (
                <div className={styles.repos_container}>
                    {repos.map((repo: RepoInfo) => (
                        <Repo key={repo.name} {...repo}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Repos