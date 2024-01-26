import { useState } from "react";
import "./App.css";

const getGridTiles = (row, col) => {
  const tiles = [];
  for (let i = 0; i < row; i++) {
    tiles.push([]);
    for (let j = 0; j < col; j++) {
      tiles[i].push([]);
    }
  }
  return tiles;
};
export default function App() {
  const [selectedIds, setSelectedIds] = useState({
    row_id: null,
    col_id: null,
  });
  const gridTiles = getGridTiles(3, 3);
  // console.log(gridTiles);

  function addTiles(event) {
    console.log(event.target?.dataset);
    setSelectedIds((prev) => {
      return {
        row_id: event.target.dataset.rowid ?? prev.row_id,
        col_id: event.target.dataset.colid ?? prev.col_id,
      };
    });
  }

  function handleMouseEnter(event) {
    console.log("called from mouse");
    setSelectedIds((prev) => {
      return {
        row_id: event.target.dataset?.rowid ?? prev.row_id,
        col_id: event.target.dataset?.colid ?? prev.col_id,
      };
    });
  }

  console.log("sadfsdfsadfsa", selectedIds);
  function handleMouseLeave() {
    console.log("called");
    setSelectedIds(() => {
      return {
        row_id: null,
        col_id: null,
      };
    });
  }

  return (
    <div className="App">
      <div className="selector">
        {Array.isArray(gridTiles) &&
          gridTiles?.map((row, idx) => (
            <div className={`selector-row`} key={idx}>
              {row.map((_, col_idx) => (
                <div
                  className={`Idbox ${
                    selectedIds?.col_id !== null &&
                    col_idx <= Number(selectedIds?.col_id) &&
                    selectedIds?.row_id !== null &&
                    idx <= Number(selectedIds?.row_id)
                      ? "selected-col"
                      : ""
                  } ?`}
                  key={col_idx}
                  data-rowid={idx}
                  data-colid={col_idx}
                  onClick={addTiles}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                ></div>
              ))}
            </div>
          ))}
      </div>
      <div className="show"></div>
    </div>
  );
}
