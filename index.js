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
        const productsCollection = client.db('furnitureZone').collection('products');

        app.get('/categoryName' , async(req, res) =>{
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });

        app.get('/categoryName/:id' , async(req, res) =>{
            const id = req.params.id;
            const query = {};
            const allProducts = await productsCollection.find(query).toArray();
            const products = allProducts.filter(product => product.category_id === id);
            res.send(products);
        })


    }
    finally{

    }


}
run().catch(console.log);




app.get('/', async (req, res) => {
    res.send('Used server is running');
});

app.listen(port, () => console.log(`Used server also running running on ${port}`))



















