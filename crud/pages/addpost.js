import React, { useState } from 'react'
import axios from "axios"

const addpost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const handlePost = async (e) => {
        e.preventDefault()

        setError("")
        setMessage("")

        if(!title || !content){
            return setError("All fields are required")
        }

        let post = {
            title,
            content,
         
        }

        let response = await fetch("/api/posts", {
            method: 'POST',
            body: JSON.stringify(post)
        })

        let data = await response.json()

        if(data.success){
            setTitle("")
            setContent("")
            return setMessage(data.message)
        }
        else{
            return setError(data.message)
        }
    }

  return (
    <div>
        <section>
            <form onSubmit={handlePost}>
                {error ? (
                    <div>
                        <h3>{error}</h3>
                    </div>
                ) : null}


                {message ? (
                    <div>
                        <h3>{error}</h3>
                    </div>
                ) : null}
                <input
                    name='title'
                    value={title}
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                name='content'
                value={content}
                placeholder='Content'  
                onChange={(e) => setContent(e.target.value)}       
                
                />
                 <button type='submit'>Add Post</button>               
            </form>
        </section>


    </div>
  )
}

export default addpost