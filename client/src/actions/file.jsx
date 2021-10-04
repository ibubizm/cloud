import axios from 'axios'
import { addFile, setFiles } from '../reducers/fileReducer'

export const getFiles = (dirId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setFiles(response.data))
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        console.log(name, dirId)
        try {
            const response = await axios.post(`http://localhost:5000/api/files`, {
                parent: dirId,
                name,
                type: 'dir'
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addFile(response.data))
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if (dirId) {
                formData.append('parent', dirId)
            }

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
                    console.log('total---', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent * 100) / totalLength)
                        console.log('progress' + progress)
                    }
                }
            })
            dispatch(addFile(response.data))
        }
        catch (e) {
            console.log(e)
        }

    }
}