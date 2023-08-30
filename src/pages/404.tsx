import { Box, Flex, Text } from '@chakra-ui/react'

export default function Custom404() {
  return (
    <Flex height="auto" alignItems="center" justifyContent="center">
      <Box p={5} shadow="md" borderWidth="0px">
        <Text fontSize="lg" fontWeight="bold">
          404 - Page Not Found
        </Text>
      </Box>
    </Flex>
  )
}
