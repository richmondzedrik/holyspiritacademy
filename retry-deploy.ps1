# Quick Retry Script - Run this after waiting 3-5 minutes

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Retrying Cloud Function Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Deploying to Firebase..." -ForegroundColor Yellow
Write-Host ""

firebase deploy --only functions

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCCESS! DEPLOYMENT COMPLETE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your user deletion system is now fully operational!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test it now:" -ForegroundColor Cyan
    Write-Host "  1. Create a test user in your app" -ForegroundColor White
    Write-Host "  2. Login as admin and delete the user" -ForegroundColor White
    Write-Host "  3. Check Firebase Console to verify" -ForegroundColor White
    Write-Host ""
    Write-Host "View logs:" -ForegroundColor Cyan
    Write-Host "  firebase functions:log --only deleteAuthUserOnProfileDelete" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "  STILL SETTING UP PERMISSIONS" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "The permissions are still being set up." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please wait another 5 minutes and try again:" -ForegroundColor Cyan
    Write-Host "  .\retry-deploy.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Or check if you need to upgrade to Blaze plan:" -ForegroundColor Yellow
    Write-Host "  Firebase Console -> Settings -> Usage and billing" -ForegroundColor White
    Write-Host ""
}
