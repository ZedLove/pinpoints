import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createLogEntry } from './API'

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = async data => {
    try {
      setLoading(true)
      data.latitude = location.latitude
      data.longitude = location.longitude
      const created = await createLogEntry(data)
      onClose(created)
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='log-entry-form'>
      {error ? <h3 className='error'>{error}</h3> : null}
      <label htmlFor='title'>Title</label>
      <input name='title' required ref={register} />
      <label htmlFor='comments'>Comments</label>
      <textarea name='comments' rows={3} ref={register}></textarea>
      <label htmlFor='description'>Description</label>
      <textarea name='description' rows={3} ref={register}></textarea>
      <label htmlFor='image'>Image</label>
      <input name='image' ref={register} />
      <label htmlFor='visitedAt'>Visited On</label>
      <input name='visitedAt' type='date' required ref={register} />
      <label htmlFor='rating'>Rating</label>
      <input name='rating' type='number' min={0} max={10} ref={register} />
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
  )
}

export default LogEntryForm
