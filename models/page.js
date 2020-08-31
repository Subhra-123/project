var mongoose=require('mongoose');
var PageSchema=new mongoose.Schema({
    title:String,
    slug:String,
    content:String,
    sorting:Number
});
var Page=module.exports=mongoose.model('Page',PageSchema);