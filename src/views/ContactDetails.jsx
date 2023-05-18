import { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'
import { MovesList } from '../cmps/MovesList'
import { bitCoinService } from '../services/bitCoin.service'
import { TransferFunds } from '../cmps/TransferFunds'
import { useParams } from 'react-router-dom'

export function ContactDetails(props) {
  const [user, setUser] = useState(null)
  const [contact, setContact] = useState(null)
  const [moves, setMoves] = useState([])
  const handleAddMove = (move) => {
    setMoves((prevMoves) => [...prevMoves, move]);
  };
  const params = useParams()

  useEffect(() => {
    loadContact()
    loadUser()
  }, [params.id])

  const loadContact = async () => {
    try {
      const contact = await contactService.getContactById(params.id);
      setContact(contact);
    } catch (error) {
      console.log('error:', error);
    }
  };
  
  const loadUser = async () => {
    try {
      const currUser = await userService.getUser();
      setUser(currUser);
      setMoves(currUser.moves); // Update the moves state with the fetched data
    } catch (err) {
      console.log('err:', err);
    }
  };

  const handleTransferComplete = (move) => {
    setMoves((prevMoves) => [...prevMoves, move]); // Update the moves state by adding the new move
  };

  const onBack = () => {
    props.history.push('/contacts')
  }


    // const { contact, user } = this.state
    if (!contact || !user) return <div>Loading...</div>
    let filteredMoves = user.moves.filter((move) => move.toId === contact._id)
    return (
      <>
        <section className="contact-details">
          <section className="contact-img-wrapper">
            <img src={`https://robohash.org/${contact._id}`} />
          </section>
          <section>
            <h3>name: {contact.name}</h3>
          </section>
          <section>
            <h3>email: {contact.email}</h3>
          </section>
          <section>
            <h3>phone: {contact.phone}</h3>
          </section>
          <button onClick={onBack}>Back</button>
        </section>
        <TransferFunds onAddMove={handleAddMove}
          contact={contact}
          maxCoins={user.coins}
        />
        <MovesList title={'Your Moves:'} movesList={moves} />
      </>
    )
  
}
