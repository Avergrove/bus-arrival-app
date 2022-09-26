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
                <div className="busStationContainer">
                    <SearchForm onBusStationNumberSubmit={this.handleBusStationNumberSubmit}></SearchForm>
                    <ArrivalList isArrivalListReady={this.state.isArrivalListReady} arrivalList={this.state.arrivalList}></ArrivalList>
                </div>
            </div>
        );
    }

    handleBusStationNumberSubmit(busStationNumber) {
        this.setState({ busStationNumber: busStationNumber }, this.fetchJsonFromLTA);
    }

    // Fetches the JSON file from LTA
    fetchJsonFromLTA() {

        // Constants
        var proxyServerURL = "https://us-central1-elite-bird-363603.cloudfunctions.net/googleCorsFunction"; 
        var localHostURL = "http://localhost:8080";

        var ltaURL = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2"
        var ltaURL = ltaURL.concat("?BusStopCode=" + this.state.busStationNumber);

        const config = {
            headers: {
                "TargetURL": ltaURL
            }
        }

        axios.get(localHostURL, config)
            .then(res => {
                console.log("API has returned results: " + res);
                this.setState({ arrivalList: res.data, isArrivalListReady: true});
            })
    }

    // Parses the JSON sample file as provided by LTA and returns as a JSON object
    fetchBusArrivalWithDummyData() {
        var data = require('../BusStation/BusArrivalDummy.json');
        this.setState({ arrivalList: data, isArrivalListReady: true });
    }
}