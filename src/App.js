import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import "./App.css";
import { TableComponent } from "./Components/Table/TableComponent";
import { InitialFocus } from "./Components/Modal/ModalComponent";

function App() {
  return (
    <ChakraProvider>
      <Box w="100%" overflow="hidden">
        <Box
          p={2}
          m={2}
          w="750px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <HStack>
            <Heading as="h3" size="lg">
              Expenses Tracker
            </Heading>
            {InitialFocus()}
          </HStack>
          <Box
            p={2}
            w="700px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <HStack>
              <Box
                w="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <StatGroup>
                  <Stat>
                    <StatLabel>Monthly Budget</StatLabel>
                    <StatNumber>345,670</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Box>
              <Box
                w="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <StatGroup>
                  <Stat>
                    <StatLabel>Spent</StatLabel>
                    <StatNumber>345,670</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Box>
              <Box
                w="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <StatGroup>
                  <Stat>
                    <StatLabel>Sent</StatLabel>
                    <StatNumber>345,670</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </Box>
            </HStack>
          </Box>
          <TableComponent />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
