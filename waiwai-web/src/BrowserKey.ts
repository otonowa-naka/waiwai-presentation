import  {  v5  as  uuidv5  } from 'uuid'

// ページ開く毎に生成するブラウザタブ毎のKey
// アンケートの2重登録を防止したり、コメントに追加したりに利用する
export const browserKey = uuidv5 ( 'waiwai-presentation.web.app' ,  uuidv5.URL ) 

