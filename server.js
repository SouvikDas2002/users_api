const { log } = require('console');
const express=require('express');
const app=express();
const fs=require('fs');

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

  const alldata=[];

app.get('/',(req,res)=>{
  fs.readFile('index.json','utf-8',(err,data)=>{
    if(err){
      log(err);
    }else{
      res.status(200).json(JSON.parse(data));
    }
  })
})
app.get('/postinfo',(req, res) => {
    const data=req.query;
  // console.log(data);
  alldata.push(data);
  fs.readFile('index.json','utf-8',(err,d)=>{
    if(err) throw err;
    else{
      let newObj=JSON.parse(d);
      newObj.push(data);
      fs.writeFile('index.json',JSON.stringify(newObj),(err)=>{
        if(err) throw err;
        else{
          res.status(200).redirect('/');
        }
      })
    }
  })
})
// app.get('/postinfo/:x',(req,res)=>{

//     // console.log(req.params.x);
//     res.send(req.params.x);

// })
app.post('/postinfo',(req,res)=>{
    const data=req.body;
    alldata.push(data);
  fs.readFile('index.json','utf-8',(err,d)=>{
    if(err) throw err;
    else{
      let newObj=JSON.parse(d);
      newObj.push(data);
      fs.writeFile('index.json',JSON.stringify(newObj),(err)=>{
        if(err) throw err;
        else{
          res.status(200).send('data added');
        }
      })
    }
  })
    // res.status(200).json(alldata);
})

app.listen(4000);