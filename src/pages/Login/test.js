import '@testing-library/jest-dom'
import React from 'react'
import {render, userEvent, screen} from '@testing-library/react'
import Login from './index'

test('allows the user to login successfully', async () => {
  const fakeUserResponse = {token: 'fake_user_token'}
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse),
    })
  })

  render(<Login />)

  userEvent.change(screen.getByLabelText(/username/i), {
    target: {value: 'chuck'},
  })
  userEvent.change(screen.getByLabelText(/password/i), {
    target: {value: 'norris'},
  })

  userEvent.click(screen.getByText(/submit/i))

  const alert = await screen.findByRole('alert')

  expect(alert).toHaveTextContent(/congrats/i)
  expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
})