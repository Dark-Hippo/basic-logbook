import { useState } from 'react';
import Modal from 'react-modal';
import { useLogbook } from '../context/LogbookContext';

export const AddNewLogbookModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addLogbook } = useLogbook();

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.querySelector('#logbook-name') as HTMLInputElement).value;

    // save to database
    addLogbook(name);
    closeModal();
  }

  return (
    <>
      <button onClick={openModal}>Add new logbook</button>
      <Modal
        id='add-new-logbook'
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        appElement={document.getElementById('root') as HTMLElement}
        contentLabel='Add new logbook'
      >
        <h2>Add new logbook</h2>
        <form onSubmit={formSubmit}>
          <label htmlFor='logbook-name'>Name</label>
          <input id='logbook-name' type='text' />
          <button type='submit'>Add</button>
          <button onClick={closeModal}>Close</button>
        </form>
      </Modal>
    </>
  )
}