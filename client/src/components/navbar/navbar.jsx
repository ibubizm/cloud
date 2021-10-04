import './nav.scss'
import cloud from '../../static/1.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'


export const NavBar = () => {
    const { isAuth } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="container">
                <nav className="nav">
                    <Link to="/" className="icon">
                        <img className="logo" src={cloud} alt="" />
                        <span>Cloud</span>
                    </Link>
                    <div className="auth_block">
                        {!isAuth &&
                            <Link className="reg" to="/registration">
                                Registration
                            </Link>
                        }
                        {!isAuth &&
                            <Link className="log" to="/login" >
                                Log in
                            </Link>
                        }
                        {isAuth &&
                            <span className="log" onClick={() => dispatch(logout())}>log off</span>
                        }
                    </div>
                </nav>
            </div>

        </div>
    )
}