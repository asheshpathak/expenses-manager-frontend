import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import "./App.css";
import { TableComponent } from "./Components/Table/TableComponent";
import { ModalFunction } from "./Components/Modal/ModalComponent";
import axios from "axios";

function App() {
  const [requestObject, setRequestObject] = useState({
    expenseName: "",
    expenseAmount: 0,
    expenseTag: "",
    expenseDate: "",
    expensePaymentMode: "",
  });

  const [responseData, setResponseData] = useState([]);

  const [isDisabled, setIsDisabled] = useState(true);

  const [totalAmount, setTotalAmount] = useState(0);

  let allExpenses;

  function convertDateFormat(dateString: string) {
    // Split the date string by "T"
    var parts = dateString.split("T");

    // Extract date and time parts
    var datePart = parts[0];
    var timePart = parts[1];

    // Extract hours, minutes, and seconds from time part
    var timeParts = timePart.split(":");
    var hours = timeParts[0];
    var minutes = timeParts[1];

    // Get the current seconds
    var d = new Date();
    var seconds = d.getSeconds();

    // Return the formatted date string
    return datePart + " " + hours + ":" + minutes + ":" + seconds;
  }

  const addANewExpense = async () => {
    if (requestObject) {
      axios
        .post(
          "http://localhost:8080/add/expense",
          {
            expenseName: requestObject.expenseName,
            date: convertDateFormat(requestObject.expenseDate),
            tag: requestObject.expenseTag,
            paymentMode: requestObject.expensePaymentMode,
            amount: requestObject.expenseAmount,
          },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token",
            },
          }
        )
        .then((response) => {
          console.log(response);
          fetchAllExpenses();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveDataAndCloseModal = async (close: Function) => {
    close();
    await addANewExpense();
  };

  const fetchAllExpenses = () => {
    axios
      .get("http://localhost:8080/expenses")
      .then((res) => {
        setResponseData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateTotalExpenditure = () => {
    let amount = 0;
    responseData.forEach((element: any) => {
      amount += parseInt(element.amount);
    });
    setTotalAmount(amount);
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  useEffect(() => {
    calculateTotalExpenditure();
  }, [responseData]);

  return (
    <ChakraProvider>
      <Box w="100%" overflow="hidden">
        <Box
          p={2}
          m={2}
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <HStack>
            <Heading as="h3" size="lg">
              Expenses Tracker
            </Heading>
            <ModalFunction
              requestObject={requestObject}
              setRequestObject={setRequestObject}
              addANewExpense={addANewExpense}
              saveDataAndCloseModal={saveDataAndCloseModal}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />
          </HStack>
          <Box
            p={2}
            w="100%"
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
                    <StatLabel>Total Expenditure</StatLabel>
                    <StatNumber>{totalAmount}</StatNumber>
                    {/* <StatHelpText>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText> */}
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
          <TableComponent
            requestObject={requestObject}
            setRequestObject={setRequestObject}
            responseData={responseData}
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
