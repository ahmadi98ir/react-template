# Configuration
$baseUrl = "http://91.107.131.43"
$token = "5|XbczczYRQR6qTGOQpWoY4Q2W3vCcxSQTpCVo0yyS55ec3496"
$deploymentId = "tggcc8s0coog0s0kwkggg0s8"
$serviceId = "f0ooskcss8wc0ws8sckskco8"

# Headers
$headers = @{
    "Authorization" = "Bearer $token"
    "Host" = "cool.ahmadi98.ir"
    "Accept" = "application/json"
}

# Function to make API request
function Invoke-CoolifyApi {
    param (
        [string]$endpoint,
        [string]$method = "GET"
    )
    
    $url = "$baseUrl$endpoint"
    
    try {
        $response = Invoke-RestMethod -Uri $url -Headers $headers -Method $method
        return $response
    }
    catch {
        Write-Host "Error calling $url : $_"
        return $null
    }
}

# Monitor deployment status
$maxAttempts = 30
$currentAttempt = 1
$delay = 10 # seconds

while ($currentAttempt -le $maxAttempts) {
    Write-Host "`nAttempt $currentAttempt of $maxAttempts"
    Write-Host "----------------------------------------"
    
    # Check health
    Write-Host "Checking health..."
    $health = Invoke-CoolifyApi -endpoint "/api/health"
    Write-Host "Health status: $($health | ConvertTo-Json)"
    
    # Check deployment status
    Write-Host "`nChecking deployment status..."
    $deployment = Invoke-CoolifyApi -endpoint "/api/v1/deployments/$deploymentId"
    Write-Host "Deployment status: $($deployment | ConvertTo-Json)"
    
    # Check service status
    Write-Host "`nChecking service status..."
    $service = Invoke-CoolifyApi -endpoint "/api/v1/services/$serviceId"
    Write-Host "Service status: $($service | ConvertTo-Json)"
    
    if ($deployment.status -eq "completed") {
        Write-Host "`nDeployment completed successfully!"
        break
    }
    
    Write-Host "`nWaiting $delay seconds before next check..."
    Start-Sleep -Seconds $delay
    $currentAttempt++
}

if ($currentAttempt -gt $maxAttempts) {
    Write-Host "`nMaximum attempts reached. Deployment status could not be confirmed."
}