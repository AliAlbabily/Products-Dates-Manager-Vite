import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [rows, setRows] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sort order is ascending
  const [editCell, setEditCell] = useState(null); // Tracks which cell is being edited

  useEffect(() => {
    // Load initial rows from localStorage or use default values if none exist
    const savedRows = localStorage.getItem('rows')
    setRows(savedRows ? JSON.parse(savedRows) : [])
  }, []);

  // Function to add a new row
  const addNewRow = () => {
    const newRow = [`Row ${rows.length + 1}, Col 1`, `Row ${rows.length + 1}, Col 2`, `Row ${rows.length + 1}, Col 3`, "Plats-x", "X"];
    setRows([...rows, newRow])
    // Update localStorage
    localStorage.setItem('rows', JSON.stringify([...rows, newRow]))
  };

  // Function to delete a row by index and update localStorage
  const deleteRow = (indexToDelete) => {
    const isConfirmed = confirm("Är du säker att du vill ta bort raden?")
    if (isConfirmed) {
      const updatedRows = rows.filter((_, index) => index !== indexToDelete);
      setRows(updatedRows)
      // Update localStorage
      localStorage.setItem('rows', JSON.stringify(updatedRows))
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

  // Function to handle cell double-click and enter editing mode
  const handleDoubleClick = (rowIndex, colIndex) => {
    setEditCell({ row: rowIndex, col: colIndex })
  };

  // Function to handle editing value change
  const handleEditChange = (e, rowIndex, colIndex) => {
    const newValue = e.target.value
    const updatedRows = [...rows]
    updatedRows[rowIndex][colIndex] = newValue;
    setRows(updatedRows)
  };

  // Function to handle finishing editing on blur or Enter key
  const finishEditing = () => {
    setEditCell(null)
    // Update localStorage
    localStorage.setItem('rows', JSON.stringify(rows))
  };

  return (
    <div className="main">
      <button className="button" onClick={addNewRow}>Ny Rad</button>
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
            <th>Radera</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                colIndex < 4 ? ( // Ensure all columns except "Radera" column are editable
                  <td
                    key={colIndex}
                    onDoubleClick={() => handleDoubleClick(rowIndex, colIndex)}
                  >
                    {editCell && editCell.row === rowIndex && editCell.col === colIndex ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleEditChange(e, rowIndex, colIndex)}
                        onBlur={finishEditing}
                        onKeyDown={(e) => e.key === 'Enter' && finishEditing()}
                        maxLength={25}
                        autoFocus
                      />
                    ) : (
                      cell
                    )}
                  </td>
                ) : (
                  <td key={colIndex}>
                    <button className="deleteButton" onClick={() => deleteRow(rowIndex)}>
                      Delete
                    </button>
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
