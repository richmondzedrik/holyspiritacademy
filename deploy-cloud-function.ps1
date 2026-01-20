# Quick Deploy Script for Firebase Cloud Functions
# This script will guide you through deploying the user deletion function

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Firebase Cloud Function Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will deploy the deleteAuthUserOnProfileDelete function" -ForegroundColor White
Write-Host "which enables automatic Auth user deletion when admins delete users." -ForegroundColor White
Write-Host ""

# Step 1: Check if logged in
Write-Host "[Step 1/3] Checking Firebase authentication..." -ForegroundColor Yellow
Write-Host ""

$loginCheck = firebase projects:list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "You are not logged in to Firebase." -ForegroundColor Red
    Write-Host ""
    Write-Host "Opening browser for authentication..." -ForegroundColor Cyan
    firebase login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "Login failed. Please try again manually:" -ForegroundColor Red
        Write-Host "  firebase login" -ForegroundColor White
        exit 1
    }
}

Write-Host "OK - You are logged in to Firebase" -ForegroundColor Green
Write-Host ""

# Step 2: Check project selection
Write-Host "[Step 2/3] Checking project configuration..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path ".firebaserc") {
    $firebaserc = Get-Content ".firebaserc" | ConvertFrom-Json
    $projectId = $firebaserc.projects.default
    
    if ($projectId) {
        Write-Host "OK - Using project: $projectId" -ForegroundColor Green
    } else {
        Write-Host "No default project set. Please select your project:" -ForegroundColor Yellow
        firebase use --add
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "Project selection failed." -ForegroundColor Red
            exit 1
        }
    }
} else {
    Write-Host "No project configured. Please select your project:" -ForegroundColor Yellow
    firebase use --add
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "Project selection failed." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Step 3: Deploy
Write-Host "[Step 3/3] Deploying Cloud Function..." -ForegroundColor Yellow
Write-Host ""
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

firebase deploy --only functions

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your user deletion system is now fully operational!" -ForegroundColor Green
    Write-Host ""
    Write-Host "What happens now:" -ForegroundColor Cyan
    Write-Host "  1. Admin deletes user from dashboard" -ForegroundColor White
    Write-Host "  2. Firestore document is deleted" -ForegroundColor White
    Write-Host "  3. Cloud Function automatically deletes Auth user" -ForegroundColor White
    Write-Host ""
    Write-Host "Test it:" -ForegroundColor Cyan
    Write-Host "  1. Create a test user in your app" -ForegroundColor White
    Write-Host "  2. Login as admin and delete the user" -ForegroundColor White
    Write-Host "  3. Check Firebase Console to verify deletion" -ForegroundColor White
    Write-Host ""
    Write-Host "View logs:" -ForegroundColor Cyan
    Write-Host "  firebase functions:log --only deleteAuthUserOnProfileDelete" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  DEPLOYMENT FAILED" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  1. Not on Blaze (Pay-as-you-go) plan" -ForegroundColor White
    Write-Host "     Solution: Upgrade in Firebase Console" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  2. Insufficient permissions" -ForegroundColor White
    Write-Host "     Solution: Ensure you have Owner/Editor role" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  3. Syntax errors in function code" -ForegroundColor White
    Write-Host "     Solution: Run 'cd functions && npm run lint'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "For detailed troubleshooting, see: DEPLOYMENT_STATUS.md" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}
