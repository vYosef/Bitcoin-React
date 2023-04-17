import { Component } from 'react'
import { MovesList } from '../cmps/MovesList'
import { userService } from '../services/user.service.js'
import { bitCoinService } from '../services/bitCoin.service.js'

export class Home extends Component {
  state = {
    user: null,
    coins: null
  }

  componentDidMount() {
    this.loadUser()
  }

  loadUser = async () => {
    try {
      const currUser = await userService.getUser()
      // currUser = JSON.parse(currUser)
      const coins = await bitCoinService.getRate(currUser.coins)
      this.setState({ user: currUser, coins })
    } catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    const { user, coins } = this.state
    if (!user) return <div>Loading...</div>
    return (
      <>
        <h1>Hello {user.name}!</h1>
        <h3>Coins:{user.coins}</h3>
        <h3>BTC:{coins}</h3>

        <MovesList title={'Your last 3 Moves:'} movesList={user.moves}/>
      </>
    )
  }
}
