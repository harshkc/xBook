import * as React from 'react'
import {Routes, Route, Link as RouterLink, useMatch} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {Button, ErrorMessage, FullPageErrorFallback} from './components/lib'
import {useAuth} from './context/auth-context'
import {ReadingListScreen} from './screens/reading-list'
import {FinishedScreen} from './screens/finished'
import {DiscoverBooksScreen} from './screens/discover'
import {BookScreen} from './screens/book'
import {NotFoundScreen} from './screens/not-found'
import '../src/styles/global.css'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      classes="h-full flex flex-col items-center justify-center"
    />
  )
}

function AuthenticatedApp() {
  const {user, logout} = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="flex items-center absolute top-2.5 right-2.5">
        {user.username}
        <Button variant="secondary" className="ml-2.5" onClick={logout}>
          Logout
        </Button>
      </div>
      <div className="grid w-full max-w-4xl gap-4 px-8 py-16 mx-auto my-0 homeScreenGrid">
        <div className="relative">
          <Nav />
        </div>
        <main className="w-full">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
  const matchClasses = match
    ? 'border-l-4 border-solid border-primary bg-secondary10'
    : 'border-l-4 border-solid border-transparent'
  return (
    <RouterLink
      className={`block py-2 pr-3.5 pl-2.5 my-1.5 mx-0 w-full h-full text-textPrimary rounded-sm hover:no-underline hover:bg-secondary10 ${matchClasses}`}
      {...props}
    />
  )
}

function Nav(params) {
  return (
    <nav className="static top-auto px-6 py-4 border border-solid rounded-sm md:sticky md:top-1 border-bg-secondary10 ">
      <ul className="p-0 list-none">
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<ReadingListScreen />} />
      <Route path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp
