import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchForm.css";

export class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onBusStationNumberSubmit(this.state.value);
    }

    render() {
        return (
            <div className="searchContainer">
                <form onSubmit={this.handleSubmit}>
                    <div className="searchBoxContainer">
                        <input id="searchBox" type="text" value={this.state.value} placeholder="Search Bus Station Number" onChange={this.handleChange} />
                        <button className="searchButton" type="submit" value="Submit" ><FaSearch></FaSearch></button>
                    </div>
                </form>
            </div>
        )
    }
}