const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// The || 3000 is what is called a "fallback value"
//   so, in case the first value (process.env.PORT) is not available
//   the value for port is going to be 3000, meaning that we are working locally
const port = process.env.PORT || 3000

// Shorthands
const log = console.log

// __dirname returns the current directory
// __filename returns de full path of the current executing file
const publicPath = path.join(__dirname, '../public')

// Create the directory for the new views (now templates) path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// This let us use express function
const app = express()

// This helps us to set a handlebar template for webpages
// The templates has to be in the 'views' folder, with that exact name
// app.set (key, value) e.g. ('view engine', 'template engine name')
app.set('view engine','hbs')

// Now we set the new path with express for views and partials
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// app.use is used to customized the server
// express.static returns the path we are serving
// When running app.use we are accessing to the public folder
//   and then, accessing by default the index.html
app.use(express.static(publicPath))

// Setup handler for root or indexf
app.get('', (req, res) => {
    // render setst the render of one of our views e.g. index.hbs
    //  index below is referencing the index.hbs, the .hbs is optional
    res.render('index', {
        title: 'Weather App',
        name: 'Erick'
    })
})

// Setup handler for about page
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Erick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful information',
        name: 'Erick'
    })
})

// Setup help/ handler for pages within help folder that do not exist
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Erick',
        error: "Help article not found"
    })
})

// app.get, gets the results of an specific url
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'Error: Address not provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error) return res.send({ error } )
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({ error })
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    log(req.query.search)
    res.send({
        products: []
    })
})

// Setting 404 page
// * stands for match anything 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Erick',
        error: "Page not found"
    }
    )
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})