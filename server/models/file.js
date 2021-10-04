const { model, Schema, ObjectId } = require('mongoose')

const File = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    acessLink: { type: String },
    size: { type: Number, default: 0 },
    data: { type: Date, default: Date.now() },
    path: { type: String, default: '' },
    user: { type: ObjectId, ref: 'User' },
    parent: { type: ObjectId, ref: 'File' },
    childs: [{ type: ObjectId, ref: 'File' }]
})

module.exports = model('File', File)