const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static('public'))

const posts = [{
    title: 'Day 1',
    content: 'Today I learned about Node.js'
}, {
    title: 'Day 2',
    content: 'Today I learned about Express.js'
}, {
    title: 'Day 3',
    content: 'Today I learned about EJS'
}]
app.get('/', (req, res) => {
    res.render('Home', { posts: posts })
})

app.get('/about', (req, res) => {
    res.render('About')
})

app.get('/compose', (req, res) => {
    res.render('compose')
})

app.get('/post/:postName', (req, res) => {
    console.log('This is Dynamic Route Page')
    console.log(req.params.postName)
    let bool = false;
    posts.forEach(pos => {
        if (pos.title === req.params.postName) {
            res.render('dynamic', { post: pos })
            bool = true;
            console.log(typeof(bool));
        }
    })
    if(bool){}
    else{
        res.redirect('/')
    }

})

app.post('/posts', (req, res) => {
    console.log("Post Request")
    console.log(req.body.title)
    console.log(req.body.content)
    const post = {
        title: req.body.title,
        content: req.body.content
    }
    posts.push(post)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is Running http://localhost:3000')
})