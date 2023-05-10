const mongoose = require('mongoose')
import Note from '../../../model/Note'

async function handler(req, res){
    if(req.method !== 'PUT'){
        return res.status(405).end()
    }

    const { id } = req.query
    const { title, content} = req.body

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/nextJSCRUD',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log(' DB connected'))
    }catch(error){
        console.log(error)
    }

    try{
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content})
        console.log(updatedNote)
        res.status(500).json(updatedNote)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Not updated"})
    }finally{
        mongoose.connection.close()
    }

}

export default handler