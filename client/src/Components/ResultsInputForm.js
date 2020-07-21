import React, { Component } from 'react'


class ResultRow extends Component {
    constructor(props) {
        super(props);
        let username = "";
        let points = 0;
        let cash = 0;
        this.usernameChange = this.usernameChange.bind(this);
        this.pointsChange = this.pointsChange.bind(this);
        this.cashChange = this.cashChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        console.log(this.state)
        this.props.setRowData({
            rowId: this.props.rowId,
            username: this.username,
            points: this.points,
            cash: this.cash
        })
    }

    usernameChange(event) {
        this.username = event.target.value
        this.handleChange();
    }

    pointsChange(event) {
        this.points = event.target.value
        this.handleChange();
    }

    cashChange(event) {
        this.cash = event.target.value
        this.handleChange();
    }

    render() {
        return (
            <form>
                <label>
                    Username
                <input type="text" onChange={this.usernameChange} />
                </label>
                <label>
                    Points
                    <input type="number" onChange={this.pointsChange} />
                </label>
                <label>
                    Cash
                    <input type="number" onChange={this.cashChange} />
                </label>
            </form>
        )
    }
}

class NumberOfPlayersInput extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.numOfPlayersChange(event.target.value);
    }

    render() {
        return (
            <label>
                Number of players:
                <input type="number" onChange={this.handleChange} />
            </label>
        )
    }
}

//on page load, pull all the usernames so that we can fill our rows
//do form validation (no 2 usernames of the same value)
//check to see if the sql query executed correctly.

class ResultInputForm extends Component {
    constructor() {
        super();
        this.state = {
            numberOfPlayers: 0,
            rowData: []
        }
        this.setNumberOfPlayers = this.setNumberOfPlayers.bind(this);
        this.setRowData = this.setRowData.bind(this);
    }

    setNumberOfPlayers(numOfPlayers) {
        this.setState({ numberOfPlayers: numOfPlayers })
    }

    setRowData(row) {
        this.state.rowData[row.rowId] = row;
    }

    getRows() {
        let rows = [];
        for (let i = 0; i < this.state.numberOfPlayers; i++) {
            rows.push(<ResultRow rowId={i} setRowData={this.setRowData} />);
        }
        return rows;
    }

    render() {
        return (
            <div>
                <NumberOfPlayersInput numOfPlayersChange={this.setNumberOfPlayers} />
                <label>Game Name:</label>
                <input type="text" />
                {this.getRows()}
                <input type="submit" value="submit game" />
            </div>
        )
    }
}

export default ResultInputForm