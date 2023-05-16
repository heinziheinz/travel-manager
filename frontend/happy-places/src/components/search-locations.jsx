import { useEffect } from "react"
import fetch from "./../utilities/fetch";
const SearchLocations = (props) => {
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(import.meta.env.VITE_URL + "get-user-name", {
                    method: "GET",
                    'credentials': 'include',

                });
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        })();
    }, []);
    return <p>Search Locations</p>
}
export default SearchLocations