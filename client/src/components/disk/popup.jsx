import close from '../../static/cancel.svg'


export const Popup = ({ onClose, value, setValue, createNewDir }) => {
    const create = () => {
        createNewDir()
        onClose()
    }
    return (
        <div className="popup">
            <div className="popup__content">
                <div className="popup__header">
                    <h2 className="title">
                        create new folder
                    </h2>
                    <img src={close} onClick={onClose} className="close" />
                </div>
                <div className="input__block">
                    <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
                </div>
                <div className="btn__block">
                    <button onClick={create} className="btn">create</button>
                </div>
            </div>
        </div>
    )
}