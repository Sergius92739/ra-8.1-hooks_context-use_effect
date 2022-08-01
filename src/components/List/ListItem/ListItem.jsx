import PropTypes from 'prop-types';

export default function ListItem(props) {
  const { id, name, selected, selectedHandler, infoHandler } = props;

  const handleClick = (evt) => {
    const { id } = evt.target.closest('.list__item');
    const name = evt.target.textContent;
    selectedHandler(id);
    infoHandler({ id, name })
  }

  return (
    <li
      id={id}
      className={selected ? 'list__item active' : 'list__item'}>
      <a className={selected ? 'selected' : ''} onClick={handleClick} href="#">{name}</a>
    </li>
  )
}

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedHandler: PropTypes.func.isRequired,
  infoHandler: PropTypes.func.isRequired
}
