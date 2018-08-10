var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();
//APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Connors Blog",
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=63de74668d8517b43662a6fcf3870f22&auto=format&fit=crop&w=387&q=80",
    body: "best blog on net"
});

//RESTful Routes
app.get("/", function(req,res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, allBlogs) {
        if(err) {
            consol.log(err);
        } else {
            res.render("index", {blogs: allBlogs});
        }
    });
});







app.listen("3001", function() {
    console.log("blog app started");
});