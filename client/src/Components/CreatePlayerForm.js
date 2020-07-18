import React, { Component } from 'react'
import '../index.css'
class CreatePlayerForm extends Component {

    render() {
        return (
            <div>
                <form className="player-form">
                    <label>
                        Username:
                    <input type="text" name="name" />
                    </label>
                    <label>
                        Real Name:
                    <input type="text" name="real-name" />
                    </label>
                    <label>
                        Location:
                    <input type="text" name="location" />
                    </label>
                    <input type="submit" name="submit" />
                </form>
            </div>
        )
    }
}

export default CreatePlayerForm;