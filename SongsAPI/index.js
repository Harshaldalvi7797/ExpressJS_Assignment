let express = require("express");
let app = express();
let port = process.env.NODE_ENV || 4800;
let Joi = require("@hapi/joi");

app.get("/api/songlist", (req, res) => {
    res.send(songslist);
})
app.use(express.json());

let songslist = [{ id: 1, name: "sairat", Singer: "Ajay-Atul", Duration: "4:30", Price: "500" },
{ id: 2, name: "senorita", Singer: "María del Mar Fernández ", Duration: "5:30", Price: "800" }]
// { id: 3, name: "Dil" }];

app.get("/api/songs/:id", (req, res) => {
    let id = req.params.id;
    // res.send(id);
    let song = songslist.find(item => item.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).send({ message: "invalid song " })
    }
    // let { name } = song;
    res.send(song);
})



app.post("/api/songs/newsong", (req, res) => {

    // let Schema = Joi.object({
    //     name: Joi.string().required().min(4)
    // })

    let { error } = validationError(req.body);

    // console.log(result);
    if (error) {
        return res.send(error.details[0].message)
    }

    let song = {
        id: songslist.length + 1,
        name: req.body.name
    }

    songslist.push(song);
    res.send(songslist);

})

//Update song
app.put("/api/songs/updatesong/:id", (req, res) => {

    //id
    let song = songslist.find(item => item.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).send({ message: "invalid song id " })
    }


    //Joi

    // let Schema = Joi.object({
    //     name: Joi.string().required().min(4)
    // })

    let { error } = validationError(req.body);

    // console.log(result);
    if (error) {
        return res.send(error.details[0].message)
    }
    song.name = req.body.name;
    res.send(songslist);

})

//Remove Song

app.delete("/api/songs/removesong/:id", (req, res) => {
    //id
    let song = songslist.find(item => item.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).send({ message: "invalid song id " })
    }
    let index = songslist.indexOf(song)
    songslist.splice(index, 1);
    res.send({ message: "remove the data", S: songslist });

})

function validationError(error) {
    let Schema = Joi.object({
        name: Joi.string().required().min(4)
    })
    return Schema.validate(error);

}




app.listen(port, () => {
    console.log(`port workin on ${port}`);
})