import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventProvider } from "./event/EventProvider.js"
import { EventList } from "./event/EventsList.js"
import { EventForm } from "./event/EventForm.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"
import { Profile } from "./auth/Profile.js"

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

            <EventProvider>
                <GameProvider>
                    <Route exact path="/events/new">
                        <EventForm {...props} />
                    </Route>
                </GameProvider>
            </EventProvider>

            <ProfileProvider>
                <EventProvider>
                    <Route exact path="/profile">
                        <Profile {...props} />
                    </Route>
                </EventProvider>
            </ProfileProvider>
        </main>
    </>
}