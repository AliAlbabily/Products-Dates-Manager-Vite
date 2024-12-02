import { useState, useEffect } from 'react';
import './App.css';

import Modal from "./Modal";

function App() {
  const [rows, setRows] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sort order is ascending
  const [isOpen, setIsOpen] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null); // Track which row is being edited

  useEffect(() => {
    // Load initial rows from localStorage or use default values if none exist
    const savedRows = localStorage.getItem('rows')
    setRows(savedRows ? JSON.parse(savedRows) : [])  
  }, []);

  // Function to add a new row
  const addNewRow = () => {
    const newRow = [`Row ${rows.length + 1}, Col 1`, `Row ${rows.length + 1}, Col 2`, `Row ${rows.length + 1}, Col 3`, "Plats-x", "X"];
    setRows([...rows, newRow])
    localStorage.setItem('rows', JSON.stringify([...rows, newRow])) // Update localStorage
  };

  // Function to delete a row by index and update localStorage
  const deleteRow = (indexToDelete) => {
    const isConfirmed = confirm("Är du säker att du vill ta bort raden?")
    if (isConfirmed) {
      const updatedRows = rows.filter((_, index) => index !== indexToDelete);
      setRows(updatedRows)
      localStorage.setItem('rows', JSON.stringify(updatedRows)) // Update localStorage
    }
  };

  // Function to toggle sorting between ascending and descending
  const sortRowsByPlace = () => {
    const sortedRows = [...rows].sort((a, b) => {
      if (a[0] < b[0]) return sortOrder === 'asc' ? -1 : 1;
      if (a[0] > b[0]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setRows(sortedRows);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  const updateRow = (index, updatedRow) => {
    const updatedRows = rows.map((row, i) => (i === index ? updatedRow : row));
    setRows(updatedRows)
    localStorage.setItem('rows', JSON.stringify(updatedRows)) // Update localStorage
  };

  // Function to handle editing
  const handleEditClick = (index) => {
    setEditingRowIndex(index)
    setIsOpen(true)
  };

  // change the background color of outdated rows
  const changeOutdatedRowBackground = (rowData, index) => {
    if (!rowData[2]) return ""; // No date in the row, no class applied

    // Parse the date in the third column (e.g., "12/2024" or "12-2024")
    const [month, year] = rowData[2].includes("/")
      ? rowData[2].split("/")
      : rowData[2].split("-");

    const rowDate = new Date(year, month - 1); // Month is 0-based in JavaScript Date
    const currentDate = new Date();
    const comparisonDate = new Date(currentDate.getFullYear(), currentDate.getMonth()); // Current month and year only

    // Compare the parsed date to the current date
    if (rowDate < comparisonDate) {
      console.log(`Row ${index} is outdated. Date: ${rowData[2]}`);
      return "outdatedRow"; // Return a CSS class for outdated rows
    }

    return ""; // Return an empty string if the row is not outdated
  }

  return (
    <div className="main">
      <button className="button btn" onClick={addNewRow}>Ny Rad</button>
      <table>
        <thead>
          <tr>
            <th onClick={sortRowsByPlace} className="sortable-column">
              Plats
              {sortOrder === 'asc' ? <i className='bx bxs-up-arrow'></i> : <i className='bx bxs-down-arrow'></i>}
            </th>
            <th>VNR</th>
            <th>Nuvarande Datum</th>
            <th>Buffert</th>
            <th>Handlingar</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={changeOutdatedRowBackground(row, index)}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>
                <button className="editButton btn" onClick={() => handleEditClick(index)}>
                  Edit
                </button>
                <button className="deleteButton btn" onClick={() => deleteRow(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && 
        <Modal 
          setIsOpen={setIsOpen} 
          rowData={rows[editingRowIndex]}
          onSave={(updatedRow) => updateRow(editingRowIndex, updatedRow)}
        />
      }
    </div>
  );
}

export default App