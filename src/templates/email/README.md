# Supabase Email Templates for SAKANA // 魚

These templates are short, minimal, responsive HTML files stored directly in this repository for copying into **Supabase Dashboard > Authentication > Email Templates**.

| Template Name | File Path | Supabase Tab | Recommended Subject |
|---|---|---|---|
| **Confirm Signup** | [`confirmation.html`](./confirmation.html) | Confirm signup | `Confirm your email for SAKANA // 魚` |
| **Magic Link** | [`magic-link.html`](./magic-link.html) | Magic Link | `Your login link for SAKANA // 魚` |
| **Reset Password** | [`reset-password.html`](./reset-password.html) | Reset Password | `Reset your password for SAKANA // 魚` |
| **Invite User** | [`invite.html`](./invite.html) | Invite user | `You've been invited to SAKANA // 魚` |
| **Change Email** | [`change-email.html`](./change-email.html) | Change Email Address | `Confirm email change for SAKANA // 魚` |

### Variables Used
- `{{ .ConfirmationURL }}`: Direct action URL.
- `{{ .Token }}`: 6-digit confirmation/login token for manual entry.
