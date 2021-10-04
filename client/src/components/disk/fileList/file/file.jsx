import '../fileList.scss'
import dirLogo from '../../../../static/folder.svg'
import fileLogo from '../../../../static/document.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { useDispatch, useSelector } from 'react-redux';
import trash from '../../../../static/trash.svg'
import download from '../../../../static/download.svg'


export const File = ({ file }) => {
    const dispatch = useDispatch()
    const { currentDir } = useSelector(({ file }) => file)

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    return (
        <div onClick={openDirHandler} className="fileList__column">
            <img className="img" src={file.type === 'dir' ? dirLogo : fileLogo} />
            <div className="fileList__name">
                {file.name}
            </div>
            <div className="fileList__data">
                {file.data.slice(0, 10)}
            </div>
            <div className="fileList__size">
                {file.size}
            </div>
            <button className="fileList__btn fileList__download">
                <img src={download} alt="" />
            </button>
            <button className="fileList__btn fileList__delete">
                <img src={trash} alt="" />
            </button>
        </div>
    )
}