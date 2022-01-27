import * as React from 'react'
import { Box, Button, Flex, SimpleGrid, useColorMode } from '@chakra-ui/react'
import { COLUMNS } from '../utils/constants'
import useGame from '../hooks/useGame'

export default function MainGrid() {
  const { colorMode } = useColorMode()
  const { grid, isRunning, setIsRunning, steps, initialize, randomize, handleCell, handleNext } =
    useGame()

  return (
    <div>
      <Box mb="2rem">
        <Box
          as="h1"
          fontFamily="Teko"
          fontSize="4.5rem"
          textShadow={colorMode === 'light' ? '8px 8px #9a9a9a' : '8px 8px #000000'}
          letterSpacing="3px"
          color={colorMode === 'light' ? 'gray.800' : 'inherit'}
        >
          GAME OF LIFE
        </Box>
      </Box>

      <SimpleGrid gridTemplateColumns="1fr 5fr 1fr" mb="2rem">
        {isRunning ? (
          <Button onClick={() => setIsRunning(false)}>stop</Button>
        ) : (
          <Button onClick={() => setIsRunning(true)}>start</Button>
        )}

        <Flex gridGap="1rem" justifyContent="center">
          <Button onClick={handleNext}>next</Button>
          <Button onClick={initialize}>reset</Button>
          <Button onClick={randomize}>randomize</Button>
        </Flex>

        <Box>Step: {steps}</Box>
      </SimpleGrid>
      <SimpleGrid
        data-testid="grid-wrapper"
        gridTemplateColumns={`repeat(${COLUMNS}, 20px)`}
        gridGap="2px"
        mb="4rem"
      >
        {grid &&
          Object.keys(grid).map((column, index) => (
            <SimpleGrid key={index} className="column" data-testid="column" gridGap="2px">
              {grid[column].map((cell: boolean, rowIndex: number) => (
                <Box
                  onClick={() => handleCell(+column, rowIndex, cell)}
                  key={rowIndex}
                  data-testid="cell"
                  width="20px"
                  height="20px"
                  backgroundColor={cell ? 'black' : 'gray.300'}
                  cursor="pointer"
                />
              ))}
            </SimpleGrid>
          ))}
      </SimpleGrid>
    </div>
  )
}
