import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-utils";

async function handler(req, res){

    const eventId = req.query.eventId;
    let client;

    try{
        client = await connectDatabase();
    }catch(e){
        res.status(500).json({message: 'Connecting to the database failed'})
        return;
    }

    if(req.method === 'POST'){
        const {name, email, commentText} = req.body;


        if(!email.includes('@') || !name || name.trim() === '' || !commentText || commentText.trim() === ''){
            res.status(422).json({message: 'Invalid Inputs'})
            client.close();
            return;
        }

        const newComment = {            email,
            name,
            commentText,
            eventId
        }

        let result;
        try{
            result = insertDocument(client, 'comments', newComment)
            newComment._id = result.insertedId.toString();    
            res.status(201).json({message: 'Added Comment', comment: newComment})
        }catch(e){
            res.status(500).json({message: 'Inserting data to the database failed'})
        }
    }

    if(req.method === 'GET'){
        try{
            const documents = await getAllDocuments(client, 'comments', {_id: -1})
            res.status(200).json({comments: documents})
        }catch(e){
            res.status(500).json({message: 'Fetching all documents from the database failed'})
        }
    }
    client.close()
}

export default handler;