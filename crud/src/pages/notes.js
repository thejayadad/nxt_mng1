import React, {useState} from 'react'
import axios from 'axios'

export async function getStaticProps(){
    const mongoose = require('mongoose')
    const Note = require('../../model/Note')

    await mongoose.connect('mongodb://127.0.0.1:27017/nextJSCRUD',{
        useNewUrlParser: true,
    }).then(()=> console.log(' DB connected'))

    const notes = await Note.find().sort({ createdAt: 'desc'})
    console.log(notes)
    return{
        props: {
            notes: JSON.parse(JSON.stringify(notes))
        }
    }
}
 

const notes = ({notes}) => {
    const [visibility, setVisibility] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [noteId, setNoteId] = useState('')

    const editForm = (title, content, noteId) => {
        setVisibility(visibility => !visibility)
        setTitle(title)
        setContent(content)
        setNoteId(noteId)
    }
    const updateNote = async (todoId) =>{
        const noteObj = {
            title: title,
            content: content
          }
          console.log(noteObj)
         await axios.put(`/api/updateNote?id=${noteId}`, noteObj)
          .then(()=>{
            window.location.reload(false)
          })
    }

    const deleteNote = (noteId) =>{
        axios.delete(`/api/deleteNote?id=${noteId}`).then(()=>{
            window.location.reload(false)
        })
    }


  return (
    <>
    <div>
        <section>
            <h3>All Notes</h3>
            <a href="/">New Note</a>
            <ul>
               {notes.map((note, i) => {
                return (
                <li key={i}>
                    <p>{note.title}</p>
                    <h3>{note.content}</h3>
                    <p><button  onClick={()=>deleteNote(note._id)}>Delete</button></p>
                    <p><button onClick={(title, content, noteId)=>editForm(note.title, note.content, note._id)} >Edit</button></p>
                </li>
                )
               })} 
            </ul>
        </section>
    </div>
    
    {visibility && <div className='container'>
    <h1>Update Todo</h1>
    <form>
      <div className="mb-3">
        <input type="text"  id="title"  value={title} onChange={(event)=>setTitle(event.target.value)}/>          
      </div>
      <div className="mb-3">
        <input type="text"  id="content" value={content} onChange={(event)=>setContent(event.target.value)}/>          
      </div>
      <button type="submit" onClick={()=>updateNote(noteId)}>Submit</button>
      <button onClick={()=>setVisibility(visibility => !visibility)}>Cancel</button>
    </form>
  </div>}
  </>
  )
}

export default notes