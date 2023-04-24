import { MongoClient } from "mongodb";

async function handler(req, res){

    const eventId = req.query.eventId;
    const client = await MongoClient.connect('mongodb+srv://2015jtw:jhaCxiAYfdOIfaCF@cluster0.76gkoe5.mongodb.net/events?retryWrites=true&w=majority')


    

    if(req.method === 'POST'){
        const {name, email, commentText} = req.body;


        if(!email.includes('@') || !name || name.trim() === '' || !commentText || commentText.trim() === ''){
            res.status(422).json({message: 'Invalid Inputs'})
            return;
        }

        const newComment = {
            email,
            name,
            commentText,
            eventId
        }

        const db = client.db();
        const result = await db.collection('comments').insertOne({comment: newComment})
        newComment.id = result.insertedId.toString();


        console.log(result)
        res.status(201).json({message: 'Added Comment', comment: newComment})
    }

   

    if(req.method === 'GET'){

        const db = client.db();
        const comment = await db.collection('comments').find().sort({_id: -1}).toArray();
        console.log(comment)

        res.status(200).json({comments: comment})

    }

    client.close()
}

export default handler;