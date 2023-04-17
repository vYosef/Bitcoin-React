export const userService = {
  getUser,
}

const users = [
  {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  },
]

function getUser() {
  return new Promise((resolve, reject) => {
    const user = users[0]
    user ? resolve(user) : reject(`user not found!`)
  })
}

