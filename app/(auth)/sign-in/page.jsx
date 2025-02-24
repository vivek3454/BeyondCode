"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "sonner"

const signInSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
})

export default function SignIn() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data) {
        console.log("data", data);
        setIsLoading(true);
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (result?.error) {
            toast.error(result.error);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            toast.success("Login successful!");
            router.push("/admin");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="dark:bg-gray-800" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        {/* <Input className="dark:bg-gray-800" type="password" {...field} /> */}
                                        <PasswordInput
                                            id="password"
                                            className="dark:bg-gray-800"
                                            value={field.value}
                                            onChange={field.onChange}
                                            autoComplete="new-password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type="submit" className="w-full dark:bg-gray-200 hover:dark:bg-gray-300">
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

