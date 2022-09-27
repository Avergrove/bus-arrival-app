import React, { Component } from "react";
import { ArrivalList } from "./ArrivalList";
import { SearchForm } from "./SearchForm";
import './BusStation.css';
import axios from 'axios';

export class BusStation extends Component {

    constructor(props) {
        super(props);
        this.handleBusStationNumberSubmit = this.handleBusStationNumberSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            busStationNumber: '',
            arrivalList: {},
            busStations: {},
            isArrivalListReady: false,
            isFetchingArrivalList: false,
            lastUpdate: new Date()
        });

        this.fetchBusStationsFromDummyData();
    }

    render() {
        if (this.state != null) {
            return (
                <div id="busArrivalApp">
                    <div id="logo">BUS ARRIVAL APP</div>
                    {this.renderBusStationHint()}
                    <div className="busStationContainer">
                        <SearchForm onBusStationNumberSubmit={this.handleBusStationNumberSubmit}></SearchForm>
                        <div id="arrivalListContainer" className="container">
                            <ArrivalList isFetching={this.state.isFetchingArrivalList}
                                isArrivalListReady={this.state.isArrivalListReady}
                                arrivalList={this.state.arrivalList}
                                busStation={this.getBusStation(this.state.busStationNumber)}
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

    renderBusStationHint(){
        if(this.state.busStationNumber === ''){
            return(<div id="hint">Search for a bus station number (e.g. "12031")</div>);
        }

        else{
            return;
        }
    }

    handleBusStationNumberSubmit(bStationNumber) {
        // Configure the fetch between from LTA and from dummy when testing here!
        this.setState({
            busStationNumber: bStationNumber,
            isFetchingArrivalList: true
        }, this.fetchJsonFromLTA); // Note: Make sure to NOT use a bracket.
    }

    // Fetches the JSON file from LTA
    fetchJsonFromLTA() {
        // Constants
        var proxyServerURL = "https://us-central1-elite-bird-363603.cloudfunctions.net/googleCorsFunction";

        var ltaURL = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2".concat("?BusStopCode=" + this.state.busStationNumber);

        const config = {
            headers: {
                "TargetURL": ltaURL
            }
        }

        axios.get(proxyServerURL, config)
            .then(res => {
                this.setState({ arrivalList: res.data, isArrivalListReady: true }, this.setState({ isFetchingArrivalList: false }));
            })
    }

    // Parses the JSON sample file as provided by LTA and returns as a JSON object
    fetchBusArrivalWithDummyData() {
        // Latency simulation
        setTimeout(() => {
            var data = require('./dummyJSON/BusArrivalDummy.json');
            this.setState({ arrivalList: data, isArrivalListReady: true, lastUpdate: new Date(), isFetchingArrivalList: false });
        }, 800);
    }

    // Retrieves all the bus stations available in Singapore using the provided dummy data.
    fetchBusStationsFromDummyData() {
        var data = require('./dummyJSON/BusStopDummy.json');
        this.setState({ busStations: data, lastUpdate: new Date() });
    }

    // Returns the corresponding bus station object given the bus station number from the list.
    getBusStation(busStationNumber) {
        if (this.state.busStations.value !== undefined) {
            return (this.state.busStations.value.find(busStation => {
                return busStation.BusStopCode === busStationNumber
            }));
        }

        else {
            return {};
        }
    }
}