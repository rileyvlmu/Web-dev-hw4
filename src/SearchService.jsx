import React, { useState } from "react";

export default function SearchService({ setter }) {
    return (
        <input
            type="text"
            onChange={(e) => setter(e.target.value)}
            placeholder="Search for a nutrient..."
        />
    );
}