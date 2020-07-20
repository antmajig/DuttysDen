import React, { Component } from 'react'


class ResultRow extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <form>
                <label>
                    Username
                <input type="text" />
                </label>
                <label>
                    Points
                    <input type="number"/>
                </label>
                <label>
                    Cash
                    <input type="number" />
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

class ResultInputForm extends Component {
    constructor() {
        super();
        this.state ={
            numberOfPlayers: 0,
            rowData: []
        }
        this.setNumberOfPlayers = this.setNumberOfPlayers.bind(this);
        this.setRowData = this.setRowData.bind(this);
    }

    setNumberOfPlayers(numOfPlayers)
    {
        this.setState({numberOfPlayers: numOfPlayers})
    }

    setRowData(row){
        var index = this.state.rowData.indexOf(row.Username);     
        if(index === -1){
            this.setState.rowData.push(row);
        }
        else{
            this.state.rowData[index] = row;
        }
    }

    getRows(){
        let rows = [];
        for(var i = 0; i<this.state.numberOfPlayers; i++){
            rows.push(<ResultRow setRowData={this.setRowData} />);
        }
        return rows;
    }
    
    render() {
        return (
            <div>
                <NumberOfPlayersInput numOfPlayersChange={this.setNumberOfPlayers} />
                <label>
                    Game Name:
                    <input type="text"/>
                </label>
                {this.getRows()}
                <input type="submit" value="submit game" />
            </div>
        )
    }
}

export default ResultInputForm