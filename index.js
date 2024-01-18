var express = require('express')
const fs = require('fs')


const app = express()
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi welcome to the home url")
})

app.get('/givemydataback', async (req, res) => {
    const data = req.body;
    // console.log("our data ", data);
    console.log("get request");
    try {
        fs.readFile('./roomsoomdata.json', 'utf8', (err, data) => {
            if (err) {
                console.log("Error in file reading = ", err);
                res.status(500).send("error");
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    res.send(data);
                    // console.log("JSON data from file:", jsonData);
                } catch (parseError) {
                    console.log("parsing json error = ", parseError);
                    res.status(500).send("error");
                }
            }
        });
    }
    catch (err) {
        res.status(500).send("error");
        console.log("error in re");
    }
})

app.post('/takeyourdataback', (req, res) => {
    try {
        // console.log("this is the body : ",req.body);
        var content = JSON.stringify(req.body);

        // console.log("this is the content ", content);
        console.log("post request");

        fs.writeFile('./roomsoomdata.json', content, (err) => {
            if (err) {
                res.status(500).send({ "message": "Error writing to file" });
            } else {
                console.log("post ho gya done");
                res.send({ "message": "done" });
            }
        });
    } catch (err) {
        res.status(500).send({ "message": err });
    }
});


app.listen(3000, () => {
    console.log("I am listening bro! on port 3000");
})