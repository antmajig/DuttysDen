import React, { Component } from 'react';

class PlayerList extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    getSQLResults() {
        fetch("/playerlist")
            .then(res => res.json())
            .then(data => {
                this.setState({ items: data, isLoaded: true })
                console.log(this.state.items)
            });
    }

    componentDidMount() {
        this.getSQLResults();
    }

    render() {
        const { error, isLoaded, items } = this.state;
        return (
            <div className="PlayerList">
                <h1>Players</h1>
                {isLoaded ? (
                    < div >
                        {items.map(item =>
                            <li id={item.PlayerID}>{item.PlayerName}</li>
                        )}
                    </div>
                )
                    :
                    (<h3>Loading...</h3>)
                }
            </div>
        );
    }
}

export default PlayerList;