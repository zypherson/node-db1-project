const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic

 const error = {status: 400}
 const {name, budget} = req.body
 
 if(name === undefined || budget === undefined){
   error.message = 'name and budget are required'
   next(error)
 }else if(typeof name !== 'string'){
   error.message = 'Name must be a string'
   next(error)
 }else if(name.trim().length < 3 || name.trim().length > 100 ){
   error.message = 'name of account must be between 3 and 100'
   next(error)
 }else if(typeof budget !== 'number' || isNaN(budget) ){
   error.message= 'budget must be a number'
   next(error)
 }else if(budget < 0 || budget > 1000000){
   error.message = ' budget must be between 0 and 1000000'
   next(error)
 }

  if(error.message){
    next(error)
  }else{
    next()
  }
   
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC\
  try{
    const existing = await db('accounts').where('name', req.body.name.trim()).first()
    if(existing){
      next({status: 400, message:'this name already exists'})
    }else{
      next() 
     }

  }catch (err){
    next(err)
  }
 
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const accounts = await Account.getById(req.params.id)
    if(!accounts){
    next({status: 404, message:'this account was not found'})
    }else{
      req.accounts = accounts
      next()
    }
  }catch (err) {
    next(err)
  }
 
  
}
