import React, { useEffect, useState } from "react";

function LegalRights() {
  const [rights, setRights] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null); // Track which category is open

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/rights`)
      .then((res) => res.json())
      .then((data) => setRights(data))
      .catch((err) => console.error("Error fetching rights:", err));
  }, []);

  // Filter rights based on search term
  const filteredRights = rights.filter(
    (right) =>
      right.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      right.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      right.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group rights by category
  const categories = [...new Set(filteredRights.map((r) => r.category))];

  // 🔹 Auto-expand when searching, collapse back when search is cleared
  useEffect(() => {
    if (searchTerm) {
      setExpandedCategory("ALL"); // open everything during search
    } else {
      setExpandedCategory(null); // reset when cleared
    }
  }, [searchTerm]);

  return (
    <div className="legal-rights-container">
      <h2>Legal Rights</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search rights..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Categories */}
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category} className="category-section">
            <h3
              className="category-heading"
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category ? null : category
                )
              }
              style={{ cursor: "pointer" }}
            >
              📂 {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>

            {/* Expand/collapse rights under category */}
            {(expandedCategory === category || expandedCategory === "ALL") && (
              <div className="rights-list">
                {filteredRights
                  .filter((right) => right.category === category)
                  .map((right, index) => (
                    <div key={index} className="right-card">
                      <h4>{right.title}</h4>
                      <p>{right.description}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No matching rights found.</p>
      )}
    </div>
  );
}

export default LegalRights;