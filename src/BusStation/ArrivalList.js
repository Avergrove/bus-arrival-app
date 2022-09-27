import React, { Component } from "react";
import "./ArrivalList.css";
import { BusArrivalAccordion } from "./BusArrivalAccordion";
import Spinner from "react-bootstrap/Spinner";

export class ArrivalList extends Component {

    constructor(props){
        super(props);
    }

    render() {
        if (!this.props.isArrivalListReady) {

            if(!this.props.isFetching){
                return <div id="arrivalList">Please enter the bus station number you're at, or <span style={{color: "blue"}}>Locate (Work-in-progress)</span> for one nearby</div>;
            }

            else {
                return <Spinner id="arrivalList" animation="border" role="status" variant="primary"></Spinner>
            }
        }

        else {
            return (
                <div id="arrivalList" className="container">
                    <div className="lastUpdated">Last updated: {this.props.lastUpdate.toString()}</div>
                    <div className="busStationTitle">{this.props.busStation.BusStopCode} - {this.props.busStation.Description} , {this.props.busStation.RoadName}</div>
                    <BusArrivalAccordion busServices={this.props.arrivalList.Services}></BusArrivalAccordion>
                </div>
            )
        }
    }
}