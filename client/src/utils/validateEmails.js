const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default(emails) =>{
    const invalidEmails = emails
    .split(',')
    .map((element)=> element.trim())
    .filter((email)=> re.test(email) === false && email.length > 0)

    if (invalidEmails.length){
        return `These emails are invalid : ${invalidEmails}`;
    }
    return;
}