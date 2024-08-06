const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')
router.get('/', async (req, res, next) => {
try {
  const accounts = await Account.getAll()
  res.json(accounts)
} catch (err) {
  next(err)
}

})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.accounts)
})

router.post('/',md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
 try{
   const newAccount = await Account.create(req.body)
   res.status(201).json(newAccount)


 }catch (err) {
   next(err)
 }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await Account.deleteById(req.params.id)
    res.json(req.accounts)
      
    

  }catch (err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message:err.message
  })
})

module.exports = router;
