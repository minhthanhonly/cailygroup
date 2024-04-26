
import { MouseEventHandler } from 'react'
import './Button.scss'

export const ButtonBack = (props: { onHandle: MouseEventHandler<HTMLButtonElement> | undefined }) => {
    return (
        <button className='btn btn--from btn--transparent' onClick={props.onHandle}>&gt;申請書一覧に戻る</button>
    )
}
