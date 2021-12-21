import * as React from 'react'
import debounceFn from 'debounce-fn'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useParams} from 'react-router-dom'
import {useBook} from 'utils/books'
import {formatDate} from 'utils/misc'
import {useListItem, useUpdateListItem} from 'utils/list-items'
import {Spinner, Textarea, ErrorMessage} from 'components/lib'
import {Rating} from 'components/rating'
import {Profiler} from 'components/profiler'
import {StatusButtons} from 'components/status-buttons'

function BookScreen() {
  const {bookId} = useParams()
  const book = useBook(bookId)
  const listItem = useListItem(bookId)

  const {title, author, coverImageUrl, publisher, synopsis} = book

  return (
    <Profiler id="Book Screen" metadata={{bookId, listItemId: listItem?.id}}>
      <div>
        <div
          className="flex flex-col md:grid md:gap-8 md:mb-4"
          style={{gridTemplateColumns: '1fr 2fr'}}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            className="w-48 mx-auto sm:m-0"
          />
          <div>
            <div className="relative flex">
              <div className="justify-between flex-1">
                <h1 className="h2">{title}</h1>
                <div>
                  <i>{author}</i>
                  <span>{'   |   '}</span>
                  <i>{publisher}</i>
                </div>
              </div>
              <div className="right-0 flex flex-col justify-between h-full text-secondary80">
                {book.loadingBook ? null : <StatusButtons book={book} />}
              </div>
            </div>
            <div className="mt-2.5 h-12">
              {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
              {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
            </div>
            <br />
            <p className="block whitespace-pre-line">{synopsis}</p>
          </div>
        </div>
        {!book.loadingBook && listItem ? (
          <NotesTextarea listItem={listItem} />
        ) : null}
      </div>
    </Profiler>
  )
}

function ListItemTimeframe({listItem}) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div
        aria-label={timeframeLabel}
        className="mt-1.5 flex flex-row items-center"
      >
        <FaRegCalendarAlt className="-mt-0.5 mr-1.5" />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({listItem}) {
  const [mutate, {error, isError, isLoading}] = useUpdateListItem()

  const debouncedMutate = React.useMemo(
    () => debounceFn(mutate, {wait: 300}),
    [mutate],
  )

  function handleNotesChange(e) {
    debouncedMutate({id: listItem.id, notes: e.target.value})
  }

  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="notes"
          className="inline-block mr-2.5 mt-0 mb-2 font-bold"
        >
          Notes
        </label>
        {isError ? (
          <ErrorMessage variant="inline" error={error} classes={'text-sm'} />
        ) : null}
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        style={{width: '100%', minHeight: 300}}
      />
    </React.Fragment>
  )
}

export {BookScreen}
