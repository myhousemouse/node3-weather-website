const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const app = express() //app 초기화
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
//public의 절대경로 설정, 정적폴더로 설정
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//반복적으로 사용하는 템플릿 관리

app.set('view engine', 'hbs')
//hbs를 사용하면 html를 동적으로 렌더링 가능
app.set('views',viewPath)
hbs.registerPartials(partialsPath) //부분템플릿 등록
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Ham Dun',
        name: 'Nam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title : 'help',
        name: 'Nam'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                console.log('✅ Geocode Data:', data);
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
        })
})

app.get('/help/*', (req, res) => {
    res.render('404_error',{
        errortext:'help article not found',
        title: '404',
        name: 'nam'
    })
})

app.get('*', (req, res) => {
    res.render('404_error',{
        errortext:'Page not found',
        title: '404',
        name: 'nam'
    })
})




app.listen(port, () => {
    console.log('Server is up on port' + port)
})