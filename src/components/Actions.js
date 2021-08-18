import { useState } from "react"

export default function Actions({contract, provider, signer}) { 
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")

  const dayInLife = async (e) => {
    e.preventDefault()
    if (name.length < 3) {
      window.alert("Name must be at least 4 characters")
      return
    }

    setLoading(true)
    const tx = await contract.connect(signer).aDayInTheLife(name)
    const rec = await tx.wait()
    console.log('Receipt: ', rec)

    setName("")
    setLoading(false)
  }

  return (
    loading ? <div className="spinner secondary"></div> :
    <form className="action-form" onSubmit={(e) => dayInLife(e)}>
      <div className="row">
        <div className="col-sm-11 col-md-6 input-group">
          <input type="text" onChange={(e)=>setName(e.target.value)} id="Username" placeholder="Name"/>
          <button type="submit" className="primary">See day in the life!</button>
        </div>
      </div>
    </form>
  )
}
