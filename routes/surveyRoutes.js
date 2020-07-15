const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredit')
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
//use the middleware login to check if usercheck happens to use the middleware

const Survey = mongoose.model('surveys');

module.exports = app =>{
    app.get('/api/surveys/thanks', (req,res) =>{
        res.send("Thanks for voting!")
    })
    app.post('/api/surveys', requireLogin , requireCredits , async (req,resp) =>{
        const {title, subject, body, recipients} = req.body;
        const recipientList = recipients.split(',').map((email)=>({ email : email.trim()}));
        const survey = new Survey({
            title: title,
            subject : subject,
            body : body,
            recipients : recipientList,
            _user : req.user.id,
            dateSent : Date.now()
        })
        //great place to send a email!
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            resp.send(user);
        }catch(err){
            resp.status(422).send(err)
        }
    });
}