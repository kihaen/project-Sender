import _ from "lodash";
import React,{Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import surveyField from './surveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS =[
    { name:"title", label:"Survey Title", noValue : "Please provide a title!"},
    { name:"subject", label:"Subject Line", noValue : "Please provide a subject!"},
    { name:"body", label:"Email Body", noValue : "Please provide a body!"},
    { name:"emails", label:"Receipient List", noValue : "Please provide recepients!"}
]

class SurveyForm extends Component{
    renderFields(){
       return _.map(FIELDS, ({label, name}) =>{
            return <Field 
                        key={name} 
                        component ={surveyField} 
                        type="text" 
                        label={label} 
                        name={name} 
                    />
       });
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.props.handleSubmit(values => console.log(values))}>
                    {/* <Field 
                        type="text"
                        name="surveyTitle"
                        component="input"
                    /> */}
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors = {}

    errors.emails = validateEmails(values.emails|| '');
    
    _.forEach(FIELDS,({name, noValue})=>{
        if(!values[name]){
            errors[name] = noValue
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form : 'surveyForm'
})(SurveyForm);