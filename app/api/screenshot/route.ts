import { NextResponse } from "next/server";

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");

  if (!target || !isValidHttpUrl(target)) {
    return NextResponse.json({ ok: false, message: "Invalid url parameter." }, { status: 400 });
  }

  const screenshotUrl = `https://image.thum.io/get/width/1400/crop/920/noanimate/${target}`;
  return NextResponse.json({
    ok: true,
    screenshotUrl,
    note: "Some websites block screenshot providers. Use local thumbnail fallback if unavailable.",
  });
}

