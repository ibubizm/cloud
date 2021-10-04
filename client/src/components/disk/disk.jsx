import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDir, getFiles, uploadFile } from "../../actions/file"
import { FileList } from "./fileList/fileList"
import './disk.scss'
import { Popup } from "./popup"
import { setCurrentDir, setVisible } from '../../reducers/fileReducer'
import back from '../../static/back.svg'


export const Disk = () => {
    const [value, setValue] = useState('')
    const [dragEnter, setDrugEnter] = useState(false)
    const dispatch = useDispatch()
    const { currentDir, modalWindow, dirStack } = useSelector(({ file }) => file)

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    const createNewDir = () => {
        setValue('')
        dispatch(createDir(currentDir, value))
    }
    const onOpen = () => {
        dispatch(setVisible(true))
    }

    const onClose = () => {
        dispatch(setVisible(false))
    }

    const fileUploadHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const dragEnterHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrugEnter(true)
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrugEnter(false)
    }

    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDrugEnter(false)

    }

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir, dispatch])


    return (!dragEnter ?
        <div className="container">
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
                <img src={back} onClick={backClickHandler} className="back" />
                <div className="buttons__block">
                    <button onClick={onOpen} className="button button__create">Create folder</button>
                    <div className="disk__upload">
                        <label className="button " htmlFor="disk__upload-input">Upload file</label>
                        <input onChange={(e) => fileUploadHandler(e)} id="disk__upload-input" className="disk__upload-input" multiple={true} type="file" />
                    </div>
                </div>
                <FileList />
                {modalWindow &&
                    <Popup onClose={onClose} value={value} setValue={setValue} createNewDir={createNewDir} />
                }
            </div>
        </div> :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} >
            drop files here
        </div>

    )
}