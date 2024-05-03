import React, { useState, useEffect } from "react";
import axios from "axios";
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
interface Props {
  requestObject: any;
  setRequestObject: Function;
  addANewExpense: Function;
  saveDataAndCloseModal: Function;
  isDisabled: boolean;
  setIsDisabled: Function;
}
export const ModalFunction: React.FC<Props> = ({
  requestObject,
  setRequestObject,
  addANewExpense,
  saveDataAndCloseModal,
  isDisabled,
  setIsDisabled,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [selectedTag, setSelectedTag] = useState("Option1");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("option1");

  const onChangeHandler = (event: any) => {
    const { name, value } = event.target;
    if (name === "expenseTag") {
      setSelectedTag(value);
    }

    if (name === "expensePaymentMode") {
      setSelectedPaymentMode(value);
    }
    setRequestObject({
      ...requestObject,
      [name]: value,
    });
  };

  // Log formData after it's been updated
  useEffect(() => {
    if (
      requestObject.expenseName.length &&
      requestObject.expenseAmount.length &&
      requestObject.expenseTag.length &&
      requestObject.expenseDate.length &&
      requestObject.expensePaymentMode.length
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [requestObject]);

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
              <Input
                onChange={onChangeHandler}
                ref={initialRef}
                placeholder="Name of the expense"
                name="expenseName"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <NumberInput>
                <NumberInputField
                  name="expenseAmount"
                  onChange={onChangeHandler}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select a tag</FormLabel>
              <Select
                onChange={onChangeHandler}
                value={selectedTag}
                placeholder="Select option"
                name="expenseTag"
              >
                <option value="Food">Food</option>
                <option value="Grocery">Grocery</option>
                <option value="Utilities">Utilities</option>
                <option value="Fuel">Fuel</option>
                <option value="Cigarette">Cigartte</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select a Date & Time</FormLabel>
              <Input
                onChange={onChangeHandler}
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                name="expenseDate"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select a Payment mode</FormLabel>
              <Select
                onChange={onChangeHandler}
                value={selectedPaymentMode}
                placeholder="Select option"
                name="expensePaymentMode"
              >
                <option value="Cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="UPI">UPI</option>
                <option value="online">Online</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={isDisabled}
              onClick={() => saveDataAndCloseModal(onClose)}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
