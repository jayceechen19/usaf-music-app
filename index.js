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
//{"id": 1440936016, "newName" : "blah blah"}
//get to song information
app.post('/updatename', (req, res) => {
    var name = req.body.newName
    var id = req.body.id
    var songs = tsjson.results
    
    if (!name || !id) {
        res.send('Ensure format is "id": #####, "newArtist": ')
    } else {
        for (var song in songs) {
            if (songs[song].trackId.toString() === id.toString()) {
                songs[song].trackName = name
                res.send('Song updated!')
            }
        }
        res.send(`I'm broke! No id Found`)
    }
})
   

//TODO:Delete a song by id
//{"id": 1440936016}
app.post('/deletesong', (req, res) => {
    var id = req.body.id
    var songs = tsjson.results
    
    if (!id) {
        res.send('Ensure format is "id": #####')
    } else {
        for (var song in songs) {
            if (songs[song].trackId.toString() === id.toString()) {
                //songs = [{song1}, {song2}]
                //get index
                var index = songs.indexOf(songs[song])
                //remove object @ index
                songs.splice(index, 1)
                res.send('Song deleted!')
            }
        }
        res.send(`I'm broke! No id Found`)
    }
})
//TODO: Add a new song
/*
{"trackId" : 12345, "trackName" : "Baby Shark", "collectionName" : "Doo Doo", "collectionId" : 12345, "artistName" : "Sharks"}
 */
app.post('/addsong', (req, res) => {
    //id, name, album name, album id, artist
    var id = req.body.trackId
    var name = req.body.trackName
    var albumName = req.body.collectionName
    var albumId = req.body.collectionId
    var artistName = req.body.artistName

    var songs = tsjson.results
    //If it's not in correct format
    if (!id || !name || !albumName || !albumId || !artistName) {
        res.send('Ensure format is correct')
    } 
    //If its is in the correct format, do this
    else {
        //Look through the entire array checking if Id exits
        for (var song in songs) {
            if (songs[song].trackId.toString() === id.toString()) {
                //Id exists, send error
                res.send('Song id already in collection!')
            } 
        } 
        //OK, Id not found, add to song database
       var newObject = {
           "trackId": id, "trackName": name, "collectionName": albumName, "collectionId": albumId, "artistName": artistName 
       } 
       songs.push(newObject)
       res.send("omg i cant believe you actually added a song!")
    }
})




