const internModel=require('../models/internmodel')
const collegeModel=require('../models/collegemodels')



let createIntern= async function(req,res,){
  try{
    let data =req.body;

 if(!data.name) return res.status(400).send( {status:false,message:"name should be present in body"})
 let regex= /^[a-zA-Z ]*$/
 if (!data.name.match(regex)) 
 {return res.status(400).send({ status: false, message: "Name IS NOT IN VALID FORMAT" })}
 if(!data.email) return res.status(400).send({status:false,message:"email should be present in body"})

 let duplicate= await internModel.findOne({email:data.email})
 if(duplicate) return res.status(400).send({status:false,message:"email is already present"})
 let emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
//  /^\w?(.)+?@[a-zA-Z_]+?\.[a-zA-Z]{2,}|.[a-zA-Z]{2,3}$/
 if (!data.email.match(emailregex)) 
 {return res.status(400).send({ status: false, message: "EMAIL IS NOT IN VALID FORMAT" })}

 if(!data.mobile) return res.status(400).send({status:false,message:"mobile should be present in body"})

 let duplicate2= await internModel.findOne({mobile:data.mobile})
 if(duplicate2) return res.status(400).send({status:false,message:"mobile is already present"})
 let mobileregex=/^(\+[0-9]{2}[\-\s]?)?[0]?(91)?[789]\d{9}$/

 if (!data.mobile.match(mobileregex)) 
 {return res.status(400).send({ status: false, msg: "Mobile IS NOT IN VALID FORMAT" })}
 if(!data.collegeName) return res.status(400).send( {status:false,message:"collegename should be present in body"})

console.log(data.collegeName);


let getId= await collegeModel.findOne({name:data.collegeName}).select({_id:1})
console.log(getId)
if(!getId) return res.status(400).send({status:false,message:"no college exist with this name"})
let check= await collegeModel.findOne({name:data.collegeName})
if(check.isDeleted==true) return res.status(400).send({status:false,message:"collegename is already deleted"})
data.collegeId=getId._id

let result= await internModel.create(data)
return res.status(201).send({status:true,data:result})
} catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  
}

}



module.exports.createIntern=createIntern
