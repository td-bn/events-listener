const { ethers } = require("hardhat");

const deploy = async () => {
    const Person = await ethers.getContractFactory("Person")
    const contract = await Person.deploy()
    
    console.log("Deployed Contract to ", contract.address);
}

deploy()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})