// 7ae71cd3-b839-4065-b7cf-1ca1f61bfbea
import fetch from 'isomorphic-fetch'
import { Component } from 'react'
import  AppTheme  from './AppTheme'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import MyLocation from 'material-ui/svg-icons/maps/my-location';
import Dialog from 'material-ui/Dialog';
import { createPerson } from '../../lib/AxiosHelper'
import parameterize from '../../lib/parameterize'

import Female from 'react-icons/lib/fa/female'
import Male from 'react-icons/lib/fa/male'
import palette from '../../stylesheets/ui.scss'



export class Login extends Component {
  state = {
    openAlert: true,
    step: 1,
    loading_location: false,
    sendingRequest: false,
    nameFieldError: 'This field is required',
    ageFieldError: 'This field is required',
    gender: 'F'
  }

  inventoryHandler = (field, value) => {
    this.setState({[field]: value});
  }

  setUser = (uuid) => {
    fetch(`http://zssn-backend-example.herokuapp.com/api/people/${uuid}`)
      .then(response => response.json())
      .then(user => this.setState({user}))
  }

  nextStep = () => {
    const { nameFieldError, ageFieldError, gender } = this.state
    if (!(nameFieldError || ageFieldError) ) {
      this.setState({step: 2})
    }
  }

  submit = () => {
    this.setState({sendingRequest: true})

    const { waterFieldError, foodFieldError, medicationFieldError,
      ammunitionFieldError } = this.state

    if (waterFieldError || foodFieldError || medicationFieldError
      || ammunitionFieldError) {
      this.setState({sendingRequest: false})
      alert("There are errors in the form.");
      return;
    }

    const {name, age, gender,
      water, food, medication, ammunition} = this.state;

    var lonlat = null;

    if (this.state.position) {
      const {position: {latitude, longitude}} = this.state
      lonlat = "POINT (" + longitude + " " + latitude + ")"
    }

    const items = { Water: water || 0, Food: food || 0,
      Medication: medication || 0, Ammunition: ammunition || 0 }

    const json =
    {
      person: { name, age, gender, lonlat },
      items: Object.keys(items).map(k => `${k}:${items[k]}`).join(', ')
    }

    this.props.handleUser("a116b327-6d49-4460-b0c0-0817e2da528a");
  //   var promiseObj = createPerson(parameterize(json));
  //   promiseObj
  //     .then(response => {
  //       if (response.status == 201) {
  //         () => props.handleUser(response.data.id);
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         this.setState({
  //           sendingRequest: false,
  //           alertMessage: "Your info couldn't be salved, please \
  //           check for errors in the form",
  //           step: 1,
  //           ...this.organizeErrorResponse(error.response.data)
  //         })
  //       }else if (error.request) {
  //         this.setState({
  //           sendingRequest: false,
  //           alertMessage: 'We are sorry, it seems like there was a network \
  //           error, try again in a few minutes'})
  //       }
  //     }
  //   )
  }

  organizeErrorResponse = (dataObj) => {
    var errors = {}
    for (var item in dataObj) {
      errors[`${item}FieldError`] = dataObj[item].toString()
    }
    return errors;
  }

  inventory = () => {
    const {water, food, medication, ammunition } = this.state
    return {water, food, medication, ammunition}
  }

  getMyLocation = (event) => {
    event.preventDefault();
    this.setState({loading_location: true})
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
        this.setState({loading_location: false})
        return;
      });
    }else{
      alert("error geolocation")
    }
  }

  setErrorMessage = (message, field) => {
    this.state[field] != message ? this.setState({[field]: message}) : null
  }

  render = () => {
    const alert =
      <AppTheme component={Dialog} modal={false} open={this.state.openAlert}>
        <p>{this.state.alertMessage}</p>
        <hr/>
        <RaisedButton secondary={true} label="Ok" style={{float: 'right'}}
          onClick={(e) => this.setState({alertMessage: undefined})}/>
      </AppTheme>

    return(
        <form className="login-form">
          {this.state.alertMessage ? alert : null}
          {this.state.sendingRequest ? <div id="loading">
            <AppTheme component={CircularProgress}
              size={100}
              thickness={5}
              color={palette.accent_color_dark}/>
          </div> : null}
          <AppTheme component={Paper}
            style={{padding: 16, zDepth: 5}}>
          {this.state.step == 1 ?
          <div className="personal-info">

          <h2>Hey! you seem to be new here, tell us who you are.</h2>

          <AppTheme
            component={TextField}
            required
            id="name"
            defaultValue={this.state.name}
            type="text"
            hintText="Hi, what's your name?"
            floatingLabelText="Full Name *"
            floatingLabelFixed={false}
            errorStyle={{borderColor: 'brown !important'}}
            errorText={this.state.nameFieldError}
            onBlur={(event) => this.setState({name: event.target.value})}
            onChange={(e, newValue) => isValid(newValue) ?
              this.setErrorMessage(undefined, 'nameFieldError') :
              this.setErrorMessage("This field is required", 'nameFieldError') }
            fullWidth={true} />

          <AppTheme
            component={TextField}
            required
            id="age"
            defaultValue={this.state.age}
            type="text"
            hintText="How old are you?"
            floatingLabelText="Age *"
            floatingLabelFixed={false}
            errorText={this.state.ageFieldError}
            onBlur={(event) => validateIntegerField(event.target.value).valid ?
              this.setState({age: event.target.value}) :
              this.setState({age: undefined}) }

            onChange={(e, newValue) => {
              var validation = validateIntegerField(newValue);
              this.setErrorMessage(validation.message, 'ageFieldError')
            }}
            fullWidth={true} />

          <div id="gender-checkbox">
            <AppTheme
              component={RadioButtonGroup}
              defaultSelected={this.state.gender}
              className="gender-checkbox"
              name="gender"
              labelPosition="right"
              style={{marginTop: 14, marginBottom: 14, width: "66%",
              display: "inline-block"}}
              defaultSelected={this.state.gender}
              onChange={(event) => this.setState({gender: event.target.value})}>

              <RadioButton
                value="F"
                label="I'm a female"
              />
              <RadioButton
                value="M"
                label="I'm a male"
              />
            </AppTheme>

            {!this.state.gender ? null
              : this.state.gender === 'F' ?
                <Female style={{fontSize: 50, color: palette.accent_color}}/>
                : <Male style={{fontSize: 50, color: palette.accent_color}}/>}
          </div>


          {this.state.loading_location ?
            <CircularProgress /> :
            <LocationElement position={this.state.position}
              getMyLocation={this.getMyLocation}/> }

          <hr/>

          <div>
            <AppTheme
              component={RaisedButton}
              secondary={true}
              style={{float: 'right'}}
              label="Next"
              onClick={ () => this.nextStep() }/>
          </div>

          </div>
        : <InventoryElement handler={this.inventoryHandler}
          inventory={this.inventory()}
          errorHandler={this.setErrorMessage}
          waterFieldError={this.state.waterFieldError}
          foodFieldError={this.state.foodFieldError}
          medicationFieldError={this.state.medicationFieldError}
          ammunitionFieldError={this.state.ammunitionFieldError}
          submitHandler={this.submit}
          />}

        </AppTheme>
        </form>

    );
  }
}

const LocationElement = (props) => (
props.position ?
  <div>
    <AppTheme
      component={TextField}
      id="location"
      disabled={true}
      type="text"
      value={`(${props.position.latitude}, ${props.position.longitude})`}
      floatingLabelText="Location"
      floatingLabelFixed={false}
      fullWidth={true} />
  </div> :

  <div>
    <h3>One more thing, we need to know your location...</h3>
    <AppTheme
      component={RaisedButton}
      secondary={true}
      label="Get my Location"
      labelPosition='before'
      fullWidth={true}
      icon={<MyLocation />}
      onClick={(e) => props.getMyLocation(e) } />
  </div>
);

const InventoryElement = (props) => {
  const {water, food, medication, ammunition} = props.inventory;
  return(
    <div className="inventory-form">
      <h3>Can you describe to us your inventory?</h3>

      <AppTheme
        component={TextField}
        id="water"
        defaultValue={water}
        type="text"
        floatingLabelText="Water Bottles"
        floatingLabelFixed={false}
        fullWidth={true}
        errorText={props.waterFieldError}
        onBlur={(event) => validateIntegerField(event.target.value).valid ?
          props.handler('water',event.target.value) :
          props.handler('water',undefined) }
        onChange={(e, newValue) => {
          var validation = validateIntegerField(newValue, false);
          props.errorHandler(validation.message, 'waterFieldError')
        }}
      />
      <AppTheme
        component={TextField}
        id="food"
        defaultValue={food}
        type="text"
        floatingLabelText="Food"
        floatingLabelFixed={false}
        fullWidth={true}
        errorText={props.foodFieldError}
        onBlur={(event) => validateIntegerField(event.target.value).valid ?
          props.handler('food',event.target.value) :
          props.handler('food',undefined) }
        onChange={(e, newValue) => {
          var validation = validateIntegerField(newValue, false);
          props.errorHandler(validation.message, 'foodFieldError')
        }}
      />
      <AppTheme
        component={TextField}
        id="medication"
        type="text"
        defaultValue={medication}
        floatingLabelText="Medication"
        floatingLabelFixed={false}
        fullWidth={true}
        errorText={props.medicationFieldError}
        onBlur={(event) => validateIntegerField(event.target.value).valid ?
          props.handler('medication',event.target.value) :
          props.handler('medication',undefined) }
        onChange={(e, newValue) => {
          var validation = validateIntegerField(newValue, false);
          props.errorHandler(validation.message, 'medicationFieldError')
        }}
      />
      <AppTheme
        component={TextField}
        id="ammunition"
        defaultValue={ammunition}
        type="text"
        floatingLabelText="Ammunition"
        floatingLabelFixed={false}
        fullWidth={true}
        errorText={props.ammunitionFieldError}
        onBlur={(event) => validateIntegerField(event.target.value).valid ?
          props.handler('ammunition',event.target.value) :
          props.handler('ammunition',undefined) }
        onChange={(e, newValue) => {
          var validation = validateIntegerField(newValue, false);
          props.errorHandler(validation.message, 'ammunitionFieldError')
        }}
      />

      <hr/>
      <AppTheme
        component={RaisedButton}
        secondary={true}
        style={{float: 'right'}}
        label="Create"
        onClick={() => props.submitHandler()}/>

      <AppTheme
        component={RaisedButton}
        secondary={true}
        style={{float: 'left'}}
        label="Back"
        onClick={ () => props.handler('step', 1) }/>
    </div>
  );
}

const isValid = (value) => (!(value == "" || typeof value == "undefined"));

const validateIntegerField = (value, required=true, isInteger=true) => {
  if(required && value == "" || typeof value == "undefined"){
    return {valid: false, message: 'This field is required'};
  }else if( isInteger && isNaN(value) || !Number.isInteger( (parseFloat( value ) ) ) ){
    return {valid: false, message: 'Must be an integer number'};
  }else{
    return {valid: true, message: undefined};
  }
}
