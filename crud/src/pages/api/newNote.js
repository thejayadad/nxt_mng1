const mongoose = require('mongoose')
import Note from '../../../model/Note'

async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try{
        const { title, content} = req.body

        await mongoose.connect('mongodb://localhost/nextJSCRUD',{
            useNewUrlParser: true,
        }).then(()=> console.log(' DB connected'))

        var newNote = new Note({title, content})
        await newNote.save()
        console.log(newNote)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Internal error"})
    }finally{
        mongoose.connection.close()
    }
}

export default handler