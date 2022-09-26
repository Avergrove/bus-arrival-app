import React, { Component } from "react";
import "./ArrivalList.css";

export class ArrivalList extends Component {
    constructor(props) {
        super(props);
    }

    render() {


        if (!this.props.isArrivalListReady) {
            return <div id="arrivalList">Please enter the bus station number you're at, or <span style={{color: "blue"}}>Locate (Work-in-progress)</span> for one nearby</div>;
        }

        else {
            return (
                <div id="arrivalList">
                    <table>
                        <tbody>
                            <tr>
                                <th>Service No</th>
                                <th>Closest Arrival time</th>
                            </tr>
                            
                            {this.props.arrivalList.Services.map((service, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{service.ServiceNo}</td>
                                        <td>{this.getRemainingTime(service.NextBus.EstimatedArrival)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    // Parses time in the format YYYY-MM-ddThh:mm:ss+HH:mm into a date object.
    parseTime(time){
        var d = new Date(time);
    }

    // Retrieves a string indicating the time remaining until now
    getRemainingTime(time){
        var targetTime = new Date(time);
        var currTime = new Date();

        var diffTime = Math.abs(targetTime - currTime);
        var diffMins = Math.ceil(diffTime / (1000 * 60));
        var diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        console.log("Diff Minutes: " + diffMins);
        console.log("Diff Month: " + diffMonths);
        
        return "in " + diffMins + " minutes";
    }
}

const TIMEINMILLISECONDS = {
    SECOND: 1000,
    MINUTE: 60000,
}