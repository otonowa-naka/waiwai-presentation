import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// 1コメントアイテム
export type CommentItem = {
  comment: string                // コメント
}

// Stateの型定義
export type CommentsState = {
  state: {
    running: boolean
    errorMessage: string
  },
  content: {
    comments: CommentItem[]
  }
}

// 初期値
const initialState: CommentsState =
{
  state:
  {
    running: false,
    errorMessage: ''
  },
  content:
  {
    comments: []
  }
}


export const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    // コメントクリア
    ClearComments: (state: CommentsState, actton: PayloadAction) => {
      state.content.comments = []
    },
    AddComment: (state: CommentsState, actton: PayloadAction<CommentItem>) => {
      const comment = actton.payload
      state.content.comments.push(comment)
    },
    setError: (state: CommentsState, actton: PayloadAction<string>) => {
      console.log(`エラー発生 ${actton.payload}`)
      state.state.errorMessage = actton.payload
    }
  },
})


// アクションの外部定義
export const { setError } = commentsSlice.actions
export default commentsSlice.reducer