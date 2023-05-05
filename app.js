const express =require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');

const blogroutes = require('./routes/blogroutes');

//express app
const app=express();

//connect to mongDB

const dbURI = 'mongodb+srv://Jerin_joe:jerryberry@cluster0.klc09nm.mongodb.net/node_one?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    //listen for request
    .then((result)=> { 
        console.log("Connected to MongoDB");
        app.listen(3000);})
    .catch((err) => console.log(err));
//register view engine

app.set('view engine','ejs');


//middl(eware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));//takes url data and pass to object for use
app.use(morgan('dev'));//read documentation from npmorg


//routes
app.get('/',(req,res)=>{

    // res.send('<p>home page</p>');//omits content header and status code
                //also shows what data is being sent to browser
    // res.sendFile('./views/index.html',{root:__dirname});//not reletive path

    // const blogs = [
    //     //each one is an object
    //     {title: 'Banana split', snippet: 'Lorem ipsum, dolor sit amet consectetur!'},
    //     {title: 'Banana splat', snippet: 'Lorem ipsum, dolor sit amet consectetur!'},
    //     {title: 'Banana splot', snippet: 'Lorem ipsum, dolor sit amet consectetur!'}
    //    ];
    // res.render('index',{title: 'Home', blogs });//take view render and send back to browser
                                    //or blogs: blogs
    res.redirect('/blogs');
});                                     
app.get('/about',(req,res)=>{

   // res.send('<p>about page</p>');
   //res.sendFile('./views/about.html',{root:__dirname});
   res.render('about',{title: 'About'});
})

// //redirects
// app.get('/about-us',(req,res) => {
//     res.redirect('/about');
// });

//blog routes
app.use('/blogs',blogroutes);
//404 page

app.use((req,res) => {
    //res.sendFile('./views/404.html',{root:__dirname});

    res.status(404).render('404',{title: '404'});
});//use to fire middleware function in express
//use at end of all gets like a catch all