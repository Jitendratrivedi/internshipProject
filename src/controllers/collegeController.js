// const { ignore } = require("nodemon/lib/rules")
// const validUrl = require('valid-url');
const collegeModels= require("../models/collegemodels")
const internmodel = require("../models/internmodel")
var validator = require('validator');


let createcollege = async function(req,res){
   try{
    let data =req.body
    if(!data.name) return res.status(400).send( {status:false,message:"name should be present in body"})
    let regex= /^[a-zA-Z ]*$/
    if (!data.name.match(regex)) 
    {return res.status(400).send({ status: false, message: "Name IS NOT IN VALID FORMAT" })}
    let duplicate= await collegeModels.findOne({name:data.name})
    if(duplicate) return res.status(400).send({status:false,message:"name is already present"})
    if(!data.fullName) return res.status(400).send({status:false,message:"fullName should be present in body"})
    // let regex2= /^[a-zA-Z, ]*$/
    let regex2= /^[a-zA-Z,\-. ]+$/
    if (!data.fullName.match(regex2)) 
    {return res.status(400).send({ status: false, message: "Fullname IS NOT IN VALID FORMAT" })}
    if(!data.logoLink) return res.status(400).send({status:false,message:"logoLink should be present in body"})
//    if(!validUrl(data.logoLink)) return res.status(400).send({status:false,message:"logoLink is not in valid format"})
  if(!validator.isURL(data.logoLink)) return res.status(400).send({status:false,message:"logoLink is not Url"})
    let save= await collegeModels.create(data)
   res.status(201).send({status:true,data:save})
} catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  
}

}





let collegeDetails= async function (req,res){
try{
    let data=req.query
    if(Object.keys(data).length==0)
   {
       return res.status(400).send({status:false,message:"No query is being provided"})
   }
   if(!data.collegeName) return res.status(400).send({status:false,message:"Collegename not provided"})
   let check = await collegeModels.findOne({name:data.collegeName})
   if(!check) return res.status(400).send({status:false,message:"Wrong college name provided"})
   if(check.isDeleted==true)
   {
       return res.status(400).send({status:false,message:"college name already deleted"})
   }
   
   let get={}
    let result = await collegeModels.findOne({name:data.collegeName}).select({name:1,fullName:1,logoLink:1})

  get.name=result.name
  get.fullName=result.fullName
  get.logoLink=result.logoLink
  
  
  
    get.interests= await internmodel.find({collegeId:result._id}).select({_id:1,name:1,email:1,mobile:1})

    res.status(200).send({status:true,data:get});
 } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
      
    }
};







module.exports.collegeDetails=collegeDetails



module.exports.createcollege=createcollege