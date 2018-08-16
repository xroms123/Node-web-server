const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

// set partials path
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

// use middleware
app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    
    // write log to server.lgo
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
})
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
})
app.use(express.static(__dirname + '/public'));

// set getCurrentYear and screamIt paramater
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

// render home and about page
app.get('/',(request,response)=>{
    response.render('home.hbs',{
        pageTitle:'Home Page',
        welocomeMessage:'welcome to the website'
    })
});
app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle:'About Page'
    });
});

// setting port information
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});