const express = require("express");
//requiring only v4 remember the syntax of exporting v4 and renaming it to uuid for easy use
const { generateFile } = require('./generatFile');
const {executeCpp } = require('./executeCpp');

const app = express();
app.use(express.urlencoded({ extended: true }));//to parse the data in usable format coming from req as post req

app.get('/', (req, res) => {
    res.json({ "hello": "world" });
    console.log(req.body);
})

app.post('/run', async(req, res) => {
    
    const { language = "cpp", code } = req.body;
    if (code === undefined) return res.status(400).json({ success: false, error: "Empty code body" }); 
    try {
        const filepath = await generateFile(language, code);
        const output = await executeCpp(filepath);

    
        res.json({ filepath, output });
    } catch (err)
    {
        res.status(500).json({ err });
    }
});

app.listen(3000, () => {
    console.log("listening to server");
});