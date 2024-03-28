const express=require("express");
const app=express();
const path=require("path");
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'',
    password:''
});


app.listen(3000,()=>{
    console.log("listening at port 3000");
});

app.get("/gamez",(req,res)=>{
    res.render("gamez.ejs");
});

app.get("/gamez/signUp",(req,res)=>{
    res.render("signUp.ejs");
});
app.get("/gamez/signIn",(req,res)=>{
   res.render("signIn.ejs");
});

app.post("/gamez/signUp",(req,res)=>{
    let {username,email,password}=req.body;
    let q=`insert into user (id,username,email,password) values (?,?,?,?)`;
    let data=[uuidv4(),username,email,password];
    
    try{
        connection.query(q,data,(err,result)=>{
            if(err) throw err;
            res.redirect("/gamez");
        });
    }catch(err){
        console.log(err);
    }

});

app.post("/gamez/signIn/games",(req,res)=>{
    let {email,password}=req.body;
    let q=`select count(email) from user where email='${email}'`;

    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            
            if(result[0]['count(email)']){
                let q2=`select * from user where email='${email}' `;

                connection.query(q2,(err,result)=>{
                    if(err) throw err;
                    let value=result[0];
                    
                    if(password==value.password && email==value.email){
                          res.render("games.ejs",{value});
                    }else{
                        res.send("wrong password");
                    }
                })
            }else{
                res.render("mess.ejs");
            }
        })
    }catch(err){
        console.log(err);
    }
});


app.get("/gamez/:id/tictactoe",(req,res)=>{
       res.render("tictactoe.ejs");
});

app.get("/gamez/:id/simon",(req,res)=>{
    res.render("simon.ejs");
});


app.get("/gamez/:username/:id/edit",(req,res)=>{
    let {username,id}=req.params;
    res.render("edit.ejs",{id,username});
});

app.patch("/gamez/:id",(req,res)=>{
   let {id}=req.params;
   let {username}=req.body;
   let q=`select * from user where id='${id}'`;

   try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        if(id){
            let q2=`update user set username='${username}' where id='${id}'`;
    
            connection.query(q2,(err,result)=>{
                if(err) throw err;
                 res.send("change name");
            })
        }
       })
   }catch(err){
      console.log(err);
   }
});


app.get("/gamez/:username/:id/delete",(req,res)=>{
    let {username,id}=req.params;
      res.render("del.ejs",{username,id});
});

app.delete("/gamez/:id",(req,res)=>{
    let {email,password}=req.body;
    let {id}=req.params;

    let q=`select * from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user=result[0];

            if(user.email==email && user.password==password){
                let q2=`delete from user where email='${email}'`;
                
                    connection.query(q2,(err,result)=>{
                        if(err) throw err;
                        res.redirect("/gamez");
                    });
                
            }else{
                 res.send("wrong id or password");
            }
        });
    }catch(err){
        console.log(err);
    }
});

