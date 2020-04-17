import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';



class ByRoute extends React.Component {

  constructor() {
    super();

    this.state = {
      Route: "",
      Response: [],
      errorMsg: "",
      status: ""
    }
  }

  handleChange = (event)=> {
    console.log(this.props);
    this.setState({
      Route: event.target.value
    });
  }

  componentDidMount() {
    //The Promise returned from fetch() won’t reject on HTTP error status even if the 
    //response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), 
    //and it will only reject on network failure or if anything prevented the request from completing.

    fetch("https://svc.metrotransit.org/nextripv2/route")
    .then(response => {
      if(response.status >= 200 && response.status< 300) {
        return response.json();
      }  else {
        return Promise.reject(response);
      }
    })
    .then(
      result => {
        console.log(result);
        this.setState({
          Response: result
        });
      })
    .catch(err=>{
        console.log("inside error", err);
        this.setState({
          error: err,
          status: err.status,
          errorMsg: err.statusText
        });
    });
  }
  

  render() {

    var respone = this.state.Response;
    var helperText;
    console.log("value of this.state.error", this.state.error);
    if(this.state.status === 400) {
      helperText = <FormHelperText>{this.state.errorMsg}</FormHelperText>
    } else {
      helperText = <FormHelperText>Select a Route</FormHelperText>
    }
    

    return(<div style={{margin: '100px',
    alignContent: 'center',
    border: '10px',
    paddingLeft: '700px'
    }}>
      
      Real-time Departures
      if(error) {

      }
      <FormControl style= {{backgroundColor: "white", margin: '20px', width: '450px', paddingTop: '10px'}}>
        <InputLabel id="demo-simple-select-label">Route</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.Route}
          onChange={this.handleChange}
        >
          {respone.length && respone.map(item=>{
            return <MenuItem value={item.RouteId}>{item.Description}</MenuItem>
          })}
        </Select>
        { helperText }
      </FormControl>
    </div>);
  }
}




export default ByRoute;
