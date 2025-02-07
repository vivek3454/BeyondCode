"use client";

import { PaginationComp } from '@/components/PaginationComp';
import Tiptap from '@/components/TiptapEditor';
import { useCallback, useState } from 'react';

const TestPage = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(2);
  const [totalCount, setTotalCount] = useState(20);
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <div>
      <h2 className='text-xl font-bold'>Test Page</h2>
      
      <Tiptap />

      <div className='mt-4'>
        <PaginationComp
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          totalCount={totalCount}
        />
      </div>
    </div>
  )
}

export default TestPage