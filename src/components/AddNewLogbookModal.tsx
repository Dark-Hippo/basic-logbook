import { useState } from 'react';
import Modal from 'react-modal';
import { useLogbook } from '../context/LogbookContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './AddNewLogbookModal.css';
import { useTheme } from '../context/ThemeContext';

export const AddNewLogbookModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { addLogbook } = useLogbook();
  const { theme } = useTheme();

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
      <button className='addNewLogbookButton' onClick={openModal}>
        <FontAwesomeIcon className='addNewLogbookIcon' icon={faPlus} />
        Add new logbook
      </button>
      <Modal
        id='add-new-logbook'
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        appElement={document.getElementById('root') as HTMLElement}
        contentLabel='Add new logbook'
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, content: { margin: '20px' } }}
        className={theme}
      >
        <div className="newLogbookContainer">
          <h2>Add new logbook</h2>
          <form onSubmit={formSubmit}>
            <div className="inputContainer">
              <label htmlFor='logbook-name'>Name</label>
              <input id='logbook-name' type='text' />
            </div>
            <div className="buttonContainer">
              <button type='submit'>Add</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}