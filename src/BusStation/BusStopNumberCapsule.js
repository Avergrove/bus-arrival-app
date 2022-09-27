import { Component } from "react";
import './BusStopNumberCapsule.css'

export class BusStopNumberCapsule extends Component{
    render(){
        return(
            <span className="BusStopNumberCapsule"> {" " + this.props.busStopNumber + " "} </span>
        )
    }
}