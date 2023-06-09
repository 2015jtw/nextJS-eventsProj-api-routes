import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {

    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid Email'});
            return;
        }

        let client;

        try{
            client = await connectDatabase()
        }catch(e){
            res.status(500).json({message: 'Connecting to the database failed'})
            return;
        }
        
        try{
            await insertDocument(client, 'newsletter', {email: userEmail})
            client.close();
        }catch(e){
            res.status(500).json({message: 'Inserting data to the database failed'})
            return;
        }

        res.status(201).json({message: 'Valid Email'})
    }

}

export default handler;