const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const MODAL_WINDOW = 'MODAL_WINDOW'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const PULL_FROM_STACK = 'PULL_FROM_STACK'

const initialState = {
    files: [],
    currentDir: null,
    modalWindow: false,
    dirStack: []
}

export default function fileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }

        case MODAL_WINDOW:
            return {
                ...state,
                modalWindow: action.payload

            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }

        default:
            return state
    }
}


export const setFiles = (files) => ({
    type: SET_FILES,
    payload: files
})

export const setCurrentDir = (currentDir) => ({
    type: SET_CURRENT_DIR,
    payload: currentDir
})

export const addFile = (file) => ({
    type: ADD_FILE,
    payload: file
})

export const setVisible = (vis) => ({
    type: MODAL_WINDOW,
    payload: vis
})

export const pushToStack = (dir) => ({
    type: PUSH_TO_STACK,
    payload: dir
})