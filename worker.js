self.onmessage = (event) => {
    const grid = event.data;

    const nextGrid = grid.map((arr) => [...arr]);
    const _COLUMNS = grid.length;
    const _ROWS = grid[0].length;

    for (let col = 0; col < _COLUMNS; col++) {
        for (let row = 0; row < _ROWS; row++) {
            const cell = grid[col][row];
            let numNeighbors = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }

                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < _COLUMNS && y_cell < _ROWS) {
                        numNeighbors += grid[x_cell][y_cell];
                    }
                }
            }

            if (cell === 1 && numNeighbors < 2) {
                nextGrid[col][row] = 0;
            } else if (cell === 1 && numNeighbors > 3) {
                nextGrid[col][row] = 0;
            } else if (cell === 0 && numNeighbors === 3) {
                nextGrid[col][row] = 1;
            }
        }
    }

    self.postMessage(nextGrid);
};