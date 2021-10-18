/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import './App.css';

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.weight = 1;
    this.isWall = false;
  }
};

class Graph {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.weightArray = [];

    for (let i = 0; i < rows; i++) {
      this.weightArray.push([]);
      for (let j = 0; j < columns; j++) {
        this.weightArray[i].push(1);
      }
    }

    /* testing walls */
    // for(let i = 0; i < rows; i++) this.weightArray[i][5] = Infinity;
  }

  hashIt(i, j) {
    return `cell_${i}_${j}`;
  }

  isValid(i, j) {
    return (i >= 0) && (i < this.rows) && (j >= 0) && (j < this.columns);
  }

  display() {
    this.weightArray[5][5] = 44;
    for (let i = 0; i < this.rows; i++) {
      console.log(this.weightArray[i]);
    }
  }

  dfs_helper(start_i, start_j, visited_cells) {
    const d = [[1,0],[-1,0],[0,1],[0,-1]];
    visited_cells.push(this.hashIt(start_i, start_j));
  
    d.forEach(d_ => {
      let next_cell_i = start_i + d_[0]; 
      let next_cell_j = start_j + d_[1];
      if(!visited_cells.includes(this.hashIt(next_cell_i, next_cell_j)) && this.isValid(next_cell_i,next_cell_j) && this.weightArray[next_cell_i][next_cell_j] !== Infinity) {
        this.dfs_helper(next_cell_i, next_cell_j, visited_cells);
      }
    })
  }

  dfs(start_i, start_j, end_i, end_j) {
    const visited_cells = [];
    const path = []; 
    this.dfs_helper(start_i, start_j, visited_cells);
    return visited_cells;
    // console.log(visited_cells);
  }
};


function App() {
  const mygraph = new Graph(15, 30);
  const traversal_speed = 10;

  let isMouseDown = false;

  const cellClickHandler = (i, j) => {
    // not required
  }
  
  const cellMouseDownHandler = (i, j) => {
    if(mygraph.weightArray[i][j] === 1) {
       document.getElementById(`cell_${i}_${j}`).style.backgroundColor = "black";
       mygraph.weightArray[i][j] = Infinity;
       mygraph.display();
    } else {
     document.getElementById(`cell_${i}_${j}`).style.backgroundColor = "white";
     mygraph.weightArray[i][j] = 1;
     mygraph.display();
    }

    isMouseDown = true;
  }

  const traverse = (traversal_array, color) => { // [i, j]
    let i = 0;

    const interval = setInterval(() => {
      if(i === traversal_array.length) {
        clearInterval(interval);
      } else {
        document.getElementById(traversal_array[i]).style.backgroundColor = color;
        i++;
      }
    }, traversal_speed);
  }

  const cellMouseUpHandler = (i, j) => {
    isMouseDown = false;
  }

  const cellMouseEnterHandler = (i, j) => {
    if(isMouseDown) {
      document.getElementById(`cell_${i}_${j}`).style.backgroundColor = "black";
      mygraph.weightArray[i][j] = Infinity;
      mygraph.display();
    }
  }

  // useEffect(() => {
  //   let traversal_array = mygraph.dfs(2,2);
  //   console.log(traversal_array);
  //   traverse(traversal_array, 'pink');
  // }, [])

  function start_traversal() {
    let traversal_array = mygraph.dfs(2,2);
    console.log(traversal_array);
    traverse(traversal_array, 'pink');
  }

  return (
    <>
    <div className="App">
      {
        mygraph.weightArray.map((row, row_index) => {
          return (
            <div className="row" key={row_index}>
              {
                row.map((cell, column_index) => {
                  return <div className="cell" id={`cell_${row_index}_${column_index}`} 
                  key={column_index} 
                  onClick={() => cellClickHandler(row_index, column_index)} 
                  onMouseDown={() => { cellMouseDownHandler(row_index, column_index)} }
                  onMouseUp={() => { cellMouseUpHandler(row_index, column_index) }}
                  onMouseEnter={() => { cellMouseEnterHandler(row_index, column_index) }}
                  >  
                  </div>
                })
              }
            </div>
          )
        })
      }
    <button onClick={ start_traversal }>Start traversal</button>
    </div>
    </>
  );
}

export default App;
