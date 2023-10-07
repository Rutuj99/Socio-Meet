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
} from "@chakra-ui/react";
import { BiLike, BiShare, BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../Styles/styles.css";
import axios from "axios";

export default function AllPost() {
  let [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/post/getAllPosts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, []);

  console.log(data);

  return data.map((elem) => {

    const updatedAt = elem.updatedAt ? new Date(elem.updatedAt) : null;

    if (updatedAt && !isNaN(updatedAt)) {
      var datePart = updatedAt.toLocaleDateString();
  var timePart = updatedAt.toLocaleTimeString();
    } else {
      console.error("Invalid or missing updatedAt value:", elem.updatedAt);
    }

    return (
      <Card mb="20px" maxW={{ width: "100%" }}  className="Main-Card">
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
          <Text className="Text-Content">{elem.caption}  </Text>
        </CardBody>
        <CardBody style={{ textAlign: "justify" }} className="Box-Content">
          <Text className="Text-Content1">
           {elem.post}
          </Text>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          marginLeft="12px"
          marginRight="12px"
          sx={{
            "& > button": {
              minW: "180px",
            },
          }}
        >
          <Button
            variant="ghost"
            leftIcon={<BiLike />}
            style={{ backgroundColor: "rgb(246, 247, 248)" }}
          >
            Like
          </Button>
          <Button
            variant="ghost"
            leftIcon={<BiChat />}
            style={{ backgroundColor: "rgb(246, 247, 248)" }}
          >
            Comment
          </Button>
          <Button
            variant="ghost"
            leftIcon={<BiShare />}
            style={{ backgroundColor: "rgb(246, 247, 248)" }}
          >
            Share
          </Button>
        </CardFooter>
      </Card>
    );
  });
}
