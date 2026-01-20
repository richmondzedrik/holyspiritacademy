# Firebase User Deletion - Verification Script
# This script checks if the Cloud Function is properly deployed and configured

Write-Host "Firebase User Deletion - System Check" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check 1: Firebase CLI installed
Write-Host "1. Checking Firebase CLI..." -ForegroundColor Yellow
try {
    $firebaseVersion = firebase --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   OK Firebase CLI installed: $firebaseVersion" -ForegroundColor Green
    } else {
        Write-Host "   ERROR Firebase CLI not found" -ForegroundColor Red
        Write-Host "   Install with: npm install -g firebase-tools" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "   ERROR Firebase CLI not found" -ForegroundColor Red
    Write-Host "   Install with: npm install -g firebase-tools" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check 2: Firebase project configured
Write-Host "2. Checking Firebase project configuration..." -ForegroundColor Yellow
if (Test-Path ".firebaserc") {
    Write-Host "   OK .firebaserc found" -ForegroundColor Green
    $firebaserc = Get-Content ".firebaserc" | ConvertFrom-Json
    $projectId = $firebaserc.projects.default
    if ($projectId) {
        Write-Host "   OK Project ID: $projectId" -ForegroundColor Green
    } else {
        Write-Host "   WARNING No default project set" -ForegroundColor Yellow
        Write-Host "   Run: firebase use --add" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ERROR .firebaserc not found" -ForegroundColor Red
    Write-Host "   Run: firebase use --add" -ForegroundColor Yellow
}

Write-Host ""

# Check 3: firebase.json configuration
Write-Host "3. Checking firebase.json..." -ForegroundColor Yellow
if (Test-Path "firebase.json") {
    Write-Host "   OK firebase.json found" -ForegroundColor Green
    $firebaseJson = Get-Content "firebase.json" | ConvertFrom-Json
    if ($firebaseJson.functions) {
        Write-Host "   OK Functions configured" -ForegroundColor Green
        Write-Host "   Source: $($firebaseJson.functions.source)" -ForegroundColor Gray
    } else {
        Write-Host "   ERROR Functions not configured in firebase.json" -ForegroundColor Red
    }
} else {
    Write-Host "   ERROR firebase.json not found" -ForegroundColor Red
}

Write-Host ""

# Check 4: Cloud Function file exists
Write-Host "4. Checking Cloud Function files..." -ForegroundColor Yellow
if (Test-Path "functions/index.js") {
    Write-Host "   OK functions/index.js found" -ForegroundColor Green
    
    # Check if the function is defined
    $functionContent = Get-Content "functions/index.js" -Raw
    if ($functionContent -match "deleteAuthUserOnProfileDelete") {
        Write-Host "   OK deleteAuthUserOnProfileDelete function defined" -ForegroundColor Green
    } else {
        Write-Host "   ERROR deleteAuthUserOnProfileDelete function not found" -ForegroundColor Red
    }
    
    if ($functionContent -match "admin\.auth\(\)\.deleteUser") {
        Write-Host "   OK Admin SDK deleteUser call found" -ForegroundColor Green
    } else {
        Write-Host "   ERROR Admin SDK deleteUser call not found" -ForegroundColor Red
    }
} else {
    Write-Host "   ERROR functions/index.js not found" -ForegroundColor Red
}

Write-Host ""

# Check 5: Dependencies installed
Write-Host "5. Checking Cloud Function dependencies..." -ForegroundColor Yellow
if (Test-Path "functions/package.json") {
    Write-Host "   OK functions/package.json found" -ForegroundColor Green
    $packageJson = Get-Content "functions/package.json" | ConvertFrom-Json
    
    if ($packageJson.dependencies."firebase-admin") {
        Write-Host "   OK firebase-admin: $($packageJson.dependencies.'firebase-admin')" -ForegroundColor Green
    } else {
        Write-Host "   ERROR firebase-admin not in dependencies" -ForegroundColor Red
    }
    
    if ($packageJson.dependencies."firebase-functions") {
        Write-Host "   OK firebase-functions: $($packageJson.dependencies.'firebase-functions')" -ForegroundColor Green
    } else {
        Write-Host "   ERROR firebase-functions not in dependencies" -ForegroundColor Red
    }
    
    if (Test-Path "functions/node_modules") {
        Write-Host "   OK node_modules installed" -ForegroundColor Green
    } else {
        Write-Host "   WARNING node_modules not found" -ForegroundColor Yellow
        Write-Host "   Run: cd functions; npm install" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ERROR functions/package.json not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check 6: Deployment status (requires authentication)
Write-Host "6. Checking deployment status..." -ForegroundColor Yellow
Write-Host "   Attempting to list deployed functions..." -ForegroundColor Gray
Write-Host ""

try {
    $functionsOutput = firebase functions:list 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
        if ($functionsOutput -match "deleteAuthUserOnProfileDelete") {
            Write-Host "   OK deleteAuthUserOnProfileDelete is DEPLOYED" -ForegroundColor Green
            Write-Host ""
            Write-Host "   SUCCESS! Your user deletion system is fully configured and deployed!" -ForegroundColor Green
            Write-Host ""
            Write-Host "   How it works:" -ForegroundColor Cyan
            Write-Host "   1. Admin deletes user from dashboard" -ForegroundColor White
            Write-Host "   2. Firestore document is deleted" -ForegroundColor White
            Write-Host "   3. Cloud Function automatically deletes Auth user" -ForegroundColor White
            Write-Host ""
        } else {
            Write-Host "   WARNING Function exists but deleteAuthUserOnProfileDelete not found" -ForegroundColor Yellow
            Write-Host "   You need to deploy the function!" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "   Deploy with: firebase deploy --only functions" -ForegroundColor Cyan
        }
    } else {
        Write-Host "   WARNING Unable to check deployment status" -ForegroundColor Yellow
        Write-Host "   This might mean:" -ForegroundColor Gray
        Write-Host "   - You are not logged in (run: firebase login)" -ForegroundColor Gray
        Write-Host "   - No functions are deployed yet" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   To deploy: firebase deploy --only functions" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   WARNING Could not check deployment status" -ForegroundColor Yellow
    Write-Host "   Make sure you are logged in: firebase login" -ForegroundColor Cyan
    Write-Host "   Then deploy: firebase deploy --only functions" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "If the function is NOT deployed:" -ForegroundColor Yellow
Write-Host "  1. firebase login" -ForegroundColor White
Write-Host "  2. firebase use --add" -ForegroundColor White
Write-Host "  3. firebase deploy --only functions" -ForegroundColor White
Write-Host ""
Write-Host "To test the deletion:" -ForegroundColor Yellow
Write-Host "  1. Create a test user in your app" -ForegroundColor White
Write-Host "  2. Login as admin and delete the user" -ForegroundColor White
Write-Host "  3. Check Firebase Console Authentication" -ForegroundColor White
Write-Host "  4. Check Firebase Console Functions Logs" -ForegroundColor White
Write-Host ""
Write-Host "To view function logs:" -ForegroundColor Yellow
Write-Host "  firebase functions:log --only deleteAuthUserOnProfileDelete" -ForegroundColor White
Write-Host ""
Write-Host "For detailed documentation, see: USER_DELETION_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
