"use client";
import Image from "next/image";
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { useRouter } from 'next/navigation';
import React from "react";
import {loadState} from "@/store/store";
import DB from "@/store/database";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    const emp = loadState();
    if (!emp?.nullifier_hash) {
      return router.push('employee')
    } else {
      return router.push('signup')
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
        <Image
          src="/images/logo.png"
          alt="refX Logo"
          width={150}
          height={150}
        />
        <h1 className="mt-4 text-lg font-semibold">Welcome to the refX World ID Verification</h1>
      </div>
    </main>
  );
}
