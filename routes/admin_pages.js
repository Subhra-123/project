var express=require('express');
var router=express.Router();
var Page=require('../models/page');
router.get('/',function(req,res){
    Page.find({}).sort({sorting:1}).exec(function(err,pages){
      res.render('admin/pages',{
          pages:pages
      });
    });
});

router.get('/add-page',function(req,res){
    
    var title="";
    var slug="";
    var content="";
    res.render('admin/add_page',{
        title:title,
        slug:slug,
        content:content
    });
});
//post add page
router.post('/add-page',function(req,res){
    
    var title=req.body.title;
    var slug=req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if(slug=="")
    slug=req.body.title.replace(/\s+/g, '-').toLowerCase();
    var content=req.body.content;
    Page.findOne({slug:slug},function(err,page){
        if(page)
        {req.flash('danger','Page slug exsists,choose another');
        res.render('admin/add_page',{
            title:title,
            slug:slug,
            content:content
        });}
        else
        {
            var page=new Page({
                title:title,
                slug:slug,
                content:content,
                sorting:100
            });
            page.save(function(err){
                if(err)
                console.log(err);
                else
                {req.flash('success','Page Added');
            res.redirect('/admin/pages');}

            });
        }

    });
});

//edit-page
router.get('/edit-page/:slug',function(req,res){
    
    Page.findOne({slug:req.params.slug},function(err,page){
        if(err)
        return console.log(err);
        res.render('admin/edit_page',{
            title:page.title,
            slug:page.slug,
            content:page.content,
            id:page._id
        });
    });
});

//post edit 
router.post('/edit-page/:slug',function(req,res){
    
    var title=req.body.title;
    var slug=req.body.slug.replace(/\s+/g, '-').toLowerCase();
    if(slug=="")
    slug=req.body.title.replace(/\s+/g, '-').toLowerCase();
    var content=req.body.content;
    var id=req.body.id;
    Page.findOne({slug:slug ,_id:{'$ne':id}},function(err,page){
        if(page)
        {req.flash('danger','Page slug exsists,choose another');
        res.render('admin/edit_page',{
            title:title,
            slug:slug,
            content:content,
            id:id
        });}
        else
        {
            page.finById(id,function(err,page){
                if(err)
                return
            })
           
            // page.save(function(err){
            //     if(err)
            //     console.log(err);
            //     else
            //     {req.flash('success','Page Added');
            // res.redirect('/admin/pages');}

            // });
        }

    });
});
module.exports=router;