import React, { useState, useEffect, Fragment } from "react";
import List from "../List/List";
import Details from "../Details/Details";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default function MainPage() {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState({ id: '', name: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const infoHandler = (info) => setInfo(info);
  const loadingHandler = (value) => setLoading(value);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}users.json`)
      .then((request) => {
        return request;
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error()
        }
        return response.json();
      })
      .then((users) => {
        setList((prev) => [...prev, ...users]);
        loadingHandler(false);
        setError(null)
      })
      .catch((err) => {
        setError(err);
        loadingHandler(false)
        console.error(err);
      })
  }, []);

  return (
    <Fragment>
      {error && <Error />}
      {loading && <Loading />}
      <div className="app container">
        <List list={list} infoHandler={infoHandler} />
        {info && <Details info={info} />}
      </div>
    </Fragment>
  )
}