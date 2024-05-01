import React, { useState } from "react";
import { useDisclosure, Button, Select } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
export function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {requestObject,setRequestObject} = useState({});

  return (
    <>
      <Button colorScheme="teal" variant="outline" onClick={onOpen}>
        Add an Expnese
      </Button>
      {/* <Button ml={4} ref={finalRef}>
          I'll receive focus on close
        </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder="Name of the expense" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <NumberInput>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select a tag</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Food</option>
                <option value="option2">Grocery</option>
                <option value="option3">Utilities</option>
                <option value="option3">Fuel</option>
                <option value="option3">Cigartte</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select a Date & Time</FormLabel>
              <Input
                onChange={(e) => console.log(e.target.value)}
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Payment Mode</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Cash</option>
                <option value="option2">Credit</option>
                <option value="option3">UPI</option>
                <option value="option3">Debit</option>
                <FormControl mt={4}>
                  <FormLabel>Select a tag</FormLabel>
                  <Select placeholder="Select option">
                    <option value="option1">Food</option>
                    <option value="option2">Grocery</option>
                    <option value="option3">Utilities</option>
                    <option value="option3">Fuel</option>
                    <option value="option3">Online Payment</option>
                  </Select>
                </FormControl>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
