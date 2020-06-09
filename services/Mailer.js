const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
    constructor({subject, recipients}, content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('torch.auto.feedback@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body); // built in function to add the body to email! sendGrid - Requirement
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses (recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email);
        });
    }

    addClickTracking(){ // required as part of docs for sendgrid
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipients =>{
            personalize.addTo(recipients)
        })
        this.addPersonalization(personalize);
    }

    async send() { // required as to specification!
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path : '/v3/mail/send',
            body : this.toJSON(),
        });

        const response = this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;