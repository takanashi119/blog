'use client'
import { useRef, useEffect, useState } from 'react'

import "@/styles/mdx.css"

interface CommentPageProps {
  postId: string
}

interface Comment {
  id: number;
  blog: string;
  name: string;
  content: string;
  createdAt: Date;
}

export default function Comment(props: CommentPageProps) {
  const nameRef = useRef<HTMLInputElement>(null)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [comments, setComments] = useState<Comment[] | null>([])

  const onComment = async () => {
    const payload = {
        name: nameRef.current?.value,
        content: commentRef.current?.value,
        blog: props.postId,
    }
    console.log(payload)
    const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/comments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const comments = await response.json();
      setComments(comments)
    };

    fetchData();
  }, [])

  return (
    <>
        <div className="grid grid-cols-1 justify-items-center">
          <input ref={nameRef} type="text" placeholder="your name" className="input-bordered input mb-8 w-full max-w-xs" />
          <textarea ref={commentRef} placeholder='input here' className="textarea-bordered textarea textarea-lg w-full max-w-xs flex-initial" ></textarea>
          <button className="btn-outline btn mt-4 w-1/4 shrink" onClick={onComment}>SUBMIT</button>
        </div>

        <div className="flex w-full flex-col">
        {comments?.map((comment) => {
          return (
            <>
              <div className="grid grid-cols-1 justify-items-center">
                <span className="probe">{comment.name}</span>
                <span className="probe">{comment.createdAt.toString()}</span>
                <div className="card rounded-box grid h-20 place-items-center bg-base-300">{comment.content}</div>
                <div className="divider"></div>
              </div>
            </>
          )
        })}
        </div>
    </>
  )
}
