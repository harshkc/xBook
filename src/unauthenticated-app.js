/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {Input, Button, Spinner, FormGroup, ErrorMessage} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'
import {useAuth} from './context/auth-context'
import {useAsync} from './utils/hooks'

function LoginForm({onSubmit, submitButton, variant}) {
  const {isLoading, isError, error, run} = useAsync()
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
        )}
        <Button
          variant={variant}
          style={{marginLeft: '0.5rem'}}
          onClick={() => {
            //populate username and password input fields
            const dummyData = {
              username: 'Test',
              password: 'test@1234',
            }
            document.getElementById('username').value = dummyData.username
            document.getElementById('password').value = dummyData.password

            run(
              onSubmit({
                username: dummyData.username,
                password: dummyData.password,
              }),
            )
          }}
        >
          Test User
        </Button>
        {isLoading ? <Spinner css={{marginLeft: 5}} /> : null}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

function UnauthenticatedApp() {
  const {login, register} = useAuth()
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
              variant="secondary"
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
              variant="primary"
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
