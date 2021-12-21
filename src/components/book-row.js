import * as React from 'react'
import {Link} from 'react-router-dom'
import {useListItem} from 'utils/list-items'
import {StatusButtons} from './status-buttons'
import {Rating} from './rating'

function BookRow({book}) {
  const {title, author, coverImageUrl} = book
  const listItem = useListItem(book.id)

  const id = `book-row-book-${book.id}`

  return (
    <div className="relative flex items-center justify-center">
      <Link
        aria-labelledby={id}
        to={`/book/${book.id}`}
        className="grid h-auto gap-5 p-5 border border-r-2 border-solid border-secondary20 hover:text-gray-800 hover:shadow-md hover:no-underline focus:shadow-md focus:no-underline"
        style={{
          flexGrow: 2,
          gridTemplateColumns: '140px 1fr',
        }}
      >
        <div className="w-24 md:w-36">
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            className="w-full max-h-full p-2"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <h5 className="my-0 text-primary h5" id={id}>
                {title}
              </h5>
              {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
            </div>
            <div className="ml-2.5">
              <div className="mt-1.5 italic text-sm">{author}</div>
              <small>{book.publisher}</small>
            </div>
          </div>
          <small className="block text-sm whitespace-wrap">
            {book.synopsis.substring(0, 500)}...
          </small>
        </div>
      </Link>
      <div className="absolute flex flex-col justify-around h-full ml-5 text-gray-800 -right-5">
        <StatusButtons book={book} />
      </div>
    </div>
  )
}

export {BookRow}
