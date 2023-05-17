const SearchBar = ({ setSearchInput }) => {
    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    return <input className="SearchBar" onChange={handleInputChange}></input>;
};
export default SearchBar;