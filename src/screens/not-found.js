import {Link} from 'components/lib'

function NotFoundScreen() {
  return (
    <div className="grid items-center justify-center h-full">
      <div>
        Sorry... nothing here. <Link to="/list">Go home</Link>
      </div>
    </div>
  )
}

export {NotFoundScreen}
