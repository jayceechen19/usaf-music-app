const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const cookieParser = require('cookie-parser');
//tsjson is array with JSON data
const tsjson = require('./taylorSwift.json')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//Download music data for a single artist (of your choosing) 
//and create the following endpoints for your API

//TODO: list all songs
app.get('/listAll', (req, res) => {
    var songs = tsjson.results
    var returnArray = []
    
    for (var song in songs) {
        var songData=songs[song]
        var trackName = songData.trackName
        var artist = songData.artistName
        var album = songData.collectionName
        
        var songObject = {"name":trackName, "artist":artist, "album":album }
        returnArray.push(songObject) 
    }
    res.send(returnArray)
}
) 
//TODO: find song by id
//http://localhost:55038/song?id=1440936016
app.get('/id', (req,res) => {
    var id = req.query.id
    var songs = tsjson.results

    for (var song in songs) {
        if (songs[song].trackId.toString() === id) {
            var songData=songs[song]
            var trackName = songData.trackName
            var artist = songData.artistName
            var album = songData.collectionName
            
            var songObject = {"name":trackName, "artist":artist, "album":album }

            res.send(songObject)
        }
    }
    res.send(`Song ${id} Not Found`)
})
//TODO: Find songs by name
//http://localhost:55038/name?name=shake it off
//Search through 
app.get('/name', (req,res) => {
    var name = req.query.name.toLowerCase()
    var songs = tsjson.results

    for (var song in songs) {
        if (songs[song].trackName.toLowerCase().includes(name)) {
            var songData=songs[song]
            var trackName = songData.trackName
            var artist = songData.artistName
            var album = songData.collectionName
            
            var songObject = {"name":trackName, "artist":artist, "album":album }

            res.send(songObject)
        }
    }
    res.send(`Song ${name} Not Found`)
})

//TODO: Find songs by album id (collection id)
//1440935467
app.get('/albumid', (req,res) => {
    var id = req.query.id
    var songs = tsjson.results
    var returnArray = []

    for (var song in songs) {
        if (songs[song].collectionId.toString() === id) {
            var songData=songs[song]
            var trackName = songData.trackName
            var artist = songData.artistName
            var album = songData.collectionName
            
            var songObject = {"name":trackName, "artist":artist, "album":album }
            returnArray.push(songObject) 
        }
    }
    if (returnArray.length === 0){
        res.send(`Collection ${id} Not Found`)
    } else {
        res.send(returnArray)
    }
})

//TODO: Find songs by album name (collection name)
//http://localhost:55038/collectionname?name=1989
app.get('/collectionname', (req,res) => {
    var name = req.query.name.toLowerCase()
    var songs = tsjson.results
    var returnArray = []

    for (var song in songs) {
        if (songs[song].collectionName.toLowerCase().includes(name)) {
            var songData=songs[song]
            var trackName = songData.trackName
            var artist = songData.artistName
            var album = songData.collectionName
            
            var songObject = {"name":trackName, "artist":artist, "album":album }

            returnArray.push(songObject)
        }
    }
    if (returnArray.length === 0){
        res.send(`Collection ${id} Not Found`)
    } else {
        res.send(returnArray)
    }
})
//TODO:Update song information by id
// /URL/:ParamName
// name: Song name -> name: blah blah
//get to song information
app.get('/updatename/:name', (req, res) => {
    
})
//find ID
//Based on query (name for now), update the information
//Return a success message




//TODO:Delete a song by id
//TODO: Add a new song





