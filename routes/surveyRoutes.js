const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredit')
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
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
            const result  = await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            resp.send(user);
        }catch(err){
            resp.status(422).send(err)
        }
    });
    app.post('/api/surveys/webhooks',(req,resp)=>{
        const p = new Path('/api/surveys/:surveyId/:choice');
        const events = req.body.map(({url, email})=>{
            const match = p.test(new URL(url).pathname);
            if(match){
                return {email, surveyId: match.surveyId, choice: match.choice}
            }
        })
        const compactEvents = events.filter(Boolean)
        const uniqueEvents = [...new Set(compactEvents)];
        uniqueEvents.forEach(({surveyId,email,choice})=>{
            Survey.updateOne({
                _id : surveyId,
                recipients : {
                    $elemMatch : { email:email, responded : false}
                }
            },{
                $inc :{[choice]: 1},
                $set :{'recipients.$.responded' : true}
            }).exec();
        })
        resp.send({});
    })
}