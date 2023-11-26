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
  Button,
  Collapse,
  Input,
  Divider,
} from "@chakra-ui/react";
import { BiLike, BiShare, BiChat } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../Styles/styles.css";
import axios from "axios";

export default function AllPost() {
  const [data, setData] = useState([]);
  const [com, setCom] = useState("");
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  let UserData = JSON.parse(localStorage.getItem("UserData"));
  const [comerror, setComErr] = useState(false);

  // var c=["sdsdsd","sdsdsdsd","sdsdsdsdsdsdsdsd"]

  useEffect(() => {
    axios
      .get("http://localhost:3002/post/getAllPosts")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }, []);

  function handleComment(postId) {
    if (openCommentPostId === postId) {
      setOpenCommentPostId(null);
    } else {
      setOpenCommentPostId(postId);
    }
  }

  function postComment(Id) {
    if (com.length === 0) {
      setComErr(true);
      return;
    }
    setComErr(false);

    axios
      .patch("http://localhost:3002/post/comment", {
        PostId: Id,
        fName: UserData.firstName,
        lName: UserData.lastName,
        comment: com,
      })
      .then((res) => {
        const updatedData = data.map((elem) => {
          if (elem._id === Id) {
            return {
              ...elem,
              comment: [
                ...elem.comment,
                {
                  fName: UserData.firstName,
                  lName: UserData.lastName,
                  comment: com,
                },
              ],
            };
          }
          return elem;
        });

        setData(updatedData);
        setCom("");

        // setOpenCommentPostId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return data.map((elem) => {
    const updatedAt = elem.updatedAt ? new Date(elem.updatedAt) : null;

    if (updatedAt && !isNaN(updatedAt)) {
      var datePart = updatedAt.toLocaleDateString();
      var timePart = updatedAt.toLocaleTimeString();
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
            cursor="no-drop"
          >
            Like
          </Button>

          <Button
          className="comment-button"
            variant="ghost"
            leftIcon={<BiChat />}
            style={{ backgroundColor: "rgb(246, 247, 248)"}}
            onClick={() => {
              handleComment(elem._id);
            }}
          >
            Comment
          </Button>

          <Button
            variant="ghost"
            leftIcon={<BiShare />}
            style={{ backgroundColor: "rgb(246, 247, 248)" }}
            cursor="no-drop"
          >
            Share
          </Button>
        </CardFooter>

        <Collapse
          in={openCommentPostId === elem._id}
          animateOpacity
          className="Collapse-Comment"
        >
          <Box p="10px">
            <div className="comment-one">
              <Input
                type="text"
                value={com}
                size="sm"
                placeholder="Enter Comment..."
                onChange={(e) => {
                  setCom(e.target.value);
                }}
              />
              <Button
                size="sm"
                onClick={() => {
                  postComment(elem._id);
                }}
              >
                Post
              </Button>
            </div>
            {comerror && (
              <h1 style={{ color: "red" }}>Comment Box Cannot be Empty</h1>
            )}

            <div>
              {elem.comment.length > 0 &&
                elem.comment.map((el, index) => (
                  <div key={index}>
                    <div className="comment-two">
                      <div>
                        <Avatar name={`${el.fName} ${el.lName}`} size="xs" />
                      </div>
                      <div>
                        <h1>{el.fName}</h1>
                        <h1>{el.comment}</h1>
                      </div>
                    </div>
                    {index !== elem.comment.length - 1 && <Divider />}
                  </div>
                ))}
            </div>
          </Box>
        </Collapse>
      </Card>
    );
  });
}
