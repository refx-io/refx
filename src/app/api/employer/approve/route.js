import {NextResponse} from "next/server";
import Employee from "../../../../../ethereum/build/Employee.json";
import DB from '../../../../store/database';
import web3 from "../../../../../ethereum/web3";

export async function POST(req) {
  const reqBody = await req.json();
  console.log('lookup', reqBody)
  const candidate = DB.user.find(it => it.nullifier_hash === reqBody.employee);
  console.log('found', candidate);
  const instance = new web3.eth.Contract(Employee.abi, candidate.address);
  console.log(instance);

  const address = await instance.methods.storeResult(reqBody.employer, true).send({from: '0x04257bCAfd560A22599676F61CB923aA94d419Fc'});
  return NextResponse.json({address}, {status: 200});
}
