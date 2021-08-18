import { ethers } from "ethers";
import { useState } from "react"

import * as Activites from "../artifacts/contracts/Events.sol/Activities.json"
const address = "0x8c071289ED88f4d4668c420E77c47BA76619e732";
const abi = Activites.abi

let provider, contract

const initialize = () => {
  if (window.ethereum) {
      try {
          window.ethereum.enable().then(
            provider = new ethers.providers.Web3Provider(window.ethereum)
          )
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

  provider.on('Block', () => {
    contract.removeAllListeners()
    contract.once("Brush", (name, time, event) => {
      const s = new Set(wakey)
      s.add(name+time.toString())
      setWakey(s)
    })
    
    const bfilter = contract.filters.Play(null, null, "Basketball")
    contract.once(bfilter, (name, time, sport, event) => {
      const s = new Set(basketballers)
      s.add(name)
      setBasketballers(s)
    })

    const ffilter = contract.filters.Play(null, null, "Football")
    contract.once(ffilter, (name, time, sport, event) => {
      const s = new Set(footballers)
      s.add(name)
      setFootballers(s)
    })
  })

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
