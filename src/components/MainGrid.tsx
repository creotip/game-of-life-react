import * as React from 'react'
import { Box, Button, Flex, SimpleGrid, useColorMode } from '@chakra-ui/react'
import { COLUMNS } from '../utils/constants'
import useGame from '../hooks/useGame'

export default function MainGrid() {
  const { colorMode } = useColorMode()
  const { grid, steps, initialize, isRunning, setIsRunning, randomize, handleCell, handleNext } =
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
        <Box display="inline-block" overflow="hidden">
          <Button
            as="a"
            href="https://github.com/creotip/game-of-life-react"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Star creotip/game-of-life-react on GitHub"
            color="#24292f"
            bgColor="#ebf0f4"
            backgroundImage="linear-gradient(180deg, #f6f8fa, #ebf0f4 90%)"
            borderRadius="0.25em"
            border="1px solid #ccd1d5"
            height="30px"
            p="5px 10px"
            _hover={{
              bgColor: '#ebf0f4',
              opacity: 0.8,
            }}
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              className="octicon octicon-star"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              />
            </svg>
            &nbsp;<span>Star</span>
          </Button>
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
