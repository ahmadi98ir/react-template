import { NextRequest, NextResponse } from 'next/server'
import { apiHandler } from '../handler'

export async function POST(request: NextRequest) {
  try {
    const { uuid, force = true } = await request.json()
    const result = await apiHandler.triggerDeployment(uuid, force)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(error, { status: error.status || 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const deploymentId = request.nextUrl.searchParams.get('id')
    if (!deploymentId) {
      return NextResponse.json(
        { error: 'Deployment ID is required' },
        { status: 400 }
      )
    }
    
    const status = await apiHandler.getDeploymentStatus(deploymentId)
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(error, { status: error.status || 500 })
  }
}