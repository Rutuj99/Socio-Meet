import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Avatar, Divider, Box, AbsoluteCenter } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaTwitter,
  FaEdit,
  FaLinkedin,
} from "react-icons/fa";
import AutoplaySlider from "./Advert";
import CreateP from "./CreateP";
import AllPost from "./AllPost";
import NotLogin from "./NotLogin";
import { Link } from "react-router-dom";
import "../Styles/styles.css";
import UserPosts from "./UserPosts";

export default function ProfilePage() {
  let [v, setV] = useState();
  let [v2, setV2] = useState();

  let data = JSON.parse(localStorage.getItem("UserData"));

  useEffect(() => {
    setV(Math.floor(Math.random() * 10000));
    setV2(Math.floor(Math.random() * 1000));
  }, []);

  if (!data) {
    return <NotLogin />;
  }

  return (
    <div>
      <Navbar />
      <div className="Home-Profile1">
        <div className="Profile-one">
          <div className="Profile-two">
            <Avatar name={`${data.firstName} ${data.lastName}`} />
            <h1>{`${data.firstName} ${data.lastName}`}</h1>
          </div>
          <div>
            <FaUserAlt />
          </div>
        </div>

        <hr className="line" />

        <div className="Profile-three">
          <div className="Profile-four">
            <FaMapMarkerAlt />
            <h1>{data.location}</h1>
          </div>

          <div className="Profile-five">
            <FaBriefcase />
            <h1>Mumbai,Maharashtra</h1>
          </div>
        </div>

        <hr className="line" />

        <div className="Profile-six">
          <div className="Profile-seven">
            <h1>Views of your profile</h1>
            <h1>{v}</h1>
          </div>

          <div className="Profile-eight">
            <h1>Impression of your profile</h1>
            <h1>{v2}</h1>
          </div>
        </div>

        <hr className="line" />

        <div className="Profile-nine">
          <h1 className="name-social">Social Profiles</h1>

          <div className="Profile-ten">
            <div className="Profile-eleven">
              <FaTwitter className="twitter" />
              <div>
                <h1>Twitter</h1>
                <h1>Social Network</h1>
              </div>
            </div>
            <FaEdit />
          </div>

          <div className="Profile-ten">
            <div className="Profile-eleven">
              <FaLinkedin className="twitter" />
              <div>
                <h1>LinkedIn</h1>
                <h1>Network Platform</h1>
              </div>
            </div>
            <FaEdit />
          </div>
        </div>
      </div>
      <div className="Profile-Two">
        <CreateP />
      </div>

      <h1 className="Post-Name">Posts</h1>

      <div className="Profile-Three">
        <UserPosts />
      </div>
    </div>
  );
}
