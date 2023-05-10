
import React, {useState} from "react"
import axios from "axios"

export default function Home() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = () =>{
    const noteObj = {
      title: title,
      content: content
    }
    console.log(noteObj)
    axios.post('/api/newNote', noteObj)
    .then(()=>{
      alert('Note added')
    })
  }
  return (
    <>
    <h2>New Note</h2>
    <form onSubmit={handleSubmit}>
    <input type="text"  id="title"  onChange={(event)=>setTitle(event.target.value)}/>          
    <input type="text"  id="content"  onChange={(event)=>setContent(event.target.value)}/>          
    <button type="submit">Submit</button>
    </form>
    </>
  )
}
