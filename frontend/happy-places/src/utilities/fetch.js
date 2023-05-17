const fetchPizzaData = async (url, opt = {}) => {
    const response = await fetch(url, opt);
    console.log("response")
    console.log(response)
    const resonseJson = await response.json();
    console.log("resonseJson")
    console.log(resonseJson)
    return resonseJson;
}

export default fetchPizzaData;
