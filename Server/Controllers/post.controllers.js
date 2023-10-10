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
    }).sort({ createdAt: -1 });;

    return value;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}


export async function deletePost(data){
  console.log("delete",data)
  try {
    let value = await Post.deleteOne({
       _id : data,
    })

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
