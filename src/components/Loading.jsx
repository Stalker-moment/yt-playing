import React from 'react'
import Skeleton from './Skeleton'
const Loading = () => {
    return (
        <>
            <div className="space-y-6 border ring-blue-600 p-3 rounded-lg">
                <div className="space-y-2">
                    <Skeleton className="w-[45ch] h-[8rem]" />
                    <Skeleton className="w-[45ch] h-[1rem]" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="w-[30ch] h-[1.25rem]" />
                    <Skeleton className="w-[45ch] h-[1rem]" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="w-[30ch] h-[1.25rem]" />
                    <Skeleton className="w-[45ch] h-[1rem]" />
                </div>
            </div>
        </>
    )
}
export default Loading