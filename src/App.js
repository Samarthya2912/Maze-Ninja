/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import './App.css';
import Graph from './algorithms.js/dfs';

// class Cell {
//   constructor(i, j) {
//     this.i = i;
//     this.j = j;
//     this.weight = 1;
//     this.isWall = false;
//   }
// };

// class Graph {
//   constructor(rows, columns) {
//     this.rows = rows;
//     this.columns = columns;
//     this.weightArray = [];

//     for (let i = 0; i < rows; i++) {
//       this.weightArray.push([]);
//       for (let j = 0; j < columns; j++) {
//         this.weightArray[i].push(1);
//       }
//     }
//   }

//   isValid(i, j) {
//     return (i >= 0) && (i < this.rows) && (j >= 0) && (j < this.columns);
//   }

//   display() {
//     this.weightArray[5][5] = 44;
//     for (let i = 0; i < this.rows; i++) {
//       console.log(this.weightArray[i]);
//     }
//   }

//   dfs(start, end) {
    
//   }
// };


function App() {
  const mygraph = new Graph(25, 50);
  const traversal_speed = 30;

  let isMouseDown = false;
  
  const cellMouseDownHandler = (i, j) => {
       document.getElementById(`${i}_${j}`).style.backgroundColor = "black";
       mygraph.setWall(mygraph.cellId(i, j));
      //  mygraph.display();
  
    // else {
    //  document.getElementById(`cell_${i}_${j}`).style.backgroundColor = "white";
    //  mygraph.weightArray[i][j] = 1;
    //  mygraph.display();
    // }

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
      document.getElementById(`${i}_${j}`).style.backgroundColor = "black";
      mygraph.setWall(mygraph.cellId(i, j));
      // mygraph.display();
    }
  }

  // useEffect(() => {
    
  // }, [])

  const simulate = () => {
    const {visited_arr, path} = mygraph.dfs("0_0", "5_5");
    traverse(visited_arr, 'yellow');
    setTimeout(() => {
      traverse(path, 'green')
    }, visited_arr.length * traversal_speed + 100);
  }

  return (
    <div className="App">
      {
        mygraph.cell_array.map((row, row_index) => {
          return (
            <div className="row" key={row_index}>
              {
                row.map((cell, column_index) => {
                  return <div className="cell" id={`${row_index}_${column_index}`} 
                  key={column_index} 
                  // onClick={() => cellClickHandler(row_index, column_index)} 
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
      <button onClick={simulate}>Simulate</button>
    </div>
  );
}

export default App;
