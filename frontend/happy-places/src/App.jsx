import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { SearchBarButton } from "./components/SearchBarButton/SearchBarButton";
import "./App.css";

function App() {
  return (
    <>
      <SearchBar />
      <SearchBarButton />
      hallo USER!
    </>
  );
}

export default App;
