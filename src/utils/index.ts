import { COLUMNS, ROWS } from './constants'

export interface Grid {
  [key: string]: boolean[]
}

export const getCells = (num: number): Grid => {
  const arr = new Array(num).fill(false)
  let ob: any = { ...arr }
  Object.keys(ob).forEach(item => {
    ob[item] = [...arr]
  })

  return ob
}

export const getCellPosition = (grid: Grid, column: number, row: number): number => {
  return row * Object.keys(grid).length + (+column + 1)
}

export const removeCellByPosition = (
  grid: Grid,
  columns: number,
  rows: number,
  position: number
): Grid => {
  const c = (position - 1) % columns
  const r = Math.ceil(position / columns)

  grid[c][r - 1] = false

  return grid
}

export const addCellByPosition = (
  grid: Grid,
  columns: number,
  rows: number,
  position: number
): Grid => {
  const c = (position - 1) % columns
  const r = Math.ceil(position / columns)
  grid[c][r - 1] = true

  return grid
}

export const getLiveNeighbours = (grid: Grid, column: number, row: number): number => {
  let liveCellNeighbours = 0

  if (grid?.[column]?.[row - 1]) {
    liveCellNeighbours += 1
  }
  if (grid?.[column]?.[row + 1]) {
    liveCellNeighbours += 1
  }
  if (grid?.[+column + 1]?.[row]) {
    liveCellNeighbours += 1
  }
  if (grid?.[+column + 1]?.[row - 1]) {
    liveCellNeighbours += 1
  }
  if (grid?.[+column + 1]?.[row + 1]) {
    liveCellNeighbours += 1
  }

  if (grid?.[+column - 1]?.[row]) {
    liveCellNeighbours += 1
  }
  if (grid?.[+column - 1]?.[row - 1]) {
    liveCellNeighbours += 1
  }
  if (grid?.[+column - 1]?.[row + 1]) {
    liveCellNeighbours += 1
  }

  return liveCellNeighbours
}

export const transformGrid = (grid: Grid): Grid => {
  let itemsToDie: any[] = []
  let itemsToLive: any[] = []
  let newGrid: Grid = Object.assign({}, grid)

  Object.keys(newGrid).forEach(column => {
    newGrid[column].forEach((cell: any, rowIndex: any) => {
      if (cell) {
        let liveNeighbours = getLiveNeighbours(newGrid, column as any, rowIndex)
        if (liveNeighbours < 2) {
          let cellPos = getCellPosition(newGrid, column as any, rowIndex)
          itemsToDie = [...itemsToDie, cellPos]
        } else if (liveNeighbours === 2 || liveNeighbours === 3) {
          let cellPos = getCellPosition(newGrid, column as any, rowIndex)
          itemsToLive = [...itemsToLive, cellPos]
        } else if (liveNeighbours > 3) {
          let cellPos = getCellPosition(newGrid, column as any, rowIndex)
          itemsToDie = [...itemsToDie, cellPos]
        }
      } else {
        let liveNeighbours = getLiveNeighbours(newGrid, column as any, rowIndex)
        if (liveNeighbours === 3) {
          let cellPos = getCellPosition(newGrid, column as any, rowIndex)
          itemsToLive = [...itemsToLive, cellPos]
        }
      }
    })
  })

  itemsToDie.forEach(itemPosition => {
    const removedGrid = removeCellByPosition(newGrid, COLUMNS, ROWS, itemPosition)
    newGrid = { ...removedGrid }
  })

  itemsToLive.forEach(itemPosition => {
    const removedGrid = addCellByPosition(newGrid, COLUMNS, ROWS, itemPosition)
    newGrid = { ...removedGrid }
  })

  return newGrid
}

export const randomizeGrid = (grid: Grid): Grid => {
  let randomGrid: Grid = {}

  Object.keys(grid).forEach(item => {
    randomGrid[item] = grid[item].map(() => Math.random() >= 0.8)
  })
  return randomGrid
}
