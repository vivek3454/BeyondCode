"use client";
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const SessionProviderWrapper = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
    )
}

export default SessionProviderWrapper