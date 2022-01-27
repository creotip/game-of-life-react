import * as React from 'react'
import { ChakraProvider, Box, VStack, Grid, theme, Button } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import MainGrid from './components/MainGrid'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Box>
            <MainGrid />
          </Box>
        </VStack>
      </Grid>
    </Box>
    <Box textAlign="center" my={8}>
      <Box color="gray.500">
        ©<Box as="time">{new Date().getFullYear()}</Box>{' '}
        <a href="https://creotip.io/">creotip.io</a>
      </Box>
    </Box>
  </ChakraProvider>
)
