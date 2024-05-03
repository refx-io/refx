import {NextResponse} from "next/server";

const WORLD_COIN_ENDPOINT = "https://developer.worldcoin.org/api/v1/verify/app_staging_a90b22b51bb0ec26285e113ee36a0127";

/**
 * POST handler for verifying proof on WorldCoin
 *
 * @param req is the request from the client
 * @param res is the response from this handler
 */
export async function POST(req, res) {
  const body = await req.json();
  const response = await fetch(WORLD_COIN_ENDPOINT, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...body,
      "action": "employee-action"
    })
  }, )

  const responseBody = await response.json();

  // if the proof id verified with no problem
  if (responseBody.success) {
    return NextResponse.json({}, {status: 200});
  }

  // Otherwise
  return NextResponse.json({
    code: responseBody.code,
    detail: responseBody.detail,
    attribute: responseBody.attribute,
  }, {status: 400})
}
