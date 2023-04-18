import { useEffect, useState, useCallback } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
// import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'

export function ContactPage(props) {
    const contacts = useSelector((storeState) => storeState.contactModule.contacts)
    const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)
    const dispatch = useDispatch()
//   const [contacts, setContacts] = useState(null)
//   const [selectedContactId, setSelectedContactId] = useState(null)
//   const [filterBy, setFilterBy] = useState({
//     name: '',
//   })

  useEffect(() => {
    dispatch(loadContacts())
    // loadContacts()
  }, [])

  const onRemoveContact = useCallback(async (contactId) => {
    try {
        dispatch(removeContact(contactId))
    } catch (error) {
        console.log('error:', error)
    }
}, [])

const onChangeFilter = (filterBy) => {
    dispatch(setFilterBy(filterBy))
    dispatch(loadContacts())
}

//   const loadContacts = async () => {
//     try {
//       const contacts = await contactService.getContacts(filterBy)
//       setContacts(contacts)
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }

//   const onRemoveContact = async (contactId) => {
//     try {
//       await contactService.deleteContact(contactId)
//       setContacts(contacts.filter((contact) => contact._id !== contactId))
//     } catch (error) {
//       console.log('error:', error)
//     }
//   }

//   const onChangeFilter = (filterBy) => {
//     setFilterBy({ ...filterBy })
//   }

  if (!contacts) return <div>Loading...</div>
  return (
    <section className="contact-index">
      <>
        <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
        <Link to={'/contacts/edit'}>Add a Contact</Link>
        <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
      </>
    </section>
  )
}
