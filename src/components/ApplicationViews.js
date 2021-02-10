import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventProvider } from "./event/EventProvider.js"
import { EventList } from "./event/EventsList.js"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList {...props} />
                </Route>
            </GameProvider>

            <GameProvider>
                <EventProvider>
                    <Route exact path="/games/new">
                        <GameForm {...props} />
                    </Route>
                </EventProvider>
            </GameProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList {...props} />
                </Route>
            </EventProvider>
        </main>
    </>
}