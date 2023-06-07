import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/protected/Home";
import Login from "./pages/Login";
import UserList from "./pages/protected/UserList";
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequreAuth";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public */}
                <Route index element={<Login />} />

                {/* protected */}
                <Route element={<RequireAuth />}>
                    <Route path="Home" element={<Home />} />
                    <Route path="userslist" element={<UserList />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
