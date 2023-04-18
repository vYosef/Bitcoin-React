import { Component } from 'react'
import { userService } from '../services/user.service'

export class TransferFunds extends Component {
  state = {
    amount: 0,
  }

  onTransferCoins = async (ev) => {
    ev.preventDefault()
    let timeStamp = Date.now()
    const move = {
      toId: this.props.contact._id,
      to: this.props.contact.name,
      at: timeStamp,
      amount: this.state.amount,
    }
    try {
      await userService.addMove(move)
      await userService.updateUserCoins(move.amount)
      // this.props.history.push('/contacts')
    } catch (err) {
      console.log('err:', err)
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'name':
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    this.setState({ amount: value })
    // this.setState(({ userName }) => ({
    //   userName: { ...userName, [field]: value },
    // }))
  }

  render() {
    const { amount } = this.state

    return (
      <>
        <section className='transfer-funds'>
          <h3>Transfer coins to {this.props.contact.name}:</h3>
          <form onSubmit={this.onTransferCoins}>
            <label htmlFor="amount">Amount:</label>
            <input
              value={amount}
              onChange={this.handleChange}
              type="number"
              name="amount"
              id="amount"
              max={this.props.maxCoins}
            />
            <button>Transfer</button>
          </form>
        </section>
      </>
    )
  }
}
