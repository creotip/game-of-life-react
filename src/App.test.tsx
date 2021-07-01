import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'
import { COLUMNS, ROWS } from './utils/constants'
import {
  addCellByPosition,
  getCellPosition,
  getCells,
  getLiveNeighbours,
  Grid,
  randomizeGrid,
  removeCellByPosition,
  transformGrid,
} from './utils'

describe('<App />', () => {
  render(<App />)
  it('renders ui elements', () => {
    const startButton = screen.getByText('start')
    const nextButton = screen.getByText('next')
    const resetButton = screen.getByText('start')
    const randomizeButton = screen.getByText('reset')

    const columns = screen.queryAllByTestId('column')
    const cells = screen.queryAllByTestId('cell')

    expect(startButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(randomizeButton).toBeInTheDocument()
    expect(columns).toHaveLength(COLUMNS)
    expect(cells).toHaveLength(COLUMNS * COLUMNS)
  })
})

describe('test util functions', () => {
  const grid: Grid = getCells(COLUMNS)

  it('getCells', function () {
    expect(Object.keys(grid)).toHaveLength(COLUMNS)
    Object.keys(grid).forEach(index => {
      expect(grid[index]).toHaveLength(ROWS)
    })
  })

  it('getCellPosition', function () {
    const cellPos = getCellPosition(grid, 4, 2)
    expect(cellPos).toEqual(105)
  })

  it('removeCellByPosition', function () {
    grid[0][1] = true
    expect(grid[0][1]).toBeTruthy()
    const removedGrid = removeCellByPosition(grid, COLUMNS, ROWS, 51)
    expect(removedGrid[0][1]).toBeFalsy()
  })

  it('addCellByPosition', function () {
    grid[0][1] = false
    expect(grid[0][1]).toBeFalsy()
    const removedGrid = addCellByPosition(grid, COLUMNS, ROWS, 51)
    expect(removedGrid[0][1]).toBeTruthy()
  })

  it('getLiveNeighbours', function () {
    const newGrid: Grid = getCells(COLUMNS)

    newGrid[0][1] = true
    newGrid[0][2] = true
    newGrid[0][3] = true
    newGrid[1][2] = true
    newGrid[2][2] = true
    newGrid[3][3] = true

    let itemsToDie: any[] = []
    let itemsToLive: any[] = []

    Object.keys(newGrid).forEach((column, idx) => {
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

    expect(itemsToDie).toHaveLength(2)
    expect(itemsToLive).toHaveLength(5)
  })

  it('transformGrid', function () {
    const newGrid: Grid = getCells(COLUMNS)

    newGrid[0][0] = true
    newGrid[0][1] = true
    newGrid[0][2] = true
    newGrid[1][1] = true

    const nextGrid = transformGrid(newGrid)
    expect(
      nextGrid[0][0] &&
        nextGrid[0][1] &&
        nextGrid[0][2] &&
        nextGrid[1][0] &&
        nextGrid[1][1] &&
        nextGrid[1][2]
    ).toBeTruthy()
  })

  it('randomizeGrid', function () {
    const newGrid: Grid = getCells(COLUMNS)
    const randGrid = randomizeGrid(newGrid)

    let liveCells = 0

    Object.keys(randGrid).forEach(col => {
      randGrid[col].forEach((cell, rowIndex) => {
        if (cell) {
          liveCells = liveCells + 1
        }
      })
    })
    expect(liveCells).toBeGreaterThan(400)
  })
})
