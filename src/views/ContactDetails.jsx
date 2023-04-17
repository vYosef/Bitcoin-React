import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'
import { MovesList } from '../cmps/MovesList'
import { bitCoinService } from '../services/bitCoin.service'
import { TransferFunds } from '../cmps/TransferFunds'

export class ContactDetails extends Component {
  state = {
    contact: null,
    user: null,
  }

  componentDidMount() {
    this.loadContact()
    this.loadUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  loadContact = async () => {
    try {
      const contact = await contactService.getContactById(
        this.props.match.params.id
      )
      this.setState({ contact })
    } catch (error) {
      console.log('error:', error)
    }
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

  onBack = () => {
    this.props.history.push('/contacts')
  }

  render() {
    const { contact, user } = this.state
    if (!contact || !user) return <div>Loading...</div>
    let filteredMoves = user.moves.filter(move => move.toId === contact._id)
    return (
      <>
        <section className="contact-details">
          <img src={`https://robohash.org/1`} />
          <section>
            <h3>name: {contact.name}</h3>
          </section>
          <section>
            <h3>email: {contact.email}</h3>
          </section>
          <section>
            <h3>phone: {contact.phone}</h3>
          </section>
          <button onClick={this.onBack}>Back</button>
        </section>
        <TransferFunds
          contact={contact}
          maxCoins={user.coins}
          onTransferCoins={this.onTransferCoins}
        />
        <MovesList title={'Your Moves:'} movesList={filteredMoves}/>
      </>
    )
  }
}
