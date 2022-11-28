const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { json } = require('express');
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
        const usersCollection = client.db('furnitureZone').collection('users');
        const bookingCollection = client.db('furnitureZone').collection('bookings');

        app.get('/categoryName' , async(req, res) =>{
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });

        app.get('/categoryName/:name' , async(req, res) =>{
            const name = req.params.name;
            const query = {};
            const allProducts = await productsCollection.find(query).toArray();
            const products = allProducts.filter(product => product.category_name === name);
            res.send(products);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });
        app.get('/users', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });


        //  Admin----------------

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'admin' });
        })

        // get data

        app.get('/bookings' , async(req,res) =>{
            const email = req.query.email;
            const query = {email: email};
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
        })

        app.post('/bookings', async (req, res) => {
            const user = req.body;
            const result = await bookingCollection.insertOne(user);
            res.send(result);
        });

        // Add Products Post method
        app.post("/products", async(req, res)=>{
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

        app.get("/products", async(req, res)=>{
            const email = req.query.email;
            const query = {email};
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })

        // My Products Delete-------------------
        app.delete("/products/:id", async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result =await productsCollection.deleteOne(query);
            res.send(result);
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



















