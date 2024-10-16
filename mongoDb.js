const { MongoClient, ServerApiVersion } = require('mongodb');
console.log("Mongodb require successful");

let url = 'mongodb+srv://pmtal_3122:Piyush2002@cluster0.qf8cipo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function dbConnect() {
    let result = await client.connect();
    let db = result.db('ScreenplayDB');
    return db.collection('Profiles');
}

module.exports = dbConnect;