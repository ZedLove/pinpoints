import React, { Fragment, useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { MapPin } from 'react-feather'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { listLogEntries } from './API'
import LogEntryForm from './LogEntryForm'

const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showEntry, setShowEntry] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 41.7577, // TODO real starting coords
    longitude: -75.4376,
    zoom: 4
  })

  const getEntries = async () => {
    const logEntries = await listLogEntries()
    setLogEntries(logEntries)
  }

  useEffect(() => {
    getEntries()
  }, []) // leave dependencies empty because this only runs once

  const showAddMarkerPopup = e => {
    setAddEntryLocation({ longitude: e.lngLat[0], latitude: e.lngLat[1] })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/zedlove/ck6raos1l5n5m1il78p7m332n'
        onViewportChange={setViewport}
        onClick={() => {
          setShowEntry({})
        }}
        onDblClick={showAddMarkerPopup}
        doubleClickZoom={false}>
        {logEntries.map(le => (
          <Fragment key={le._id}>
            <Marker latitude={le.latitude} longitude={le.longitude} className='entry-marker'>
              <MapPin
                className='map-pin'
                color='#b4d455'
                onClick={() => {
                  setShowEntry({
                    [le._id]: true
                  })
                }}
              />
            </Marker>
            {showEntry[le._id] ? (
              <Popup
                className='entry-popup'
                latitude={le.latitude}
                longitude={le.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowEntry({})}
                anchor='top'
                dynamicPosition={true}>
                <div>
                  <h3>{le.title}</h3>
                  <p>{le.description}</p>
                  <small>Visited On: {new Date(le.visitedAt).toLocaleDateString()}</small>
                </div>
              </Popup>
            ) : null}
          </Fragment>
        ))}
        {addEntryLocation ? (
          <>
            <Marker latitude={addEntryLocation.latitude} longitude={addEntryLocation.longitude}>
              <MapPin className='map-pin' color='#b00b13' />
            </Marker>
            <Popup
              className='entry-popup'
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              dynamicPosition={true}
              captureScroll={true}>
              <LogEntryForm
                onClose={newEntry => {
                  setAddEntryLocation(null)
                  setShowEntry({ [newEntry._id]: true })
                  getEntries()
                }}
                location={addEntryLocation}
              />
            </Popup>
          </>
        ) : null}
      </ReactMapGL>
    </MuiPickersUtilsProvider>
  )
}

export default App
