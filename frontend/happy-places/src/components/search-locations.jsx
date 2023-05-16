import { useEffect, useState } from "react"
import fetch from "./../utilities/fetch";
const SearchLocations = (props) => {
    const [name, setName] = useState("")
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