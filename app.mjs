import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const blogs = [];
let blogId=3;
let msg =""
app.set("view engine" , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

function currentHour() {
    const time = new Date();
    const hours = time.getHours();
    return  hours;
}
function currentMin(){
    const time = new Date();
    const minutes = time.getMinutes();
    return minutes
}
function currentDate(){
    const date = new Date();
    const day = date.toLocaleDateString();
    return day;
}
app.get('/' , (req , res)=>{
    res.render('index' , {blogs});
})
app.get('/about' , (req , res)=>{
    res.render('about');
})
app.get('/create' , (req,res)=>{
    res.render('create');
})
app.post('/create' , (req,res)=>{
    const {title , content} = req.body;
    const newBlog = {id:blogId++,title , content,date:currentDate(),hours:currentHour(),minutes:currentMin()};
    blogs.unshift(newBlog);
    res.redirect('/')
})
app.get('/edit/:id' , (req , res)=>{
    const editId = parseInt(req.params.id, 10);
    const editedBlog = blogs.find(blog=> blog.id===editId)
    if(editedBlog){
        res.render('edit' , {editedBlog , msg});
    }else{
        res.status(404).send('Blog not found');
    }
})
app.post('/edit/:id', (req, res) =>{
    const editId = parseInt(req.params.id, 10);
    const updatedTitle = req.body.title.trim();
    const updatedContent = req.body.content.trim();
    const editedBlog = blogs.find(blog=> blog.id===editId)
    
    if(editedBlog){
        if(editedBlog.title.trim() === updatedTitle && editedBlog.content.trim() === updatedContent ){
            msg="Please Make Sure To Edit The Blog Before Update It 🙏" 
            res.render('edit' , {editedBlog , msg});
            msg = ""
        }else{
            editedBlog.title = updatedTitle;
            editedBlog.content = updatedContent;
            editedBlog.date=currentDate();
            editedBlog.hours=currentHour();
            editedBlog.minutes=currentMin();
            res.redirect('/');
        }
    }else{
        res.status(404).send('Blog not founds');
    }
})
app.get('/delete/:id', (req, res) => {
    const deleteId = parseInt(req.params.id, 10);
    const index = blogs.findIndex(blog => blog.id === deleteId);
    if (index !== -1) {
        blogs.splice(index, 1);
        res.redirect('/')
    } else {
        res.status(404).send('Blog not found');
    }
});
app.listen(3000 , ()=>{
    blogs.push({
        hours:currentHour(),
        minutes:currentMin(),
        date:currentDate(),
        id:2 ,
        title:'The Future of Web Development',
        content:'In the ever-evolving world of technology, web development continues to push boundaries and introduce new paradigms. As we look towards the future, several trends are poised to shape the landscape. Artificial Intelligence and Machine Learning are increasingly integrated into web applications, providing more personalized and intelligent user experiences. Additionally, the rise of serverless architectures and microservices offers developers greater scalability and flexibility. As web technologies advance, developers must stay updated with the latest trends to build innovative and effective solutions.'
    },{
        hours:currentHour(),
        minutes:currentMin(),
        date:currentDate(),
        id:1 ,
        title:'Why Responsive Design Matters',
        content:'Responsive design is an approach to web development that ensures web applications work well on a variety of devices and screen sizes. With the growing use of mobile devices, having a responsive design is no longer optional; it’s a necessity. Responsive design uses flexible grids, layouts, and images to adjust the layout based on the device’s screen size. This approach not only enhances user experience but also improves SEO rankings, as search engines favor mobile-friendly sites. Implementing responsive design practices ensures that your website is accessible and functional across all devices.'
    })
    console.log("server is running on port 3000");
})