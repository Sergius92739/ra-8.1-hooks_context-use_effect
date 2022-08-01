import { useState } from "react";
import ListItem from "./ListItem/ListItem";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

export default function List(props) {
  const { list, infoHandler } = props;
  const [selected, setSelected] = useState(null);

  const selectedHandler = (id) => setSelected(id);

  return (
    <ul className="app__list list">
      {list.map((el) => <ListItem
        key={nanoid()}
        selected={+selected === el.id}
        selectedHandler={selectedHandler}
        infoHandler={infoHandler}
        {...el} />)}
    </ul>
  )
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  infoHandler: PropTypes.func.isRequired
}
