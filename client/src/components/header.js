import { useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../userContext'

const Header = () => {
    const {setUserInfo, userInfo} = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:5000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    const logout = () => {
        fetch('http://localhost:5000/logout', {
            credentials: 'include',
            method: 'POST',
        })
        setUserInfo(null)
    }

    const username = userInfo?.username
    return (
        <div>
            <header className="header">
                <h1><Link to='/' className="header__text">Adebayo's Blog</Link></h1>
                <nav className="nav">
                    {username && (
                        <>
                            <Link to="create" className="nav__link">Create new post</Link>
                            <Link to='/login' className="nav__link" onClick={logout}>Logout</Link>
                        </>
                    )}
                    {!username && (
                        <>
                            <Link to="/login" className="nav__link">Login</Link>
                            <Link to="/register" className="nav__link">Register</Link>
                        </>
                    )}
                   </nav>
            </header>
        </div>
    )
}

export default Header