$ErrorActionPreference = "Stop"
try {
    Set-Location $PSScriptRoot
    
    Write-Host "1. Adding ALL files to staging..."
    git add .
    
    Write-Host "2. Committing changes..."
    # Allow empty commits just in case files are already added
    git commit -m "chore: upload site artifacts [auto]" --allow-empty
    
    Write-Host "3. Pushing to GitHub..."
    git push origin main
    
    Write-Host "Success! Files uploaded."
} catch {
    Write-Error "An error occurred: $_"
    exit 1
}
