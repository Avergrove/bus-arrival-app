import React, { Component } from "react";
import "./ArrivalList.css";
import { BusArrivalAccordion } from "./BusArrivalAccordion";
import Spinner from "react-bootstrap/Spinner";

export class ArrivalList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.isFetching) {
            return (
                <div className="ArrivalListContainer container">{this.renderSpinner()}</div>
            )
        }

        else {
            if (this.props.isArrivalListReady) {
                return (
                    <div className="ArrivalListContainer container">{this.renderAccordionList()}</div>
                )
            }

            else{
                return;
            }
        }

    }

    renderSpinner() {
        return (
            <Spinner id="spinner" animation="border" role="status" variant="primary"></Spinner>
        );

    }

    renderAccordionList() {
        return (
            <div>
                <div className="lastUpdated"> Last updated: {this.props.lastUpdate.toString()}</div>
                <div className="busStopTitle">{this.props.busStop.BusStopCode} - {this.props.busStop.Description}, {this.props.busStop.RoadName}</div>
                <div className="BusArrivalAccordion"><BusArrivalAccordion busServices={this.props.arrivalList.Services}></BusArrivalAccordion></div>
            </div>
        )
    }
}