const { ethers } = require('hardhat')
const { expect } = require("chai");

describe('Person and activites', () => {
  let person, activities

  beforeEach( async () => {
    const Person = await ethers.getContractFactory('Person')
    const Activities = await ethers.getContractFactory('Activities')
    person = await Person.deploy()
    activities = await Activities.deploy()
  })

  describe('person deployement', () => {
    it('should deploy to a valid address', async () => {
      const address = person.address; 
      expect(address.length).equals(42)
    })
  })

  describe('#aDayInTheLife of person', () => {
    it('should Wake up everyday', async () => {
      const user = await ethers.getSigner()
      await expect(person.connect(user).aDayInTheLife('Vitalik'))
        .to.emit(person, 'Wake')
    })
  })

  describe('persons activities', () => {
    it('should deploy to a valid address', async () => {
      const address = activities.address; 
      expect(address.length).equals(42)
    })

    it('should Brush in #morning', async () => {
      const user = await ethers.getSigner()
      await expect(activities.connect(user).morning('Naku', 1000))
        .to.emit(activities, 'Brush')
    })

    it('should #eat Lunch', async () => {
      const user = await ethers.getSigner()
      await expect(activities.connect(user).eat('Naku', 1000, 'Pizza'))
        .to.emit(activities, 'Lunch')
    })

    it('should Play a sport in the #evening', async () => {
      const user = await ethers.getSigner()
      await expect(activities.connect(user).evening('Naku', 1000, 'Ultimate Frisbee'))
        .to.emit(activities, 'Play')
    })
  })
})