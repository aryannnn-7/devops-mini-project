import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RightsList = () => {
  const [rights, setRights] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/rights`)
      .then(res => setRights(res.data))
      .catch(err => console.error('Error fetching rights:', err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">List of Legal Rights</h2>
      {rights.length === 0 ? (
        <p>No rights found.</p>
      ) : (
        <ul className="space-y-4">
          {rights.map((right) => (
            <li key={right._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{right.title}</h3>
              <p className="text-sm italic text-gray-500">Category: {right.category}</p>
              <p className="mt-1">{right.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RightsList;
