import React, { useState } from "react";
import "./SearchBarStyle.css";

export const SearchBar = () => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    setInputText(e.target.value);
    let SearchInput = e.target.value;
    console.log(SearchInput);
  };

  return (
    <input
      className="SearchBar"
      value={inputText}
      onChange={handleSubmit}
    ></input>
  );
};
