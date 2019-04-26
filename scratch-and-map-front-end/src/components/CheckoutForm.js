import React, { Component } from 'react';
import axios from 'axios'
import {CardElement, injectStripe} from 'react-stripe-elements';
import '../styles/CheckoutForm.css';
import { Form, Button, Menu, Dropdown } from "semantic-ui-react";
import _ from 'lodash';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this)
    this.state = {
      options: [],
      stateOptions: [],
      completed: false,
    }
  }


  componentDidMount() {
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(res => {
        res.data.forEach(country => {
            let countryOptions = {
                key: country.alpha3Code,
                value: country.alpha3Code,
                text: country.name
            }
            this.state.options.push(countryOptions);
        })
            
  })
    axios.get(`https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json`)
      .then(res => {
        res.data.forEach(state => {
          let stateOptions = {
            key: state.abbreviation,
            value: state.abbreviation,
            text: state.name,
          }
            this.state.stateOptions.push(stateOptions)
        })
    
    })
}

handleInputChange = e => {
  this.setState({ [e.target.name]: e.target.value });
};

async submit(ev) {
  console.log('clicked')
  let {token} = await this.props.stripe.createToken({name: "Name"});
  let response = await fetch(`${process.env.DATABASE_URL}/api/charge`, {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });
  console.log('PAYMENT',token)
  if (response.ok) console.log("Purchase Complete!")
}



  render() {
   
    return (
      <Form className="ui form">
        <h1 className="ui centered">Enter Personal Payment Details</h1>
        <Form.Group widths='equal'>
      <Form.Input onChange={this.handleInputChange} fluid name='firstName' placeholder='First name' />
      <Form.Input onChange={this.handleInputChange} fluid name='Last name' placeholder='Last name' />
      <Form.Input onChange={this.handleInputChange} type="email" fluid name='email' placeholder='email' />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Input onChange={this.handleInputChange} fluid name='Street Address' placeholder='Street Address' />
      <Form.Input onChange={this.handleInputChange} fluid name='City' placeholder='city' />
      <Form.Input onChange={this.handleInputChange} fluid name='Zip Code' placeholder='Zip Code' />
    </Form.Group>


<Form.Group >
<Dropdown
    placeholder='Select State'
    fluid
    search
    selection
    className='StripeDropdown'
    options={this.state.stateOptions}
    />

<Dropdown
    placeholder='Select Country'
    fluid
    search
    selection
    className='StripeDropdown'
    options={this.state.options}
    />
</Form.Group>

<CardElement className='StripeElement' placeholder='Card info' input/>
    
        <Button>Back</Button>
        <Button onClick={this.submit}>Submit</Button>
</Form>
    );
  }
}

export default injectStripe(CheckoutForm);
