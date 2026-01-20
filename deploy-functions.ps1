# Firebase Cloud Functions Deployment Script
# Run this script to deploy the user deletion function

Write-Host "🚀 Deploying Firebase Cloud Functions..." -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is installed
try {
    $firebaseVersion = firebase --version
    Write-Host "✅ Firebase CLI is installed: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Firebase CLI is not installed!" -ForegroundColor Red
    Write-Host "Installing Firebase CLI..." -ForegroundColor Yellow
    npm install -g firebase-tools
}

Write-Host ""
Write-Host "📝 Please follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Login to Firebase (a browser window will open):" -ForegroundColor White
Write-Host "   firebase login" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Select your Firebase project:" -ForegroundColor White
Write-Host "   firebase use --add" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Deploy the function:" -ForegroundColor White
Write-Host "   firebase deploy --only functions" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: You need to be on the Blaze (Pay-as-you-go) plan" -ForegroundColor Yellow
Write-Host "   The free tier includes 2M function invocations/month" -ForegroundColor Yellow
Write-Host ""
