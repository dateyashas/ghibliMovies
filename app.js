/*Using the json file ghibli.json prepare REST API.
    The API should support the following methods:
    GET /getAll - get all records
    GET /getByYear - get all movies from given year
    GET /getByTitle - get all movies by title
    GET /search - return all movies matching part of title or description
    POST /addMovie - add movie at the end of JSON file
    POST /deleteMovie - remove movie from JSON file
    POST /editMovie - modify movie in JSON file

    To modify JSON file please use module: https://www.npmjs.com/package/jsonfile
    Please create repository on GitHub called ghibliMovies and commit often!*/

const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 5000
app.use(morgan('combined'))
const jsonfile = require('jsonfile')
const underscore = require('underscore')
const _ = require('lodash')
const file = './ghibli.json'
//const question = document.getElementById('question')
//let dataTable = document.getElementById('dataField')

app.get('/getAll', (req, res) => jsonfile.readFile(file,function(err, obj){
    //console.log(obj);
    if(err) console.log(err);

    res.json(obj);
}))

app.get('/getByYear', (req, res) => jsonfile.readFile(file, function(err, obj){
    if(err)console.log(err);

    //let allData = obj;
    let filteredData = _.filter(obj, {release_date: "1988"});
    res.json(filteredData);
}))

app.get('/', (req, res) => res.sendFile('./index.html', {root: './' } 
//,dataTable.style.visibility = 'hidden'
))


app.listen(port, () => console.log(`App listening on port ${port}!`))
