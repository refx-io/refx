"use client";
import { Button } from "antd";
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import { useRouter } from 'next/navigation';
import { saveState } from "@/store/store";
import DB from '../../store/database';

export default function Home() {
  const router = useRouter();

  const verifyProof = async (proof) => {
    console.log('verifyProof', proof)
    const response = await fetch("/api/worldcoin/proof-verify", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proof)
    });

    console.log(response.status);

    if (response.status === 200) {
      const employee = DB.lookupEmployeeByHash(proof.nullifier_hash)
      saveState({
        ...proof,
        name: employee?.first_name,
        hash: proof.nullifier_hash,
        address: employee?.address,
      });
      return router.push('employee')
    }

  alert("Failed to login");
  return router.refresh();

};

  const onSuccess = () => {
    console.log("Success")
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-8 rounded-lg bg-white p-12 shadow-lg">
        <h1 className="text-center text-lg font-semibold">Sign in with World ID</h1>
        <p className="text-center text-sm text-gray-600">Click below to authenticate your identity via Worldcoin and access the employee portal.</p>
        <IDKitWidget
          app_id="app_staging_a90b22b51bb0ec26285e113ee36a0127"
          action="employee-action"
          verification_level={VerificationLevel.Device}
          handleVerify={verifyProof}
          onSuccess={onSuccess}>
          {({ open }) => (
            <Button className="w-full" type="primary" onClick={open}>Verify with World ID</Button>
          )}
        </IDKitWidget>
      </div>
    </main>
  );
}
