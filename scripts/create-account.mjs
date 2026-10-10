import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_NEON_AUTH_URL ||
  "https://ep-soft-union-b3p097ai.neonauth.c-4.ap-southeast-1.aws.neon.tech/neondb/auth";

const DATABASE_URL = process.env.DATABASE_URL;

async function createAccount() {
  const args = process.argv.slice(2);
  const email = args[0] || "pilot@sakana.net";
  const password = args[1] || "SakanaPassword123!";
  const name = args[2] || email.split("@")[0];

  console.log(`\n==============================================`);
  console.log(`  Sakana Japanese - Account Creation Script  `);
  console.log(`==============================================`);
  console.log(`Email:    ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Name:     ${name}`);
  console.log(`Auth URL: ${AUTH_BASE_URL}\n`);

  // 1. Attempt to create user via Neon Managed Better Auth API
  try {
    console.log(`[1/2] Creating user via Neon Better Auth endpoint...`);
    const res = await fetch(`${AUTH_BASE_URL}/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      console.log(`✓ Successfully created in Neon Auth!`);
      console.log(`  User ID: ${data?.user?.id || "(auto-assigned)"}`);
    } else {
      if (data?.code === "USER_ALREADY_EXISTS") {
        console.log(`ℹ Notice: User already exists in Neon Auth.`);
      } else {
        console.warn(`! Neon Auth API response:`, data?.message || res.statusText);
      }
    }
  } catch (err) {
    console.warn(`! Neon Auth endpoint call warning: ${err.message}`);
  }

  // 2. Also ensure record exists in public.users table in Postgres
  if (DATABASE_URL) {
    try {
      console.log(`[2/2] Ensuring record in public.users table...`);
      const sql = neon(DATABASE_URL);
      await sql`
        INSERT INTO users (id, email, display_name)
        VALUES (${email}, ${email}, ${name})
        ON CONFLICT (email) DO UPDATE SET
          display_name = EXCLUDED.display_name,
          updated_at = now();
      `;
      console.log(`✓ Record synchronized with public.users table!`);
    } catch (dbErr) {
      console.warn(`! DB synchronization warning: ${dbErr.message}`);
    }
  }

  console.log(`\n==============================================`);
  console.log(`Account ready! You can now log in with:`);
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`==============================================\n`);
}

createAccount().catch((err) => {
  console.error("Fatal error creating account:", err);
  process.exit(1);
});
