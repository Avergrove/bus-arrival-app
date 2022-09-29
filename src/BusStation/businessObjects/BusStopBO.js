import { Component } from "react";
import axios from "axios";

/* 
* Business object representing the bus stop entity
 */
export default {

    /** 
    * Fetches a dummy data object promise for bus arrivals at a bus station.
    * It will always return the dummy result for bus station "12031", so no argument is needed.
    * @return {Promise} A promise that the JSON object will be returned
     */
    fetchBusArrivalWithDummyData() {
        return new Promise(resolve => {
            // Latency simulation
            setTimeout(() => {
                var data = require('../dummyJSON/BusArrivalDummy.json')
                resolve(data);
            }, 800);
        })
    },

    /** 
     * Fetches Bus Arrival information for a bus stop from LTA
     * @param {String} busStopNumber    The Bus Stop number to fetch for
     * @return {Promise} A promise that a JSON object will be returned
     */
    fetchBusArrivalFromLTA(busStopNumber) {
        return new Promise(resolve => {

            // Constants
            var proxyServerURL = "https://us-central1-elite-bird-363603.cloudfunctions.net/googleCorsFunction";
            var ltaURL = "http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2".concat("?BusStopCode=" + busStopNumber);

            const config = {
                headers: {
                    "TargetURL": ltaURL
                }
            }

            axios.get(proxyServerURL, config)
                .then(res => {
                    resolve(res.data);
                    // this.setState({ arrivalList: res.data, isArrivalListReady: true }, this.setState({ isFetchingArrivalList: false }));
                })
        });
    },
}