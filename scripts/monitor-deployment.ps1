# Configuration
$UUID = "f0ooskcss8wc0ws8sckskco8"
$TOKEN = "5|XbczczYRQR6qTGOQpWoY4Q2W3vCcxSQTpCVo0yyS55ec3496"
$BASE_URL = "http://cool.ahmadi98.ir"
$DEPLOYMENT_UUID = "ugw404004gk888ks44ws0gs8"

# Monitor deployment status
$attempt = 1
$maxAttempts = 30
$delay = 10 # seconds

while ($attempt -le $maxAttempts) {
    Write-Host "Attempt $attempt of $maxAttempts"
    
    # Try different endpoints to get status
    $endpoints = @(
        "deployments/latest?uuid=$UUID",
        "deployments/$DEPLOYMENT_UUID",
        "services/$UUID/status"
    )
    
    foreach ($endpoint in $endpoints) {
        try {
            $url = "$BASE_URL/api/v1/$endpoint"
            $headers = @{
                "Authorization" = "Bearer $TOKEN"
            }
            
            $response = Invoke-RestMethod -Method Get -Uri $url -Headers $headers
            Write-Host "Response from $endpoint : $($response | ConvertTo-Json)"
        }
        catch {
            Write-Host "Error checking $endpoint : $_"
        }
    }
    
    # Also check application health
    try {
        $response = Invoke-WebRequest -Uri "https://ahmadi98.ir/api/health" -SkipCertificateCheck
        Write-Host "Application Health Status: $($response.StatusCode)"
    }
    catch {
        Write-Host "Application not responding yet: $_"
    }
    
    Write-Host "Waiting $delay seconds before next check..."
    Start-Sleep -Seconds $delay
    $attempt++
}