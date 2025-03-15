import React from 'react'
import { Skeleton } from './ui/skeleton'

const CustomSkeleton = ({ admin=false }) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-4">
        <Skeleton className="w-1/2 h-[30px]" />
        {admin &&
          <div className="flex items-center gap-2">
            <Skeleton className="w-[120px] h-[40px]" />
            <Skeleton className="w-[40px] h-[40px]" />
          </div>}
      </div>
      <Skeleton className="w-full h-[20px] mt-5" />
      <Skeleton className="w-full h-[15px] mt-2" />
      {Array(4).fill("*").map(() => (
        <>
          <Skeleton className="w-1/2 h-[20px] mt-2" />
          <Skeleton className="w-1/2 h-[15px] mt-2" />
          <Skeleton className="w-full h-[40px] mt-2" />
        </>
      ))}
    </div>
  )
}

export default CustomSkeleton