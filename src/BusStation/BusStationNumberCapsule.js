import { Component } from "react";
import './BusStationNumberCapsule.css'

export class BusStationNumberCapsule extends Component{
    render(){
        return(
            <span className="BusStationNumberCapsule"> {" " + this.props.busStationNumber + " "} </span>
        )
    }
}