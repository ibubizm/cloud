import { useState } from 'react'
import { login } from '../../actions/user'
import { useDispatch } from 'react-redux'
import './auth.scss'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    return (
        <div className="form">
            <h2 className="title">Login</h2>
            <div className="input_block">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="email" />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="password" />
            </div>
            <button className="btn" onClick={() => dispatch(login(email, password))} >Log in</button>
        </div>
    )
}