import { dateToGermanDateWithTime } from "../app/(public)/ergebnisse/page"
import { Comment } from "../model"

export async function CommentList({ comments }: { comments?: Comment[] }) {
    return <div className="w-full grid grid-rows-2 gap-2">
        {comments?.reverse().map(comment => <div key={comment._id.toString()} className="bg-gray-200 p-1 rounded-md">
            <div>{comment.message}</div>
            <div className="grid grid-cols-2 italic text-sm mt-1">
                <div>{dateToGermanDateWithTime(new Date(comment.time))} Uhr</div>
                <div className="text-right">{comment.author}</div>
            </div>
        </div>)}
    </div>
}