import _ from "lodash";
import React,{Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import surveyField from './surveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component{
    renderFields(){
       return _.map(formFields, ({label, name}) =>{
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
                <form onSubmit = {this.props.handleSubmit(this.props.onSurveySubmit)}>
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

    errors.recipients = validateEmails(values.recipients|| '');
    
    _.forEach(formFields,({name, noValue})=>{
        if(!values[name]){
            errors[name] = noValue
        }
    });

    return errors;
}
// by default destroy on unmount is true, which gets rid of all values if redirected.
export default reduxForm({
    validate,
    form : 'surveyForm',
    destroyOnUnmount : false
})(SurveyForm);