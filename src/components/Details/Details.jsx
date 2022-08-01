import { useState, useEffect } from "react"
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import PropTypes from 'prop-types';

export default function Datails({ info }) {
  const [fullData, setFullData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!info.id) {
      return
    }
    fetch(`${process.env.REACT_APP_BASE_URL}${info.id}.json`)
      .then((request) => {
        setLoading(true);
        return request;
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong...');
        }
        return response.json();
      })
      .then((user) => {
        setFullData(user);
        setLoading(false);
        setError(null)
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
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
  loading: PropTypes.bool,
  info: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
}
