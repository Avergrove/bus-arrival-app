import React, { Component } from "react";
import "./ArrivalList.css";
import { BusArrivalAccordion } from "./BusArrivalAccordion";
import Spinner from "react-bootstrap/Spinner";

export class ArrivalList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.isArrivalListReady) {

            if (!this.props.isFetching) {
                return;
            }

            else {
                return (
                    <div className="ArrivalListContainer container">{this.renderSpinner()}</div>
                )
            }
        }

        else {
            return (
                <div className="ArrivalListContainer container">{this.renderAccordionList()}</div>
            )
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
                <div className="busStationTitle">{this.props.busStation.BusStopCode} - {this.props.busStation.Description}, {this.props.busStation.RoadName}</div>
                <div className="BusArrivalAccordion"><BusArrivalAccordion busServices={this.props.arrivalList.Services}></BusArrivalAccordion></div>
            </div>
        )
    }
}