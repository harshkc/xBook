import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {useBookSearch, useRefetchBookSearchQuery} from 'utils/books'
import {BookRow} from 'components/book-row'
import {BookListUL, Spinner, Input} from 'components/lib'
import {Profiler} from 'components/profiler'

function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState()
  const {books, error, isLoading, isError, isSuccess} = useBookSearch(query)
  const refetchBookSearchQuery = useRefetchBookSearchQuery()

  React.useEffect(() => {
    return () => refetchBookSearchQuery()
  }, [refetchBookSearchQuery])

  function handleSearchClick(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements[0].value)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchClick}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            className="w-full"
          />
          <Tooltip label="Search Books">
            <label htmlFor="search">
              <button
                type="submit"
                className="relative bg-transparent border-0 -ml-9"
              >
                {isLoading ? (
                  <Spinner />
                ) : isError ? (
                  <FaTimes aria-label="error" className="text-danger" />
                ) : (
                  <FaSearch aria-label="search" />
                )}
              </button>
            </label>
          </Tooltip>
        </form>

        {isError ? (
          <div className="text-danger">
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div>
        {queried ? null : (
          <div className="mt-5 text-lg leading-10 text-center">
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            {isLoading ? (
              <div className="w-full m-auto">
                <Spinner />
              </div>
            ) : isSuccess && books.length ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && !books.length ? (
              <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
        {books.length ? (
          <Profiler
            id="Discover Books Screen Book List"
            metadata={{query, bookCount: books.length}}
          >
            <BookListUL className="mt-5">
              {books.map(book => (
                <li key={book.id} aria-label={book.title}>
                  <BookRow key={book.id} book={book} />
                </li>
              ))}
            </BookListUL>
          </Profiler>
        ) : queried ? (
          <div className="mt-5 text-lg text-center">
            {isLoading ? (
              <div className="w-full m-auto">
                <Spinner />
              </div>
            ) : (
              <p>
                Hmmm... I couldn't find any books with the query "{query}."
                Please try another.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export {DiscoverBooksScreen}
