import { useState, useEffect } from "react"
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import PropTypes from 'prop-types';

export default function Datails(props) {
  const { loading, info, loadingHandler, error, errorHandler } = props;
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    loadingHandler(true);
    if (!info.id) {
      return
    }
    fetch(`${process.env.REACT_APP_BASE_URL}${info.id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong...');
        }
        return response.json();
      })
      .then((user) => {
        setFullData(user);
        loadingHandler(false);
      })
      .catch((err) => {
        errorHandler(err);
        loadingHandler(false);
        console.error(err);
      })

      return () => setFullData(null);
  }, [info.id])

  return (
    <>
      {error && <Error />}
      {loading && <Loading />}
      {fullData && <article className="app__profile profile">
        <div className="profile__img">
          <div className="profile__img-title">{info.name}</div>
          <img src={fullData.avatar} alt="" />
        </div>
        <h2 className="profile__title">{fullData.name}</h2>
        <div className="profile__city">City: {fullData.details.city}</div>
        <div className="profile__company">Company: {fullData.details.company}</div>
        <div className="profile__position">Position: {fullData.details.position}</div>
      </article>}
    </>
  )
}

Datails.propTypes = {
  loading: PropTypes.bool.isRequired, 
  info: PropTypes.object.isRequired, 
  loadingHandler: PropTypes.func.isRequired, 
  error: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]), 
  errorHandler: PropTypes.func.isRequired
}
