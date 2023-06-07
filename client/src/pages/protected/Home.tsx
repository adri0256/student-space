import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const Home = () => {
    const user = useSelector(selectUser);
    const token = useSelector(selectAccessToken);
    const dispatch = useDispatch();

    const welcome = user ? `Welcome ${user}` : "Welcome";
    const tokenAbbr = `${token?.slice(0, 9)}...`;

    console.log("Home", user, token);

    const handleLogout = () => {
        console.log("logout");
        dispatch(logOut());
    };

    const content = (
        <section className="home">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <button onClick={handleLogout}>LogOut</button>
            <br />
            <Link to="/userslist">UserList</Link>
        </section>
    );

    return content;
};

export default Home;
