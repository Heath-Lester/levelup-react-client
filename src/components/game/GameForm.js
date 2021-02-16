import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()

    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        maker: "",
        gameTypeId: 0,
        numberOfPlayers: 0,
        skillLevel: 1
    })

    console.log(gameTypes)

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])


        /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    // const changeGameTitleState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.title = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameMakerState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.maker = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGamePlayersState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.numberOfPlayers = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameSkillLevelState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.skillLevel = event.target.value
    //     setCurrentGame(newGameState)
    // }

    // const changeGameTypeState = (event) => {
    //     const newGameState = { ...currentGame }
    //     newGameState.gameTypeId = event.target.value
    //     setCurrentGame(newGameState)
    // }
    /* REFACTOR CHALLENGE END */


    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const changeGameState = (domEvent) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gameType">Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option name="" value="0">Select a Genre...</option>
                        {
                            gameTypes.map(type => (
                                <option name={type.id} value={type.id}>{type.type}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Max Players: </label>
                    <input type="text" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level </label>
                    <select name="skillLevel" className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}>
                        <option name="1" value="1">1</option>
                        <option name="2" value="2">2</option>
                        <option name="3" value="3">3</option>
                        <option name="4" value="4">4</option>
                        <option name="5" value="5">5</option>
                        <option name="6" value="6">6</option>
                        <option name="7" value="7">7</option>
                        <option name="8" value="8">8</option>
                        <option name="9" value="9">9</option>
                        <option name="10" value="10">10</option>
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    console.log(currentGame)
                    const game = {
                        title: currentGame.title,
                        maker: currentGame.maker,
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        skillLevel: parseInt(currentGame.skillLevel),
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-2 btn-primary">Create</button>
        </form>
    )
}