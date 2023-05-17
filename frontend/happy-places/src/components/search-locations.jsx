import { useEffect, useState, useContext } from "react"
import fetch from "./../utilities/fetch";
import { LogginInContext } from "./../App";

const SearchLocations = (props) => {
    const [name, setName] = useState("")
    const { loggedIn, setLoggedIn } = useContext(LogginInContext);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL + "get-user-name", {
                    method: "GET",
                    'credentials': 'include',

                });
                console.log(response)
                setName(response.username)
            } catch (err) {
                console.log(err)
            }
        })();
    }, []);
    if (name.length > 0) {
        return <p>{name}</p>
    } else {

        return <p>Waiting...</p>
    }
}
export default SearchLocations