import React, { Component } from 'react'

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            items: []
        }
    }

    pullLeaderboardData() {
        fetch("/leaderboard")
            .then(res => res.json())
            .then(data => this.setState({ isLoaded: true, items: data }))
    }

    componentDidMount() {
        this.pullLeaderboardData();
    }

    render() {
        const { isLoaded, error, items } = this.state;
        return (
            <div className="leaderboard">
                <h1>Leaderboard</h1>
                {isLoaded ? (
                    < div >
                        {items.map(item =>
                            <li id={item.PlayerID}>{item.PlayerID}{item.Points}</li>
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

export default Leaderboard;