import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  Divider,
} from "@chakra-ui/react";
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
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Progress,
} from "@chakra-ui/react";
import { BiLike, BiShare, BiChat, BiEdit } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import "../Styles/styles.css";
import axios from "axios";
import NotLogin from "./NotLogin";
import { useDisclosure } from "@chakra-ui/react";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function UserPosts() {
  let [data, setData] = useState([]);
  let data1 = JSON.parse(localStorage.getItem("UserData"));

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const toast = useToast();

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
            title: "Post Updated Successfully.",
            position: "top",
            status: "success",
            duration: 2000,
            isClosable: true,
            mt: "20px",
          });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3002/post/getUserPosts/${data1._id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, []);

  if (!data1) {
    return <NotLogin />;
  }

  function deletePost(postId) {
    toast({
      title: "Post Deleted Successfully.",
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
      mt: "20px",
    });

    axios
      .get(`http://localhost:3002/post/deletePost/${postId}`)
      .then(() => {
        setData((prevData) => prevData.filter((elem) => elem._id !== postId));
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  if (data.length == 0) {
    return (
      <Stack className="No-Post">
        <h1>No Post Found</h1>
        <Skeleton endColor="rgb(134, 216, 208)" height="10px" />
        <Skeleton endColor="rgb(134, 216, 208)" height="10px" />
        <Skeleton endColor="rgb(134, 216, 208)" height="10px" />
      </Stack>
    );
  }

  return data.map((elem) => {
    const updatedAt = elem.updatedAt ? new Date(elem.updatedAt) : null;

    if (updatedAt && !isNaN(updatedAt)) {
      var datePart = updatedAt.toLocaleDateString();
      var timePart = updatedAt.toLocaleTimeString();
    } else {
      console.error("Invalid or missing updatedAt value:", elem.updatedAt);
    }

    return (
      <Card mb="20px" maxW={{ width: "100%" }} className="Main-Card">
        <CardHeader ml="10px" mr="10px">
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={`${elem.firstName} ${elem.lastName}`} />

              <Box>
                <Heading size="sm">{`${elem.firstName} ${elem.lastName}`}</Heading>
                <Text>{`${datePart} at ${timePart}`}</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody
          style={{
            textAlign: "justify",
            backgroundColor: "rgb(134, 216, 208)",
          }}
          className="Box-Content"
        >
          <Text className="Text-Content">{elem.caption} </Text>
        </CardBody>
        <CardBody style={{ textAlign: "justify" }} className="Box-Content">
          <Text className="Text-Content1">{elem.post}</Text>
        </CardBody>

        <CardFooter className="Buttons-UserPosts">
          <Button variant="ghost" leftIcon={<BiEdit />} onClick={onOpen1}>
            Edit
          </Button>

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
                  <Input
                    type="text"
                    value={input1}
                    onChange={handleInputChange1}
                  />
                  {isError && (
                    <FormHelperText>
                      Title is required Min 5 letters
                    </FormHelperText>
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

          <Button
            variant="ghost"
            leftIcon={<MdDeleteOutline />}
            onClick={() => {
              deletePost(elem._id);
            }}
          >
            Delete
          </Button>

          <Button variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button variant="ghost" leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
      </Card>
    );
  });
}
