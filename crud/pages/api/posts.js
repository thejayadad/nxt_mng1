import clientPromise from "../../lib/mongodb";
import Post from "../../models/Post";


import { getAllPosts, addPost } from "../../controllers/postController";




export default async function handler(req, res) {
  await clientPromise
    if(req.method === "GET"){
      return getAllPosts(req, res);
    } else if(req.method === "POST" ){
      return addPost(req, res);
    }



}






// export default function handler(req, res) {
//     switch(req.method){
//         case 'GET':{
//           return getPosts(req,res)
//         }
//         case 'POST': {
//           return addpost(req,res)
//         }
//       }

//           //insert post to mongodb

//     async function addpost(req,res){
//       let {db} = await clientPromise
//       const {title, content} = req.body;
//       let post
//         try {
//           post = new Post({title, content})
//           post = await post.save();
  
//           return res.json({
//             message: 'Post Added Successfully',
//             success: true
//           })
          
//         } catch (error) {
//           return res.json({
//             message: new Error(error).message,
//             success: false
//           })
          
//         }
//     }
//     async function getPosts(req,res){
//         try {
//         let {db} = await clientPromise
//         let posts = await db.collection('posts')
//         .find({})
//         .toArray()

//         return res.json({
//         message:JSON.parse(JSON.stringify(posts)),
//         success:true
//         })

//         } catch (error) {

//             return res.json({
//                 message: new Error(error).message,
//                 success: false,
//             })
            
//         }


//     }
// }

// // export default async (req, res) => {
// //    try {
// //        const client = await clientPromise;
// //        const db = client.db("posts");

// //        const post = await db
// //            .collection("post")
// //            .find({})
// //            .toArray();

// //        res.json(post);
// //    } catch (e) {
// //        console.error(e);
// //    }
// // };
