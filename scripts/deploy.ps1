# Configuration
$UUID = "f0ooskcss8wc0ws8sckskco8"
$TOKEN = "5|XbczczYRQR6qTGOQpWoY4Q2W3vCcxSQTpCVo0yyS55ec3496"
$BASE_URL = "http://cool.ahmadi98.ir"

# Helper Functions
function Invoke-CoolifyAPI {
    param (
        [string]$Method,
        [string]$Endpoint,
        [hashtable]$QueryParams = @{}
    )
    
    $url = "$BASE_URL/api/v1/$Endpoint"
    if ($QueryParams.Count -gt 0) {
        $queryString = $QueryParams.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" }
        $url += "?" + ($queryString -join "&")
    }
    
    $headers = @{
        "Authorization" = "Bearer $TOKEN"
    }
    
    try {
        $response = Invoke-RestMethod -Method $Method -Uri $url -Headers $headers
        return $response
    }
    catch {
        Write-Host "Error calling $url : $_"
        return $null
    }
}

# Main Deployment Function
function Start-CoolifyDeploy {
    param (
        [switch]$Force
    )
    
    Write-Host "Starting deployment..."
    
    # Trigger deployment
    $deployParams = @{
        "uuid" = $UUID
        "force" = $Force.IsPresent.ToString().ToLower()
    }
    
    $deployment = Invoke-CoolifyAPI -Method "POST" -Endpoint "deploy" -QueryParams $deployParams
    
    if ($deployment) {
        $deploymentUuid = $deployment.deployments[0].deployment_uuid
        Write-Host "Deployment started with UUID: $deploymentUuid"
        Write-Host "Monitor progress in Coolify dashboard"
        
        # Try to get status (might not work in newer versions)
        Start-Sleep -Seconds 5
        Write-Host "Checking deployment status..."
        $status = Invoke-CoolifyAPI -Method "GET" -Endpoint "deployments" -QueryParams @{ "uuid" = $UUID }
        if ($status) {
            Write-Host "Deployment Status: $($status | ConvertTo-Json -Depth 3)"
        }
    }
    else {
        Write-Host "Failed to start deployment"
    }
}

# Execute deployment with force
Start-CoolifyDeploy -Force