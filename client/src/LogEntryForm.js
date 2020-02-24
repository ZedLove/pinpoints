import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { DatePicker } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import { Controller, useForm } from 'react-hook-form'

import { createLogEntry } from './API'

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { control, register, handleSubmit, watch, errors } = useForm()

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
    <Container className='log-entry-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error ? <h3 className='error'>{error}</h3> : null}
        <TextField
          name='title'
          required
          label='Title'
          inputRef={register}
          fullWidth
          className='field'
        />
        <TextField
          name='comments'
          label='Comments'
          rows={3}
          multiline
          inputRef={register}
          fullWidth
          className='field'
        />
        <TextField
          name='description'
          label='Description'
          rows={3}
          multiline
          inputRef={register}
          fullWidth
          className='field'
        />
        <TextField name='image' label='Image' inputRef={register} fullWidth />
        <Controller
          as={<DatePicker />}
          name='visitedAt'
          label='Visited On'
          control={control}
          onChange={([selectedDate]) => {
            // React Select return object instead of value for selection
            return { value: selectedDate }
          }}
          required
          fullWidth
          defaultValue={null}
        />
        <TextField
          name='rating'
          type='number'
          label='Rating'
          min={0}
          max={10}
          inputRef={register}
          fullWidth
        />
        <Button type='submit' variant='contained' disabled={loading}>
          {loading ? 'Loading...' : 'Create Entry'}
        </Button>
      </form>
    </Container>
  )
}

export default LogEntryForm
