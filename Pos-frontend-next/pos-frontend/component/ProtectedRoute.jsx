"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children })
{
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token)
        {
            router.replace("/login");
        }
        else
        {
            setAuthorized(true);
        }
    }, []);
    if(!authorized)
    {
        return null;
    }
    return children;
}