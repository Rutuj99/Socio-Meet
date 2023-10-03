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
      userId: data.ID,
    });

    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

export async function allPost() {
  try {
    let value = await Post.find();
    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
