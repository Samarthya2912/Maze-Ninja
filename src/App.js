/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import './App.css';

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.weight = Infinity;
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
  }

  display() {
    this.weightArray[5][5] = 44;
    for (let i = 0; i < this.rows; i++) {
      console.log(this.weightArray[i]);
    }
  }
};


function App() {
  const mygraph = new Graph(20, 20);
  const traversal_speed = 300;

  let isMouseDown = false;

  const cellClickHandler = (i, j) => {

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

  const traverse = (traversal_array) => { // [i, j]
    let i = 0;

    const interval = setInterval(() => {
      if(i === traversal_array.length) {
        clearInterval(interval);
      } else {
        document.getElementById(`cell_${traversal_array[i][0]}_${traversal_array[i][1]}`).style.backgroundColor = "yellow";
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

  useEffect(() => {
    const traversal_array = [[0,0],[1,2],[3,4]]
    traverse(traversal_array);
  }, [])

  return (
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
    </div>
  );
}

export default App;
