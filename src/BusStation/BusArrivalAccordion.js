import { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import { BusStationNumberCapsule } from "./BusStationNumberCapsule";

/// A class that generates an accordion when given the following properties:
/// BusServices: A list of bus services
export class BusArrivalAccordion extends Component {

    render() {
        return (
            <div>
                <Accordion alwaysOpen>
                    {this.props.busServices.sort((a, b) => parseInt(a.ServiceNo) > parseInt(b.ServiceNo) ? 1 : -1).map((busService, index) => {
                        return (
                            <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>
                                    <div style={{ float: "right" }}>
                                        <BusStationNumberCapsule busStationNumber={busService.ServiceNo}></BusStationNumberCapsule> {this.getRemainingTime(busService.NextBus.EstimatedArrival)}
                                    </div>
                                </Accordion.Header>

                                <Accordion.Body>
                                    <div>{this.getRemainingTime(busService.NextBus.EstimatedArrival)}</div>
                                    <div>{this.getRemainingTime(busService.NextBus2.EstimatedArrival)}</div>
                                    <div>{this.getRemainingTime(busService.NextBus3.EstimatedArrival)}</div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            </div>
        )

    }

    // Retrieves a string indicating the time remaining until now
    getRemainingTime(time) {
        var targetTime = new Date(time);
        var currTime = new Date();

        var diffTime = targetTime - currTime;
        var diffMins = diffTime / (1000 * 60);
        var diffHours = diffMins / 60;
        var diffDays = diffHours / 24;

        if (diffTime < 0) {
            return ` left ${Math.trunc(Math.abs(diffMins))} minutes ago`;
        }

        if (diffDays >= 1) {
            return `in ${Math.trunc(diffDays)} days`;
        }

        else if (diffHours >= 1) {
            return `in ${Math.trunc(diffHours)} hours`;
        }

        else if (diffMins >= 1) {
            return `in ${Math.trunc(diffMins)} minutes`;
        }

        else {
            return "Arrived!"
        }
    }

}