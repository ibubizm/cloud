import { useState } from "react"
import { registration } from "../../actions/user"
import './auth.scss'

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="form">
            <h2 className="title">Registration</h2>
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
            <button className="btn" onClick={() => registration(email, password)} >Registration</button>
        </div>
    )
}