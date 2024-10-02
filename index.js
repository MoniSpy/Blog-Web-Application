import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
  

let d=new Date();

let blogs=[
    {
        id: 1, 
        title:"Star Wars Episode 1", 
        content:"Captain. Yes, sir? Tell them we wish to board at once. With all due respect, the Ambassadors for the Supreme Chancellor wish to board immediately. Yes, yes, of course, as you know, our blockade is perfectly legal, and we'd be happy to receive the Ambassador.The Queen does not need to know. Well, I don't approve. The boy tells me you wanta sponser him in a race. How can you do this? Not on Republic credits, I think, huh.May the Force be with you. It is not disrespect, Master, it is the truth. From your point of view. The boy is dangerous. they all sense it. Why can't you? His fate is uncertain, he's not dangerous. The Council will decide Anakin's future.Obi-Wan is ready. I am ready to face the trials. Our own council we will keep on who is ready. He is headstrong and he has much to learn of the living Force, but he is capable.Kill them, immediately. Yes. yes, My Lord. As you wish.", 
        author:"Monica Spycher",
        date:d.toLocaleString()
    },
    {
        id: 2, 
        title:"Star Wars Episode 2", 
        content:"Senator, we're making our final approach into Coruscant. Very good, Lieutenant. We made it. I guess I was wrong.The prime minister is expecting you. I'm expected? Of course. He is anxious to meet you. After all these years, we were beginning to think you weren't coming. Now, please, this way.Anakin! Master Yoda. Count Dooku. You have interfered with our affairs for the last time. Powerful you have become, Dooku. The dark side I sense in you. I've become more powerful than any Jedi.Senator, we're making our final approach into Coruscant. Very good, Lieutenant. We made it. I guess I was wrong. There was no danger at all. Cord.", 
        author:"Monica Spycher", 
        date:d.toLocaleString()
    },
];

app.get("/", (req, res) =>{
    res.render("index.ejs", {blogs});
});

app.get("/create", (req, res) =>{
    res.render("create.ejs");
});

app.post("/create", (req,res) => {
    const {aTitle,aText, aAuthor}=req.body;
    const newBlog={ id:blogs.length+1,title:aTitle, content:aText, author:aAuthor, date:d.toLocaleString()}
    blogs.push(newBlog);
    res.redirect("/");
});

app.get("/edit/:id", (req,res) => {
    const id= parseInt(req.params.id);
    const post = blogs.find(post => post.id === id);
    res.render("edit.ejs", { post });
});

app.post("/edit/:id", (req,res) => {
    const id= parseInt(req.params.id);
    const {aTitle, aText, aAuthor}=req.body;
    const postIndex= blogs.findIndex(post => post.id === id);
    blogs[postIndex]= {id:id, title:aTitle, content:aText, author:aAuthor, date:d.toLocaleString()};
    res.redirect("/");
});

///Content is not rendering after submiting the edit page

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    blogs = blogs.filter(post => post.id !== id);
    res.redirect('/');
  });



 app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
 });