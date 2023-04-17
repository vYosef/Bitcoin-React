import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { ContactList } from '../cmps/ContactList'
// import { ContactDetails } from './ContactDetails'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'

export class ContactPage extends Component {

    state = {
        contacts: null,
        selectedContactId: null,
        filterBy: {
            name: '',
        }
    }

    componentDidMount() {
        this.loadContacts()
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        } catch (err) {
            console.log('err:', err)
        }
    }

    onRemoveContact = async (contactId) => {
        try {
            await contactService.deleteContact(contactId)
            this.setState(({ contacts }) => ({
                contacts: contacts.filter(contact => contact._id !== contactId)
            }))

        } catch (error) {
            console.log('error:', error)
        }
    }

    // onSelectContactId = (contactId) => {
    //     this.setState({ selectedContactId: contactId })
    // }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy: { ...filterBy } }, this.loadContacts)
    }

    render() {
        const { contacts, selectedContactId, filterBy } = this.state
        if (!contacts) return <div>Loading...</div>
        return (
            <section className='contact-index'>
                {/* {selectedContactId ?
                    <ContactDetails contactId={selectedContactId} onBack={(() => this.onSelectContactId(null))} /> : */}
                    <>
                        <ContactFilter filterBy={filterBy} onChangeFilter={this.onChangeFilter} />
                        <Link to={'/contacts/edit'}>Add a Contact</Link>
                        <ContactList contacts={contacts} onRemoveContact={this.onRemoveContact} /* onSelectContactId={this.onSelectContactId} */ />
                    </>
                {/* // } */}
            </section>
        )
    }
}
