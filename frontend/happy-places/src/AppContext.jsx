import { Route, Routes, } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import AllLocation from "./components/all-location";
import Navbar from "./components/navbar";
import SearchLocations from "./components/search-locations";
// https://stackoverflow.com/questions/69843615/switch-is-not-exported-from-react-router-dom
// https://reactrouter.com/en/6.9.0/upgrading/v5#upgrade-all-switch-elements-to-routes
import './App.css'


function AppContext() {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    {/* <Route path="/" element={<Navbar />} /> */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search-location" element={<SearchLocations />} />
                    <Route path="/all-location" element={<AllLocation />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppContext
