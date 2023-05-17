import { useEffect, useState, useContext } from "react"
import myFetch from "./../utilities/fetch";
import { LogginInContext } from "./../App";
import SearchBar from "./search-bar";
import Button from "./button";

const API_KEY = "EE515144600C4F2BBD31ADEC79D7808F";

const SearchLocations = (props) => {
    const [name, setName] = useState("")
    const { loggedIn, setLoggedIn } = useContext(LogginInContext);
    const [searchInput, setSearchInput] = useState("");
    const [location, setLocation] = useState(null);
    const [images, setImages] = useState({});

    const searchTripAdvisorHandler = (searchQuery) => {
        fetch(
            `https://api.content.tripadvisor.com/api/v1/location/search?key=${API_KEY}&searchQuery=${searchQuery}&language=en`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("suche");
                console.log(data);
                if (data && data.data && data.data.length > 0) {
                    setLocation(data.data[0]);
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        let locationId;
        if (location) {
            setImages({});
            locationId = location.location_id;
        }
        try {
            (async () => {
                const response = await fetch(
                    `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=${API_KEY}&language=en`
                );
                const data = await response.json();
                console.log("lokale");
                console.log(data);

                if (data.data && data.data.length > 0) {
                    // const image = data.data[0].images.large.url;
                    const image = data.data
                    setImages(() => ({
                        image, name: location.name
                    }));
                }
            })()
        } catch (err) {
            location;
            console.error(err);
        }
    }, [location]);

    useEffect(() => {
        (async () => {
            try {
                const response = await myFetch(import.meta.env.VITE_URL + "get-user-name", {
                    method: "GET",
                    'credentials': 'include',

                });
                console.log(response)
                // TODO: front and backend same message: loged in
                setName(response.username)
            } catch (err) {
                console.log(err)
            }
        })();
    }, []);

    useEffect(() => {
        console.log(images)
    }, [images])
    if (name.length > 0) {
        console.log(images)
        return (
            <>
                <p>{name}</p>

                <SearchBar setSearchInput={setSearchInput} />
                <Button onClick={() => searchTripAdvisorHandler(searchInput)} />
                {location && (
                    <div>
                        <h1>{location.name}</h1>
                        <p>{location.address_obj.address_string}</p>
                    </div>)}
                {
                    images.image ? (
                        images.image.map((image, index) => {
                            console.log(image)
                            return (
                                <div key={index}>
                                    <img src={image.images.large.url} />
                                    <p key={index + "user"}>{"Shot by: " + image.user.username}</p>
                                    <p key={index + "caption"}>{image.caption}</p>
                                </div>
                            )
                        })
                    ) : ""
                }
            </>
        );
    } else {

        return <p>Waiting...</p>
    }
}
export default SearchLocations