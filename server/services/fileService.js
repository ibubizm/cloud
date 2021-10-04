const fs = require('fs')
const File = require('../models/file')
const config = require('config')

class FileService {
    createDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({ message: 'folder was created' })
                }
                else {
                    return reject({ message: 'folder already exist' })
                }
            } catch (e) {
                return reject({ message: 'file error' })
            }
        }))
    }
}

module.exports = new FileService()