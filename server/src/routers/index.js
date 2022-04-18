const express = require("express");
const router = express.Router();

const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const { register, login, updateAccount, deleteAccount, getAccountId, checkAuth } = require('../controllers/account')
const { addLink,addLinkTransaction, getLinkId, updateLink, deleteLink, getLink } = require('../controllers/link')
const { addView, getViewId, updateView } = require('../controllers/view')
const {addTransaction, takeTransactions, takeTransaction, editTransaction, deleteTransaction} = require('../controllers/transaction')



router.post('/register', register)
router.post('/login', login)
router.get('/myaccount', auth, getAccountId)
router.patch('/profile', auth, updateAccount)
router.delete('/profile', auth, deleteAccount)
router.get('/check-auth', auth, checkAuth)

router.post('/addlink', auth, uploadFile("picture"), addLink)
router.post('/addLinkTransaction', auth, addLinkTransaction)

//Route Post Transaction
// router.post('/addtransaction', auth, addTransaction)
router.post('/addtransaction', auth, addTransaction)
router.get('/transactions', auth, takeTransactions)
router.get('/transaction/:id', auth, takeTransaction)
router.patch('/transaction/:id', auth, editTransaction)
router.delete('/transaction/:id', auth, deleteTransaction)

// router.post('/addlink', auth, uploadFile("picture"), addLink)
router.get('/mylink', auth, getLinkId)
router.get('/getlink/:id', getLink)
router.patch('/mylink/:id', uploadFile("picture"), updateLink)
router.delete('/mylink/:id', deleteLink)

router.post('/views/:id', addView)
router.get('/views/:id', getViewId)
router.patch('/views/:id', updateView)

module.exports = router;