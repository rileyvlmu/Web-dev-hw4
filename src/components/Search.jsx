import React, { useState } from 'react';

export default function SearchService({ setter }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setter(inputValue);
    }
  };

  return (
    <input
      type="text"
      placeholder="Enter an ingredient"
      value={inputValue}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}