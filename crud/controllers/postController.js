import Post from "../models/Post";

export const getAllPosts = async(req, res) => {
    let posts;

    try {
        posts = await Post.find();
    } catch (error) {
        return new Error(error);
    }

    if(!posts){
        return res.status(500).json({message: "Server Error"})
    }
    return res.status(200).json({posts})
}

export const addPost = async (req, res) => {
    const {title, content, featured} = req.body;

    let post;
    try {
        post = new Post({title, content, featured})
        post = await post.save();
    } catch (error) {
        return new Error(error)
    }
    if(!post){
        return res.status(500).json({message: "Internal Server Error"})
    }
    return res.status(201).json({post})

}

export const updatePost = async(req, res) => {
    const id = req.query.id;
const {title, content, featured} = req.body;
    let post;
    try {
        post = await Post.findByIdAndUpdate(id,{
            title, content, featured
        })
        post = await post.save();
    } catch (error) {
        return new Error(error)

    }

    if(!post){
        return res.status(500).json({message: "Server Error"})
    }
    return res.status(200).json({message: "Succesfully Updated"})
}

export const deletePost = async (req, res) => {
    const id = req.query.id;
    let post;

    try {
        post = await Post.findByIdAndRemove(id);
    } catch (error) {
        return new Error(error)
    }

    if(!post){
        return res.status(500).json({message: "Unable to delete"})
    }
    return res.status(200).json({message: "Successfully Deleted"})
}

export const getPostById = async(req, res) => {
    const id = req.query.id;

    let post;

    try {
        post = await Post.findById(id);
    } catch (error) {
        return new Error(error)

    }

    if(!post){
        return res.status(404).json({message: "No post found"})
    }

    return res.status(200).json({post})
}