import { Error } from "mongoose";
import Post from "../Modules/Post.Module.js";

export async function addPost(data) {
  try {
    let value = await Post.create(data);
    console.log(value);
    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function userPost(data) {
  try {
    let value = await Post.find({
      userId: data,
    }).sort({ createdAt: -1 });

    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function deletePost(data) {
  try {
    let value = await Post.deleteOne({
      _id: data,
    });

    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function updatePost(data) {
  try {
    await Post.updateOne(
      { _id: data.id },
      { caption: data.caption, post: data.post }
    );
    let value = await Post.find({ userId: data.userId }).sort({
      createdAt: -1,
    });
    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function allPost() {
  try {
    const value = await Post.find().sort({ createdAt: -1 });
    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function AddComment(data) {
  try {
    const value = await Post.updateOne(
      { _id: data.PostId },
      {
        $push: {
          comment: {
            fName: data.fName,
            lName: data.lName,
            comment: data.comment,
          },
        },
      }
    );

    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
