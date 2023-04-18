import { makeId } from './util.service'
import { storageService } from './storage.service'

export const userService = {
  getUser,
  signup,
  addMove,
  updateUserCoins
}

const users = [
  {
    _id: makeId(),
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [
      
        {
          "toId": "5a566402abce24c6bfe4699d",
          "to": "Dominique Soto",
          "at": 1681827470536,
          "amount": 4
        },
        {
          "toId": "5a566402abce24c6bfe4699d",
          "to": "Dominique Soto",
          "at": 1681827482849,
          "amount": 12
        },
        {
          "toId": "5a566402abce24c6bfe4699d",
          "to": "Dominique Soto",
          "at": 1681827482598,
          "amount": 12
        }
      
    ],
  },
]

function getUser() {
  return new Promise((resolve, reject) => {
    const user = storageService.load('loggedInUser') || users[0]
    storageService.store('loggedInUser', user)
    // user = JSON.stringify(user)
    // sessionStorage.setItem('loggedInUser', user)
    user ? resolve(user) : reject(`user not found!`)
  })
}

function signup(name) {
  console.log(name)
  return new Promise((resolve, reject) => {
    let user = {
      _id: makeId(),
      name,
      coins: 100,
      moves: [],
    }
    users.unshift(user)
    storageService.store('loggedInUser', user)
    // user = JSON.stringify(user)
    // sessionStorage.setItem('loggedInUser', user)
    resolve(user)
  })
}

function updateUserCoins(amount) {
  return new Promise((resolve, reject) => {
    const user = storageService.load('loggedInUser') || users[0]
    user.coins = user.coins - amount
    storageService.store('loggedInUser', user)
    resolve(user)
  })
}

async function addMove(move) {
  const user = await getUser()
  user.moves.push(move)
  storageService.store('loggedInUser', user)
}
