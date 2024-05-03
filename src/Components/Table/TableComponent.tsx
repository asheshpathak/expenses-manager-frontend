import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

interface Props {
  requestObject: any;
  setRequestObject: Function;
  responseData: any;
}

export const TableComponent: React.FC<Props> = ({
  requestObject,
  setRequestObject,
  responseData,
}) => {
  const convertDate = (date: string) => {
    let dateFormat = new Date(date);

    //get actual date
    let day = dateFormat.getDate().toString().padStart(2, "0");
    let month = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
    let year = dateFormat.getFullYear().toString();

    //get actual time

    let hours = dateFormat.getHours().toString().padStart(2, "0");
    let minutes = dateFormat.getMinutes().toString().padStart(2, "0");
    // let seconds = date.getSeconds().toString().padStart(2, '0');

    let dateString =
      day + "/" + month + "/" + year + ", " + hours + ":" + minutes;
    return dateString;
  };
  useEffect(() => {
    console.log(responseData);
  });
  return (
    <>
      <Box>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date & Time</Th>
                <Th>Tag</Th>
                <Th>Payment Mode</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* <Tr>
                <Td>inches</Td>
                <Td>inches</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>inches</Td>
                <Td>inches</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>inches</Td>
                <Td>inches</Td>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr> */}
              {responseData.map((data: any) => (
                <Tr key={data.id}>
                  <Td>{data.expense_name}</Td>
                  <Td>{convertDate(data.timestamp)}</Td>
                  <Td>{data.tag}</Td>
                  <Td>{data.payment_mode}</Td>
                  <Td isNumeric>{parseInt(data.amount)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
