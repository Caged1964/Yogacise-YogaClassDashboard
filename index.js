if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Joi = require('joi');

const User = require('./models/user');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const CompletePayment = require('./utils/completePayment');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yogacise'

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Mongo Database Connected");
    })
    .catch((err) => {
        console.log("Database Connection Error : ");
        console.log(err);
    })

app.engine('ejs',ejsMate)    //there are many engines to run/parse ejs , this tell express that we want to use ejs-mate engine instead of default one
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const validationCheck = (req,res,next) =>{
    const userSchema = Joi.object({
        user : Joi.object({
            name : Joi.string().required(),
            age : Joi.number().required().min(18).max(65),
            address : Joi.string().required(),
            phoneNumber : Joi.string().required(),
            email : Joi.string().required(),
            currentBatch : Joi.string().required()
        }).required()
    })
    const {error} = userSchema.validate(req.body);
    if(error){
        const message = error.details.map(el=>el.message).join(',');
        throw new ExpressError(message,400);
    }
    else{
        next();
    }
}

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/users', wrapAsync(async(req,res)=>{
    const users = await User.find({});
    res.render('users/index',{users});
}))

app.get('/users/new', wrapAsync(async(req,res)=>{
    res.render('users/new');
}))

app.post('/users', validationCheck, wrapAsync(async(req,res)=>{
    
    const user = new User(req.body.user);
    await user.save();
    const paymentDetails = { amount: 500 };
    const paymentResponse = CompletePayment(user, paymentDetails);
    if (paymentResponse.success) {
        user.paymentStatus = true;
        await user.save();
      } else {
        const mssg = 'Payment failed. Please try again.';
        throw new ExpressError(mssg,400);
      }
    res.redirect(`/users/${user._id}`);
}))

app.get('/users/:id', wrapAsync(async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.render('users/detail',{user});
}))

app.get('/users/:id/edit',wrapAsync(async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.render('users/edit',{user});
}))

app.put('/users/:id', validationCheck, wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {...req.body.user})   // we are saving all in array called "user",  so just spreading it will work  
    res.redirect(`/users/${user._id}`);
}))

app.delete('/users/:id', wrapAsync(async(req,res)=>{
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/users');
}))

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})

app.use((err,req,res,next)=>{
    const {statusCode = 500} =err;
    if(!err.message) err.message = "Error Occured";
    res.status(statusCode).render('error',{err});
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!!!`)
})