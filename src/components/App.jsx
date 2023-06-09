import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import FilterInput from './FilterInput';
import { nanoid } from 'nanoid';

const initialState = [
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [...initialState],
    filter: '',
  };

  formSubmitHandler = contact => {
    const { contacts } = this.state;

    if (
      contacts.some(
        storedContact =>
          storedContact.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} is already in contacts.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value.trim() });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDeleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="main-container">
        <h1 className="phonebook">Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className="contacts">Contacts</h2>
        <FilterInput value={filter} onChange={this.changeFilter} />
        <ContactList
          contactsArr={visibleContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
