import { NextResponse } from "next/server"
import { getAiTools } from "@/lib/ai-tools"

export const revalidate = 3600

export async function GET() {
  try {
    const data = await getAiTools()
    return NextResponse.json(data)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch AI tools"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
