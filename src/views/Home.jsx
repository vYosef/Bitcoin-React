import { useEffect, useState } from 'react'
import { MovesList } from '../cmps/MovesList'
import { userService } from '../services/user.service.js'
import { bitCoinService } from '../services/bitCoin.service.js'

export function Home(props) {
  const [user, setUser] = useState(null)
  const [coins, setCoins] = useState(null)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const currUser = await userService.getUser()
      const coins = await bitCoinService.getRate(currUser.coins)
      setUser(currUser)
      setCoins(coins)
    } catch (err) {
      console.log('err:', err)
    }
  }

  if (!user) return <div>Loading...</div>
  return (
    <>
      <div className='home-wrapper'>
        <section className="info">
          <h1>Hello {user.name}!</h1>
          <h3>Coins: {user.coins}</h3>
          <h3>BTC: {coins}</h3>
        </section>
        <MovesList title={'Your last 3 Moves:'} movesList={user.moves} />
      </div>
    </>
  )
}
