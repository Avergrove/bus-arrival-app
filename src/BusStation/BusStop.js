import React, { Component } from "react";
import { ArrivalList } from "./ArrivalList";
import { SearchForm } from "./SearchForm";
import BusStopBO from './businessObjects/BusStopBO'
import './BusStop.css';
import axios from 'axios';

export class BusStop extends Component {

    constructor(props) {
        super(props);
        this.handleBusStopNumberSubmit = this.handleBusStopNumberSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            busStopNumber: '',
            arrivalList: {},
            busStops: {},
            isArrivalListReady: false,
            isFetchingArrivalList: false,
            lastUpdate: new Date()
        });

        this.fetchBusStopsFromDummyData();
    }

    render() {
        if (this.state != null) {
            return (
                <div id="busArrivalApp">
                    <div id="logo">BUS ARRIVAL APP</div>
                    {this.renderBusStopHint()}
                    <div className="busStopContainer">
                        <SearchForm onBusStopNumberSubmit={this.handleBusStopNumberSubmit}></SearchForm>
                        <div id="arrivalListContainer" className="container">
                            <ArrivalList isFetching={this.state.isFetchingArrivalList}
                                isArrivalListReady={this.state.isArrivalListReady}
                                arrivalList={this.state.arrivalList}
                                busStopNumber={this.state.busStopNumber}
                                busStop={this.getBusStop(this.state.busStopNumber)}
                                lastUpdate={this.state.lastUpdate}
                            ></ArrivalList>
                        </div>
                    </div>
                </div>

            );
        }

        else {
            return <div></div>
        }
    }

    renderBusStopHint() {
        if (this.state.busStopNumber === '') {
            return (<div id="hint">Search for a bus station number (e.g. "12031")</div>);
        }

        else {
            return;
        }
    }

    handleBusStopNumberSubmit(bStationNumber) {
        // Configure the fetch between from LTA and from dummy when testing here!
        this.setState({
            busStopNumber: bStationNumber,
            isFetchingArrivalList: true
        }, this.fetchJsonFromLTA); // Note: Make sure to NOT use a bracket.
    }

    // Fetches the JSON file from LTA
    fetchJsonFromLTA() {
        BusStopBO.fetchBusArrivalFromLTA(this.state.busStopNumber).then((data) => {
            this.setState({ arrivalList: data, isArrivalListReady: true }, this.setState({ isFetchingArrivalList: false }))
        })
    }

    // Parses the JSON sample file as provided by LTA and returns as a JSON object
    fetchBusArrivalWithDummyData() {
        BusStopBO.fetchBusArrivalWithDummyData().then((data) => this.setState({
            arrivalList: data,
            isArrivalListReady: true,
            lastUpdate: new Date(),
            isFetchingArrivalList: false
        })
        )
    }

    // Retrieves all the bus stations available in Singapore using the provided dummy data.
    fetchBusStopsFromDummyData() {
        var data = require('./dummyJSON/BusStopDummy.json');
        this.setState({ busStops: data, lastUpdate: new Date() });
    }

    // Returns the corresponding bus station object given the bus station number from the list.
    getBusStop(busStopNumber) {
        if (this.state.busStops.value !== undefined) {
            return (this.state.busStops.value.find(busStop => {
                return busStop.BusStopCode === busStopNumber
            }));
        }

        else {
            return {};
        }
    }
}