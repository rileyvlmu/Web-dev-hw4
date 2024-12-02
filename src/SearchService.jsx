import React from 'react';

export default function SearchService({ setter }) {
    const handleChange = (e) => {
        setter(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Enter a nutrient"
            onChange={handleChange}
        />
    );
}