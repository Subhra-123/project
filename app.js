var express=require('express');
var path=require('path');
var bodyParser=require("body-parser");
var mongoose=require('mongoose');
var expressValidator=require('express-validator');
var app=express();

mongoose.connect('mongodb+srv://subhra1234:subhra1234@cluster0.pyhwx.mongodb.net/ShoppingCartdb',{
    
     useNewUrlParser: true , useUnifiedTopology: true
});
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require("express-session")({
    secret:"This is resturant review app",
    resave:false,
    saveUninitialized:false
}));
//express validator
// app.use(expressValidator({
//     errorFormatter: function (params,mag,value) {
//         var namespace=params.split('.'),
//         root=namespace.shifts(),
//         formParam=root;
//         while(namespace.length)
//         {
//             formParam +='[' +namespace.shifts() + ']';
//         }
//         return {
//             param:formParam,
//             mag:mag,
//             value:value
//         };
        
//     }
// }));
//flash
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//set routes
var pages=require('./routes/pages.js');
var adminPages=require('./routes/admin_pages.js');
app.use('/admin/pages',adminPages);
app.use('/',pages);
var port=3000;
app.listen(port,function(){
    console.log('server started ');
});