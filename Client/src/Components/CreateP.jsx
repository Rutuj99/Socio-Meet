import React, { useState } from "react";
import { Avatar, Button, Tooltip } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function CreateP() {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const toast = useToast();

  let data = JSON.parse(localStorage.getItem("UserData"));

  const [input1, setInput1] = useState("");
  const [isError, setError] = useState(false);
  const [input2, setInput2] = useState("");
  const [isError2, setError2] = useState(false);
  const [prog, setProg] = useState(false);

  function handleInputChange1(e) {
    setError(false);
    setInput1(e.target.value);
  }

  function handleInputChange2(e) {
    setError2(false);
    setInput2(e.target.value);
  }

  function handleClear() {
    setError(false);
    setError2(false);
    setInput1("");
    setInput2("");
    setProg(false);
  }

  let UserData = JSON.parse(localStorage.getItem("UserData"));

  function handleClick() {
    if (input1.length < 5) {
      setError(true);
    }

    if (input2.length < 10) {
      setError2(true);
      return;
    }

    axios
      .post("http://localhost:3002/post", {
        userId: UserData._id,
        firstName: UserData.firstName,
        lastName: UserData.lastName,
        caption: input1,
        post: input2,
      })
      .then((res) => {
        setProg(true);

        setTimeout(() => {
          onClose1();
          setProg(false);
          setError(false);
          setError2(false);
          setInput1("");
          setInput2("");
          setProg(false);
          toast({
            title: "Post Created Successfully.",
            position: "top",
            status: "success",
            duration: 2000,
            isClosable: true,
            mt:"20px"
          });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Post-Main">
      <div className="Post-one">
        <Avatar name={`${data.firstName} ${data.lastName}`} />
        <h1>What's on your mind...?</h1>
      </div>

      <div className="Post-two">
        <h1>Create Post</h1>
        <Tooltip label="Click to create post" placement="top">
          <Button onClick={onOpen1}>+</Button>
        </Tooltip>
      </div>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen1}
        onClose={onClose1}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError} mb="20px">
              <FormLabel>Title</FormLabel>
              <Input type="text" value={input1} onChange={handleInputChange1} />
              {isError && (
                <FormHelperText>Title is required Min 5 letters</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={isError2}>
              <FormLabel>Content</FormLabel>
              <Textarea
                type="text"
                value={input2}
                onChange={handleInputChange2}
              />
              {isError2 && (
                <FormHelperText>
                  Content is required Min l0 letters{" "}
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleClick}>
              Post
            </Button>
            <Button onClick={onClose1}>Cancel</Button>
          </ModalFooter>
          {prog && <Progress size="xs" isIndeterminate />}

          <Button onClick={handleClear}>Clear Input Data</Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
