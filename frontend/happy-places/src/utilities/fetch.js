const fetchPizzaData = async (url, opt = {}) => {
    const response = await fetch(url, opt);
    const users = await response.json();
    return users;
}

export default fetchPizzaData;
