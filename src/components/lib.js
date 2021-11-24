import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Dialog as ReachDialog} from '@reach/dialog'
import {FaSpinner} from 'react-icons/fa'
import styles from './lib.module.css'

function withClassNames(type, styleProps, ...getClassNames) {
  if (!Array.isArray(styleProps)) {
    getClassNames = [styleProps, ...getClassNames]
  }
  function Wrapper(allProps, ref) {
    const {className: classNameProp = '', ...rest} = allProps
    const props = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !styleProps.includes(key)),
    )
    const className = [...getClassNames, classNameProp]
      .flatMap(cn => (typeof cn === 'function' ? cn(allProps) : cn))
      .filter(Boolean)
      .join(' ')
    return React.createElement(type, {
      ref,
      ...props,
      className,
    })
  }
  const typeName =
    (typeof type === 'string' ? type : type.displayName || type.name) ||
    'Unknown'
  Wrapper.displayName = `withClassNames(${typeName})`
  return React.forwardRef(Wrapper)
}

const CircleButton = withClassNames(
  'button',
  'flex items-center justify-center w-10 h-10 leading-none border border-gray-200 border-solid rounded-full cursor-pointer',
)

const BookListUL = withClassNames(
  'ul',
  'list-none p-0 grid gap-4',
  styles.bookList,
)

const Spinner = withClassNames(FaSpinner, 'mx-auto inline', styles.spinner)
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const Button = withClassNames(
  'button',
  ['variant'],
  ({variant = 'primary'}) => [
    'px-4 py-3 leading-none border-0',
    buttonVariants[variant],
  ],
)

const buttonVariants = {
  primary: 'bg-indigo-800 text-white',
  secondary: 'bg-gray-100 text-gray-800',
}

const FormGroup = withClassNames('div', 'flex flex-col')

function FullPageSpinner() {
  return (
    <div className="flex items-center w-full h-screen">
      <Spinner className="text-6xl" />
    </div>
  )
}

const Link = withClassNames(
  RouterLink,
  'text-indigo-700 hover:text-blue-800 hover:underline',
)

const Input = withClassNames(
  'input',
  'px-3 py-2 bg-gray-100 rounded-sm border-gray-200 border-solid border',
)

const Textarea = withClassNames(
  'textarea',
  'px-3 py-2 bg-gray-100 border-gray-200 border-solid border',
)

const Dialog = withClassNames(
  ReachDialog,
  'w-full m-auto md:max-w-md md:rounded-sm md:pb-14 md:shadow-md',
)

function ErrorMessage({error, variant = 'stacked', ...props}) {
  return (
    <div
      role="alert"
      className={`${variant === 'stacked' ? 'block' : 'inline-block'}`}
      {...props}
    >
      <span className="text-red-500">There was an error: </span>
      <pre
        style={{whiteSpace: 'break-spaces'}}
        className={`mx-0 mt-0 -mb-1.5 text-red-500
        ${variant === 'stacked' ? 'block' : 'inline-block'}
        `}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({error}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center h-full"
    >
      <p className="text-red-500">
        Uh oh... There's a problem. Try refreshing the app.
      </p>
      <pre className="text-red-500">{error.message}</pre>
    </div>
  )
}

export {
  FullPageErrorFallback,
  ErrorMessage,
  CircleButton,
  BookListUL,
  Spinner,
  Button,
  Input,
  Textarea,
  Dialog,
  FormGroup,
  FullPageSpinner,
  Link,
}
