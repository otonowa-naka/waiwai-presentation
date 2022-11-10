import { useCallback, useState } from 'react'

export const useComments = () => {
    const [comments, setComments] = useState<string[]>([])

    const PushComment = useCallback((comment: string) => {
        const newComments = [...comments]
        newComments.push(comment)
        setComments(newComments)
    }, [comments]
    )

    return { comments, PushComment }
}