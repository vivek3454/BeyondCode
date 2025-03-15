import React from 'react'
import { Skeleton } from './ui/skeleton'

const CustomSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-[20px] mt-5" />
      <Skeleton className="w-full h-[15px] mt-2" />
      {Array(4).fill("*").map((_,i) => (
        <div key={i}>
          <Skeleton className="w-1/2 h-[20px] mt-2" />
          <Skeleton className="w-1/2 h-[15px] mt-2" />
          <Skeleton className="w-full h-[40px] mt-2" />
        </div>
      ))}
    </div>
  )
}

export default CustomSkeleton