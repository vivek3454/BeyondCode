import { Loader as LoaderIcon } from 'lucide-react'
import React from 'react'

const Loader = ({ className }) => {
    return (
        <div className={`flex justify-center w-full ${className}`}>
            <LoaderIcon className='animate-spin duration-1000' />
        </div>
    )
}

export default Loader