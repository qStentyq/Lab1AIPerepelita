import React, { useState } from 'react';

// Define the types for the cube and the world matrix
type Cube = { x: number; y: number } | null;
type WorldMatrix = Cube[][] | null;

// Function to create an empty world matrix
function createEmptyWorldMatrix(length: number, width: number): WorldMatrix {
  const matrix: WorldMatrix = [];
  for (let i = 0; i < length; i++) {
    matrix[i] = [];
    for (let j = 0; j < width; j++) {
      matrix[i][j] = null;
    }
  }
  return matrix;
}

// Function to place blocks in the matrix
function placeBlocks(matrix: WorldMatrix, blockCount: number): WorldMatrix {
  if(matrix)
  {
  const newMatrix: WorldMatrix = matrix.map(row => [...row]);
  for (let i = 0; i < blockCount; i++) {
    const x = prompt(`Enter the x-coordinate for block ${i + 1}:`);
    const y = prompt(`Enter the y-coordinate for block ${i + 1}:`);
    if(x && y)
    {
      if (newMatrix[parseInt(x)] && newMatrix[parseInt(x)][parseInt(y)] === null) {
        newMatrix[parseInt(x)][parseInt(y)] = { x: parseInt(x), y: parseInt(y) };
      } else {
        alert(`Invalid coordinates for block ${i + 1}. Cannot place block in the air.`);
        i--;
      }
    }
    
  }
  return newMatrix;
  }
  return matrix
  
  
}

// Logging list to store actions
const loggingList: string[] = [];

// Function to grasp a block
function grasp(block: Cube, matrix: WorldMatrix): void {
  console.log(block, matrix)
  loggingList.push(`Grasped block at (${block?.x}, ${block?.y})`);
}

// Function to move a block
function move(block1: Cube, block2: Cube, getridof: boolean, matrix: WorldMatrix): void {
  if(block1 && block2 && matrix)
  {
    if (getridof) {
      loggingList.push(`Cleared the top of block at (${block2.x}, ${block2.y})`);
      matrix[block2.x][block2.y] = null;
    }
    if(matrix[block2.x][block1.y])
    {
      loggingList.push(`Block at (${block2.x}, ${block2.y}) already exists`);
      return
    }
    if(!matrix[block2.x + 1][block2.y])
    {
      loggingList.push('No block vnizu')
      return
    }
    matrix[block1.x][block1.y] = null;
    matrix[block2.x][block2.y] = block1;
    loggingList.push(`Moved block at (${block1.x}, ${block1.y}) onto block at (${block2.x}, ${block2.y})`);
  }
  
}

// Function to put a block on another block
function putOn(block1: Cube, block2: Cube, matrix: WorldMatrix): void {
  if(block1 && block2)
  {
    grasp(block1, matrix);
    if (block1.x === block2.x && block1.y === block2.y + 1) {
    move(block1, block2, true, matrix);
    } else {
    move(block1, block2, false, matrix);
    }
  }
}

const App: React.FC = () => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [worldMatrix, setWorldMatrix] = useState<WorldMatrix>([]);
  const [blockCount, setBlockCount] = useState<number>(0);
  const [block1, setBlock1] = useState<Cube | null>(null);
  const [block2, setBlock2] = useState<Cube | null>(null);

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(event.target.value));
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(event.target.value));
  };

  const handleBlockCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlockCount(parseInt(event.target.value));
  };

  const handleCreateMatrix = () => {
    setWorldMatrix(createEmptyWorldMatrix(length, width));
  };

  const handlePlaceBlocks = () => {
    setWorldMatrix(placeBlocks(worldMatrix, blockCount));
  };

  const handleBlock1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [x, y] = event.target.value.split(',').map(Number);
    setBlock1({ x, y });
  };

  const handleBlock2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [x, y] = event.target.value.split(',').map(Number);
    setBlock2({ x, y });
  };

  const handlePutOn = () => {
    if (block1 && block2 && worldMatrix) {
      const newMatrix: WorldMatrix = worldMatrix.map(row => [...row]);
      putOn(block1, block2, newMatrix);
      setWorldMatrix(newMatrix);
    }
  };

  return (
    <div>
      <h1>AI Laboratory work 1: Machine Reasoning</h1>
      <div>
        <label>
          Length:
          <input type="number" value={length} onChange={handleLengthChange} />
        </label>
        <label>
          Width:
          <input type="number" value={width} onChange={handleWidthChange} />
        </label>
        <button onClick={handleCreateMatrix}>Create Matrix</button>
      </div>
      <div>
        <label>
          Number of blocks:
          <input type="number" value={blockCount} onChange={handleBlockCountChange} />
        </label>
        <button onClick={handlePlaceBlocks}>Place Blocks</button>
      </div>
      <div>
        <label>
          Block 1 (x,y):
          <input type="text" onChange={handleBlock1Change} />
        </label>
        <label>
          Block 2 (x,y):
          <input type="text" onChange={handleBlock2Change} />
        </label>
        <button onClick={handlePutOn}>Put On</button>
      </div>
      <div>
        <h2>World Matrix</h2>
        {worldMatrix?.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cube, colIndex) => (
              <span key={`${rowIndex}-${colIndex}`}>{cube ? 'X' : '.'}&nbsp;</span>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Logging List</h2>
        <ul>
          {loggingList.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;