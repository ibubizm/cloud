import { useSelector } from 'react-redux'
import './fileList.scss'
import { File } from './file/file'

export const FileList = () => {
    const files = useSelector(({ file }) => file.files)

    return (
        <div className="fileList">
            <div className="fileList__column">
                <div className="fileList__name">
                    name
                </div>
                <div className="fileList__data">
                    data
                </div>
                <div className="fileList__size">
                    size
                </div>

            </div>
            {files &&
                files.map((file) =>
                    <File key={file._id} file={file} />
                )

            }
        </div>
    )
}