import React from 'react'
import Rating from '../rating/Rating'
import moment from 'moment'
import './CommentCard.css'

const CommentCard = ({children,comment}) => {
    return (
        <div className='comment_card'>
            <div className="comment_card_row">
                <h3>{comment.username}</h3>
                {
                    comment.rating !==0 && <Rating props={comment} />
                }
            </div>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            <span>{moment(comment.createdAt).fromNow()}</span>
            <p dangerouslySetInnerHTML={{__html: comment.content}}/>

            {children}
        </div>
    )
}

export default CommentCard
