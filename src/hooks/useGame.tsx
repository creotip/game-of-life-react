import { useCallback, useEffect, useState } from 'react'
import { getCellPosition, getCells, Grid, randomizeGrid, transformGrid } from '../utils'
import { COLUMNS, INTERVAL } from '../utils/constants'
import useInterval from 'use-interval'

const useGame = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [steps, setSteps] = useState<number>(0)
  const [grid, setGrid] = useState<Grid>({})
  const [liveCellsPos, setLiveCellsPos] = useState<number[]>([])

  useEffect(() => {
    initialize()
  }, [])

  useInterval(
    () => {
      handleNext()
    },
    isRunning ? INTERVAL : null
  )

  const initialize = useCallback(() => {
    setSteps(0)
    const cells = getCells(COLUMNS)

    cells[24][14] = true
    cells[25][13] = true
    cells[25][14] = true
    cells[25][15] = true
    cells[26][14] = true
    setGrid(cells)
  }, [])

  const handleNext = useCallback(() => {
    const nextGrid = transformGrid(grid)
    setGrid(nextGrid)
    setSteps(steps + 1)
  }, [grid, steps])

  const handleCell = useCallback((column: number, rowIndex: number, cell: boolean) => {
    const currentCell = !cell

    let newOb: any = { ...grid }
    newOb[column][rowIndex] = currentCell

    let cellPos = getCellPosition(grid, column, rowIndex)

    if (currentCell) {
      setLiveCellsPos([...liveCellsPos, cellPos])
    } else {
      let liveCellsToUpdate = [...liveCellsPos]
      const cellIndex = liveCellsToUpdate.indexOf(cellPos)
      if (cellIndex > -1) {
        liveCellsToUpdate.splice(cellIndex, 1)
      }

      setLiveCellsPos(liveCellsToUpdate)
    }
    setGrid(newOb)
  }, [grid, liveCellsPos])

  const randomize = useCallback(() => {
    setGrid(randomizeGrid(grid))
  }, [grid])

  return {
    grid,
    isRunning,
    steps,
    initialize,
    setIsRunning,
    randomize,
    handleCell,
    handleNext,
  }
}

export default useGame
