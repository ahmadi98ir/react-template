import { NextResponse } from 'next/server'
import { apiHandler } from '../handler'

export async function GET() {
  try {
    const healthStatus = await apiHandler.checkHealth()
    return NextResponse.json(healthStatus)
  } catch (error) {
    return NextResponse.json(error, { status: error.status || 500 })
  }
}