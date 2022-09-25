import React, { Component } from "react";
import { Axios } from "axios";
import { ArrivalList } from "./ArrivalList";
import { SearchForm } from "./SearchForm";
import './BusStation.css';
import axios from 'axios';

export class BusStation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            busStationNumber: '',
            arrivalList: {},
            isArrivalListReady: false
        };
        this.handleBusStationNumberSubmit = this.handleBusStationNumberSubmit.bind(this);
    }

    render() {


        return (
            <div id="busArrivalApp">
                <h1>BUS ARRIVAL APP</h1>
                <div class="busStationContainer">
                    <SearchForm onBusStationNumberSubmit={this.handleBusStationNumberSubmit}></SearchForm>
                    <ArrivalList isArrivalListReady={this.state.isArrivalListReady} arrivalList={this.state.arrivalList}></ArrivalList>
                </div>
            </div>
        );
    }

    handleBusStationNumberSubmit(busStationNumber) {
        console.log("handleBusStationNumberSubmit- value: " + busStationNumber);
        this.setState({ busStationNumber: busStationNumber }, this.fetchJsonFromLTA);
    }

    // Fetches the JSON file from LTA
    fetchJsonFromLTA() {
        var url = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=83139"
        var url = url.concat("?BusStopCode=" + this.state.busStationNumber);
        // TODO: Implement true API fetching, also host a cloud function to hide the API key.
        this.fetchBusArrivalWithDummyData();

        axios.get(url)
            .then(res => {
                this.setState({arrivalList: res.data})
            })

    }

    // Parses the JSON sample file as provided by LTA and returns as a JSON object
    fetchBusArrivalWithDummyData() {
        var data = require('../BusStation/BusArrivalDummy.json');
        this.setState({ arrivalList: data, isArrivalListReady: true });
    }
}