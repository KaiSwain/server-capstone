"use client"

import { useParams } from "next/navigation"
import { useState } from "react"

export default function deckdetails() {
    const { id } = useParams()
    const [deck, setDeck] = useState({})


    return <>
    <div> this is an id {id}</div>
    </>

}
