import React from 'react'
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
  return (
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
                </li>
                )
               })} 
            </ul>
        </section>
    </div>
  )
}

export default notes