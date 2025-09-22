import {Link, Outlet} from 'react-router-dom'
function Admin() {
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <Link to="users" className="admin-link">Users</Link>
        <Link to="lists" className="admin-link">Lists</Link>
        <Link to="tasks" className="admin-link">Tasks</Link>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Admin

