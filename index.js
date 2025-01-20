const express = require("express");
const app = express();
const path = require('path'); //extraaaaaaaa
app.use(express.static(path.join(__dirname, 'public'))); //CSS & Image



//for ejs
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

//For posts from database
const posts = [
    { title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    { title: 'Second Blog Post', content: 'Here is the content of the second blog post.' },
  ];


// My Home Page route /
function Home(req, res){
    res.render("index.ejs")
}
app.get("/", Home);

// Login page route /login
app.get('/login', (req, res) => {
    res.render('login'); // Render the login.ejs page
  });


  // Login POST route (for handling form submission)
//app.post('/login', (req, res) => {
    // Handle login logic here
   // console.log('Login attempted');
    // After processing login, redirect or render a response
   // res.redirect('/'); // Redirect to home after login (or any other page)
 // });

// Blog page route /blog
app.get('/blog', (req, res) => {
    res.render('blog', { title: 'My Blog', posts: posts });
  });

// Create Post page route /create-post
app.get('/create-post', (req, res) => {
    res.render('create-post', { title: 'Create a New Post' });
  });

// Post page Submission (POST request)
app.post('/create-post', express.urlencoded({ extended: true }), (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content }); // Store the post in the posts array
    res.redirect('/blog'); // After submission, redirect to the blog page
  });

// Start the server
const port =   4000;
app.listen(port, () =>{
    console.log(`server is running at ${port}`)
})