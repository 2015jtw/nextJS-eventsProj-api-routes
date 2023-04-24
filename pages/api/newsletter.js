import { MongoClient } from "mongodb";

async function handler(req, res) {

    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid Email'});
            return;
        }

        const client = await MongoClient.connect('mongodb+srv://2015jtw:jhaCxiAYfdOIfaCF@cluster0.76gkoe5.mongodb.net/events?retryWrites=true&w=majority')
        const db = client.db();
        await db.collection('newsletter').insertOne({email: userEmail})
        client.close();
        
        res.status(201).json({message: 'Valid Email'})
    }

}

export default handler;