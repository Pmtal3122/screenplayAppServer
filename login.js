const express = require('express');
const dbConnect = require('./mongoDb');
const cors = require('cors')
const app = express()
const port = 8000

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', cors(), (req, res) => {

})

app.post('/signUpData', async (req, res) => {
    let data = await dbConnect();
    let {fName, lName, email, Pwd, Contact} = req.body;
    const obj = `{"FirstName":"${fName}", "LastName":"${lName}", "Email":"${email}", "Contact": "${Contact}", "Password":"${Pwd}", "Script":""}`;
    const objJson = JSON.parse(obj);
    objJson["Script"] = `<p class="heading active">int. home - dawn|</p>`
    
    let ins = await data.insertOne(objJson);
    console.log(ins);

    return res.redirect('http://localhost:3000/');

})



app.post('/loginData', async (req, res) => {
    let data = await dbConnect();
    let {eml, pw} = req.body;

    let result = await data.findOne({Email: eml});
    // console.log("Result: " +  result);
    // let resJson = JSON.stringify(result);
    // console.log(resJson);
    const dbPwd = result.Password;
    // console.log(dbPwd);

    if(pw === dbPwd) {
        console.log("Login Successful");
        res.json(result);
    }
    else {
        res.json("LoginFailed");
    }
})

app.post('/editor', async (req, res) => {
    console.log("Inside post of editor");
    let data = await dbConnect();
    let {inText, em} = req.body;
    // console.log("The updated script in server is");
    // console.log(inText);
    // console.log(typeof inText);

    const result = await data.updateOne(
        {"Email" : em}, 
        {
            $set: {
                "Script" : inText
            }
        },
        {upsert: true}
    )

    console.log("Result: " + result);
    
    // const updatedDb = await data.findOne({Email: em});
    // res.json(updatedDb);
})

app.listen(port, '0.0.0.0', () => {console.log(`Listening on port ${port}`)});

// app.get('/loginData', (req, res) => {
//     return res.redirect('http://localhost:3002/');
// }).listen(port2);
