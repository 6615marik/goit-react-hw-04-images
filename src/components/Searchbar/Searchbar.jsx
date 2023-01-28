import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export const SearchBar = ({ onSubmitHandler }) => {
  const [name, setName] = useState('');

  const handlechangeImput = e => {
    const { value } = e.currentTarget;
    setName(value.toLowerCase());
  };

  const handlechangeForm = e => {
    e.preventDefault();

    if (name.trim() === '') {
      Notiflix.Notify.warning('Enter something first to search for images!');
      return;
    }
    // console.log(this.state.name);
    onSubmitHandler(name);
    setName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handlechangeForm}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          value={name}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handlechangeImput}
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
};
