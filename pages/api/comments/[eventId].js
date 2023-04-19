
function handler(req, res){

    const eventId = req.query.eventId;
    

    if(req.method === 'POST'){
        const {name, email, commentText} = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || !commentText || commentText.trim() === ''){
            res.status(422).json({message: 'Invalid Inputs'})
            return;
        }

        

        const newComment = {
            date: new Date().toISOString(),
            email,
            name,
            commentText
        }

        console.log(newComment)
        res.status(201).json({message: 'Added Comment', comment: newComment})
    }

   

    if(req.method === 'GET'){

        const dummyList = [
            {id: 'c1', name: 'bob', email: 'bob@gmail.com', commentText: 'first comment'},
            {id: 'c2', name: 'joe', email: 'joe@gmail.com', commentText: 'second comment'},
        ]

        res.status(201).json({comments: dummyList})

    }


}

export default handler;