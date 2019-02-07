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
const jsonfile = require('jsonfile')
const _ = require('lodash')
const fs = require('fs')
const bodyParser = require('body-parser')

//config
const port = 5000
const file = './ghibli.json'

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


app.get('/getAll', (req, res) => jsonfile.readFile(file,function(err, obj){
    //console.log(obj);
    if(err) console.log(err);

    res.json(obj);
}))
//change to filter
app.get('/getByYear/:year?', (req, res) => jsonfile.readFile(file, function(err, obj){
    if(err)console.log(err);
    console.log(req.params);
    let year = req.params.year;
        //let allData = obj;
        //let filteredData = _.filter(obj, {release_date: year});
        let result = obj.filter((item) => {
            let releaseDate = item.release_date;
            if(releaseDate == year){
                return item;
            }
        })
        res.json(result);
}))

app.get('/getByTitle/:title?', (req, res) => jsonfile.readFile(file, function(err,obj){
    if(err) console.log(err);

    let titleName = req.params.title;
    let title = titleName.toLowerCase();
    //console.log(title);
    let result = obj.filter((item) => {
        //console.log(item.title.indexOf(title));
        let itemTitle = item.title.toLowerCase();

        if(itemTitle.indexOf(title) !== -1){
            return item;
        }
    });

    //let filteredData = _.filter(obj, {title: title});
    res.json(result);

}))

app.get('/search/:word?', (req, res) => jsonfile.readFile(file, function(err,obj){
    if(err) console.log(err);

    let word = req.params.word;


    let result = obj.filter((item) => {
        if(item.title.indexOf(word) !== -1 || item.description.indexOf(word) !== -1) {
            return item;
        }
    });

    res.json(result);

}))

app.post('/addMovie', (req, res) => {

    let data = req.body.data;
    console.log(data);
    jsonfile.readFile(file, function(err, obj){
        if(err) console.log(err);
       // console.log(obj);
        obj.push(data); // before write
        
        jsonfile.writeFile(file, obj, function(err, obj){
            if(err) console.log(err);
            //after write
            res.json({'added': true});
        })
    })
})

app.post('/deleteMovie', (req, res) => {
    let id = req.body.data.id;
    console.log(req);
    jsonfile.readFile(file, function(err, obj){
        if(err) console.log(err);
        //console.log(obj);
        let filteredData = obj.filter((item) => {
            if(item.id != id){
                return item;
            }
        });



        jsonfile.writeFile(file, filteredData, function(err, obj){
            if(err) console.log(err);

            res.json({'deleted': true});
        })
    })
    
})

app.post('/editMovie', (req, res) => {
    let id = req.body.data.id;
    let description = req.body.data.description;
    //console.log(req);
    jsonfile.readFile(file, function(err, obj){
        if(err) console.log(err);
        //console.log(obj);
        let modifiedData = obj.map((item) => {
            if(item.id == id){
                item.description = description;
                
                return item;

            } else {
                return item;
            }
        });



        jsonfile.writeFile(file, modifiedData, function(err, obj){
            if(err) console.log(err);

            res.json({'edited': true});
        })
    })
    
})

app.get('/', (req, res) => res.sendFile('./index.html', {root: './' } 
//,dataTable.style.visibility = 'hidden'
))


app.listen(port, () => console.log(`App listening on port ${port}!`))
