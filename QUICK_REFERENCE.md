# 🔥 Firebase User Deletion - Quick Reference

## ⚡ Quick Deploy (ONE COMMAND)

```bash
firebase deploy --only functions
```

---

## 📋 Current Status

- ✅ Cloud Function Code: **COMPLETE**
- ✅ Frontend UI: **COMPLETE**  
- ✅ Service Layer: **COMPLETE**
- ⏳ Deployment: **PENDING** ← You need to do this!

---

## 🚀 Deploy Now

### Option 1: Automated Script (Recommended)
```bash
.\deploy-cloud-function.ps1
```

### Option 2: Manual Steps
```bash
# 1. Login
firebase login

# 2. Select project
firebase use --add

# 3. Deploy
firebase deploy --only functions
```

---

## ✅ Verify Deployment

```bash
firebase functions:list
```

Should show: `deleteAuthUserOnProfileDelete`

---

## 🧪 Test It

1. Create test user in your app
2. Login as admin → User Management
3. Delete the test user
4. Check Firebase Console:
   - Authentication: User gone ✅
   - Firestore: Document gone ✅
   - Functions Logs: Success message ✅

---

## 📊 View Logs

```bash
# All logs
firebase functions:log

# Specific function
firebase functions:log --only deleteAuthUserOnProfileDelete

# Real-time
firebase functions:log --only deleteAuthUserOnProfileDelete --follow
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| "No functions found" | Deploy: `firebase deploy --only functions` |
| "Missing permissions" | Upgrade to Blaze plan in Firebase Console |
| "Not authenticated" | Login: `firebase login` |
| Auth user not deleted | Check logs: `firebase functions:log` |

---

## 📁 Important Files

- `functions/index.js` - Cloud Function code
- `src/components/admin/UserList.jsx` - Admin UI
- `src/services/userService.js` - Delete logic
- `DEPLOYMENT_STATUS.md` - Full documentation
- `USER_DELETION_GUIDE.md` - Complete guide

---

## 🎯 How It Works

```
Admin deletes user
    ↓
Firestore document deleted
    ↓
Cloud Function triggers
    ↓
Auth user deleted automatically
```

---

## 💡 Remember

- ⚠️ Requires **Blaze (Pay-as-you-go)** plan
- ✅ Free tier: 2M invocations/month
- 🔒 Only admins can delete users
- 🚫 Deletion is **permanent** and cannot be undone

---

## 🆘 Need Help?

1. Read: `DEPLOYMENT_STATUS.md`
2. Check logs: `firebase functions:log`
3. Verify project: `firebase use`
4. Check billing: Firebase Console → Settings

---

**Last Updated:** 2026-01-20  
**Next Step:** Run `firebase deploy --only functions`
