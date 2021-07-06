import { MongoClient }from 'mongodb'

const connectionString =`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mbxwu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

async function connectDataBase() {
    const client = await MongoClient.connect(connectionString);
    return client
}

async function insertDocument(client, document){
    const db = client.db()
    await db.collection('comments').insertOne(document);
    client.close()
}

async function handler(req, res){

    if(req.method ==='POST'){
        const {email,name,message}=JSON.parse(req.body)

        if(!email||!email.includes("@")||!name||name.trim() === ''||!message || message.trim()===''){
            return res.status(422).json({
                message:'Invalid input'
            })
        }

        const newMessage={
            id:new Date().toISOString,
            email,name,message
        }

        try {
            const client = await connectDataBase()
            await insertDocument(client,newMessage)

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message:'Internal Server Error'
            })
        }

        return res.status(201).json({
            message:'Successfully stored message!',
            content:newMessage
        })
    }

    return res.status(400).json({
        message:"Bad method"
    })
}

export default handler