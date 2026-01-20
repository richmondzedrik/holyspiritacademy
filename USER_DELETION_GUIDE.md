# Firebase User Deletion Implementation Guide

## Overview
This project implements **complete user deletion** using Firebase Admin SDK in Cloud Functions. When an admin deletes a user from the dashboard, both the Firestore data AND the Firebase Authentication account are automatically deleted.

## How It Works

### 1. Frontend Flow (UserList.jsx)
When an admin clicks the delete button:
1. Shows a confirmation dialog warning about permanent deletion
2. Calls `deleteUser(userId)` from `userService.js`
3. Displays success/error toast notifications

### 2. Backend Flow (userService.js)
The `deleteUser` function:
1. Deletes all user-related data (comments, messages, posts)
2. Deletes the user document from Firestore `users/{userId}`
3. This deletion **triggers** the Cloud Function

### 3. Cloud Function (functions/index.js)
The `deleteAuthUserOnProfileDelete` function:
- **Trigger**: Automatically runs when a document in `users/{userId}` is deleted
- **Action**: Uses Firebase Admin SDK to delete the user from Firebase Authentication
- **Error Handling**: Gracefully handles cases where the Auth user doesn't exist

## Architecture

```
Admin Dashboard (UserList.jsx)
    ↓
deleteUser() in userService.js
    ↓
Delete Firestore document: users/{userId}
    ↓
Cloud Function Trigger: onDocumentDeleted
    ↓
admin.auth().deleteUser(userId)
    ↓
User completely removed from Firebase
```

## Deployment Status

### ⚠️ IMPORTANT: Cloud Function Must Be Deployed

The Cloud Function **MUST** be deployed to Firebase for Auth deletion to work. Without deployment, only Firestore data will be deleted.

### Check Deployment Status

Run this command to check if the function is deployed:
```bash
firebase functions:list
```

You should see: `deleteAuthUserOnProfileDelete`

### Deploy the Cloud Function

1. **Login to Firebase** (if not already logged in):
   ```bash
   firebase login
   ```

2. **Select your project**:
   ```bash
   firebase use --add
   ```
   Select your project from the list and give it an alias (e.g., "default")

3. **Deploy the function**:
   ```bash
   firebase deploy --only functions
   ```

4. **Verify deployment**:
   ```bash
   firebase functions:list
   ```

### Requirements
- Firebase project must be on the **Blaze (Pay-as-you-go)** plan
- Cloud Functions are free for the first 2M invocations/month
- You need Owner or Editor permissions on the Firebase project

## Testing

### Test the Complete Flow

1. **Create a test user** (via your app's registration)
2. **Login as admin** and go to User Management
3. **Delete the test user**
4. **Verify deletion**:
   - Check Firestore Console: User document should be gone
   - Check Authentication Console: User should be removed
   - Check Functions Logs: Should show "Successfully deleted auth user: {userId}"

### View Function Logs

```bash
firebase functions:log --only deleteAuthUserOnProfileDelete
```

Or view in Firebase Console:
- Go to Firebase Console → Functions → Logs
- Look for `deleteAuthUserOnProfileDelete` executions

## Error Handling

The implementation includes comprehensive error handling:

### Frontend (UserList.jsx)
- Confirmation dialog before deletion
- Loading state during deletion
- Success/error toast notifications
- Optimistic UI updates with rollback on failure

### Backend (userService.js)
- Try-catch blocks for all operations
- Detailed error logging
- Proper error propagation

### Cloud Function (functions/index.js)
- Handles missing Auth users gracefully
- Logs all operations
- Doesn't throw errors for already-deleted users

## Security

### Firestore Security Rules
Ensure your `firestore.rules` restricts user deletion to admins only:

```javascript
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth.uid == userId;
  allow delete: if request.auth != null && 
                get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

### Cloud Function Security
- Runs with Admin SDK privileges (bypasses security rules)
- Only triggered by Firestore document deletion
- No direct HTTP endpoint (cannot be called externally)

## Troubleshooting

### Issue: Auth user not being deleted

**Possible Causes:**
1. Cloud Function not deployed
   - Solution: Run `firebase deploy --only functions`

2. Function failed silently
   - Solution: Check logs with `firebase functions:log`

3. Wrong Firebase project
   - Solution: Verify with `firebase use` and check `.firebaserc`

4. Insufficient permissions
   - Solution: Ensure you have Owner/Editor role in Firebase project

### Issue: "Missing permissions" error

**Solution:** The service account needs proper permissions:
1. Go to Google Cloud Console
2. Navigate to IAM & Admin → Service Accounts
3. Find `firebase-adminsdk` service account
4. Ensure it has "Firebase Admin SDK Administrator Service Agent" role

## Code Files

### Key Files:
- `functions/index.js` - Cloud Function for Auth deletion
- `src/services/userService.js` - Frontend service for user operations
- `src/components/admin/UserList.jsx` - Admin UI for user management
- `firebase.json` - Firebase configuration
- `functions/package.json` - Cloud Function dependencies

### Dependencies:
- `firebase-admin` (^12.0.0) - Admin SDK for Auth deletion
- `firebase-functions` (^5.0.0) - Cloud Functions runtime

## Best Practices

1. ✅ **Always deploy functions after changes**
2. ✅ **Test in development environment first**
3. ✅ **Monitor function logs regularly**
4. ✅ **Keep Firebase CLI updated**: `npm install -g firebase-tools`
5. ✅ **Use confirmation dialogs for destructive actions**
6. ✅ **Implement proper error handling and user feedback**

## Next Steps

1. Deploy the Cloud Function (if not already done)
2. Test the complete deletion flow
3. Monitor the function logs
4. Set up alerts for function errors (optional)

## Support

If you encounter issues:
1. Check Firebase Console → Functions → Logs
2. Run `firebase functions:log` for detailed logs
3. Verify deployment with `firebase functions:list`
4. Check Firebase project billing status
