import { ethers } from 'ethers'

import * as Person from './artifacts/contracts/Events.sol/Person.json'
import Actions from './components/Actions'
import Events from './components/Events'
import './App.css'

const contractAddress =  "0x84058d8368f75CE10C75c1f776065c79f029c9D2"
const abi = Person.abi

let signer, provider, contract

const initialize = () => {
  if (window.ethereum) {
      try {
          provider = new ethers.providers.Web3Provider(window.ethereum)
          signer = provider.getSigner();
          contract = new ethers.Contract(contractAddress, abi, provider)
      } catch (error) {
          window.alert("Permission denied")
      }
  }
  else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}


function App() {
  initialize()

  return (
    <div className="App container">
      <div className="row header">
        <div className="col-sm-10">
          <h1>Events Listener<small>Simple dApp that fires, listens to and filters triggered events</small></h1>
        </div>  
      </div>
      <div className="row main">
        <div className="col-sm-3 actions">
          <Actions provider={provider} signer={signer} contract={contract} />
        </div>  
        <div className="col-sm-8 events">
          <Events provider={provider} signer={signer} contract={contract} />
        </div>
      </div>
    </div>
  );
}

export default App;
