const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vjjynh2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const categoriesCollection = client.db('furnitureZone').collection('categories');

        app.get('/categoryName' , async(req, res) =>{
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });


    }
    finally{

    }


}
run().catch(console.log);




app.get('/', async (req, res) => {
    res.send('Used server is running');
});

app.listen(port, () => console.log(`Used server also running running on ${port}`))



















