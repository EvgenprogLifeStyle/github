import {createSlice} from "@reduxjs/toolkit";

interface GithubSlice{
    favorites:string[]
}

const initialState:GithubSlice = {
favorites:[]
}

export const githubSlice = createSlice({
    name:'github',
    initialState,
    reducers:{

    }
})