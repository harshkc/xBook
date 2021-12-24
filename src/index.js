import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {Profiler} from 'components/profiler'
import {App} from './app'
import {AppProviders} from './context'

ReactDOM.render(
  <Profiler id="App Root" phases={['mount']}>
    <AppProviders>
      <App />
    </AppProviders>
  </Profiler>,
  document.getElementById('root'),
)
