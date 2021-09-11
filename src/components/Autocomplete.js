import React, { useEffect, useRef, useState } from "react";
import suggestions from "../utilities/mock_data.json";
import SuggestionsList from "./SuggestionsList";
import axios from "axios";
import "../App.css";

const Autocomplete = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);

  const searchContainer = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        `https://api.github.com/users/${inputValue}`
      );
      console.log(response.data);
      setUsers(response.data);
    };
    inputValue && inputValue.length > 0 && loadUsers();
  }, [inputValue]);

  const onChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const filteredSuggestions = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredSuggestions);
    setFilteredSuggestions(filteredSuggestions);
    setDisplaySuggestions(true);
  };

  const onSelectSuggestion = (index) => {
    setSelectedSuggestion(filteredSuggestions[index]);
    setInputValue(filteredSuggestions[index].login);
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
    <div className="input_box" ref={searchContainer}>
      <input
        className="user-input"
        type="text"
        onChange={onChange}
        value={inputValue}
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
