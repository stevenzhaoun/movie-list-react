import React from 'react'
import NavBar from '../components/NavBar'
import useUser from '../hooks/useUser'

const Header = () => {
  const { user, logout } = useUser();
  return (
    <NavBar loginRoute="/login" user={user} onLogout={logout} />
  )
}

export default Header;
