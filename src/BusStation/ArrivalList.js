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
                if (this.props.busStop === undefined) {
                    if (this.props.busStopNumber === "51") {
                        return(<div className="ArrivalListContainer container">👽 (There are no bus services for this very extraterrestial naruto-running number, though)</div>)
                    }

                    else if (this.props.busStopNumber === "69") {
                        return(<div className="ArrivalListContainer container">Nice! (But there's no bus results for that number....)</div>)
                    }

                    else if (this.props.busStopNumber === "420") {
                        return(<div className="ArrivalListContainer container">That's not a legal number in Singapore (Also there's no bus results for that number....)</div>)
                    }

                    else if (this.props.busStopNumber === "621") {
                        return(<div className="ArrivalListContainer container">We all know this is Monosodium Glutamate, there's nothing else really special about this number. (Also there's no bus results for that number....)</div>)
                    }

                    else if (this.props.busStopNumber === "9001") {
                        return(<div className="ArrivalListContainer container">IT'S OVER 9000 (Though there's certainly not that many buses for that number....)</div>)
                    }

                    else {
                        return (
                            <div className="ArrivalListContainer container">No results could be found for bus stop number {this.props.busStopNumber}</div>
                        )
                    }
                }

                else {
                    return (
                        <div className="ArrivalListContainer container">{this.renderAccordionList()}</div>
                    )
                }
            }

            else {
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