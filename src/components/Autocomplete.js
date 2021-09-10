import React, { useEffect, useRef, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import "../App.css";

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const searchContainer = useRef(null);

  const suggestions = [
    "Oathbringer",
    "American Gods",
    "A Game of Thrones",
    "Prince of Thorns",
    "Assassin's Apprentice",
    "The Hero of Ages",
    "The Gunslinger",
  ];

  const onChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filteredSuggestions);
    setDisplaySuggestions(true);
  };

  const onSelectSuggestion = (index) => {
    setSelectedSuggestion(index);
    setInputValue(filteredSuggestions[index]);
    setFilteredSuggestions([]);
    setDisplaySuggestions(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(event.target)
    ) {
      setDisplaySuggestions(false);
    }
  };

  return (
    <div className="input_box">
      <input
        className="user-input"
        type="text"
        onChange={onChange}
        value={inputValue}
        ref={searchContainer}
      />
      <SuggestionsList
        inputValue={inputValue}
        selectedSuggestion={selectedSuggestion}
        onSelectSuggestion={onSelectSuggestion}
        displaySuggestions={displaySuggestions}
        suggestions={filteredSuggestions}
      />
    </div>
  );
};

export default Autocomplete;
