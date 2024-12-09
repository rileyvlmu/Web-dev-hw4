import React, { useState } from 'react';

export default function SearchService({ setter }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null); // Error state for input validation

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError(null); // Clear any previous error on new input
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() === '') { // Basic validation check
        setError('Ingredient cannot be empty.');
        return;
      }
      setter(inputValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter an ingredient"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {error && <p className="error">{error}</p>} {/* Display error message */}
    </div>
  );
}