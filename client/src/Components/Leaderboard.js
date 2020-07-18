import React, {Component} from 'react'

class Leaderboard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoaded:false,
            error:null,
            items: []
        }
    }

    pullLeaderboardData()
    {
        fetch("/leaderboard")
        .then(res => res.json())
        .then(data => this.setState({isLoaded: true, items: data}))
    }

    componentDidMount()
    {
        this.pullLeaderboardData();
    }

    render(){
        return(
            <h1>Leaderboard</h1>
        );
    }
}

export default Leaderboard;