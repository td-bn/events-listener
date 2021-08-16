import { ethers } from "ethers";
import { useState, useEffect } from "react"

import * as Activites from "../artifacts/contracts/Events.sol/Activities.json"
const address = "0x0CB2518347CE99431902448BDaeE9eC4241D80b3";
const abi = Activites.abi

let signer, provider, contract

const initialize = () => {
  if (window.ethereum) {
      try {
          provider = new ethers.providers.Web3Provider(window.ethereum)
          signer = provider.getSigner();
          contract = new ethers.Contract(address, abi, provider)
      } catch (error) {
          window.alert("Permission denied")
      }
  }
  else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

const getSet = (set) => {
  const items = []
  set.forEach(i => items.push(<li key={i}>{i}</li>))
  return items
}

const getWakeUpSet = (set) => {
  const items = []
  set.forEach(i => items.push(<li key={i}>{`${i.slice(0,-4)} wakes up at ${i.slice(-4)} hours`}</li>))
  return items
}

export default function Events() {
  initialize()

  const [wakey, setWakey] = useState(new Set())
  const [basketballers, setBasketballers] = useState(new Set())
  const [footballers, setFootballers] = useState(new Set())


  contract.removeAllListeners()
  contract.on("Brush", (name, time, event) => {
    const s = new Set(wakey)
    s.add(name+time.toString())
    if (s.size === wakey.size) return
    setWakey(s)
  })
  
  const bfilter = contract.filters.Play(null, null, "Basketball")
  contract.on(bfilter, (name, time, sport, event) => {
    const s = new Set(basketballers)
    s.add(name)
    if (s.size === basketballers.size) return
    setBasketballers(s)
  })

  const ffilter = contract.filters.Play(null, null, "Football")
  contract.on(ffilter, (name, time, sport, event) => {
    const s = new Set(footballers)
    s.add(name)
    if (s.size === footballers.size) return
    setFootballers(s)
  })

  console.log(`#Listeners: ${contract.listenerCount()}`)

  return (
    <div className="row events-list">
      <div className="event-card col-sm-4">
        <h2>Wake Up Time</h2>
        <ul>{getWakeUpSet(wakey)}</ul>
      </div>
      <div className="event-card col-sm-4">
        <h2>These play football</h2>
        <ul>{getSet(footballers)}</ul>
      </div>
      <div className="event-card col-sm-4">
        <h2>These play basketball</h2>
        <ul>{getSet(basketballers)}</ul>
      </div>
    </div>
  )
}
