import postgres from "postgres";

/**
 * Script to grant or set user roles (e.g. 'admin' or 'user') in Supabase.
 *
 * Usage:
 *   # Dry run (default - does NOT modify anything):
 *   npm run set-role -- email@domain.com admin --dry-run
 *   node --env-file=.env.local scripts/set-role.mjs email@domain.com admin --dry-run
 *
 *   # Live execution (when ready):
 *   node --env-file=.env.local scripts/set-role.mjs email@domain.com admin
 */

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const cleanArgs = args.filter((a) => a !== "--dry-run");

const email = cleanArgs[0];
const targetRole = cleanArgs[1] || "admin";

if (!email) {
  console.log(`
Usage:
  node --env-file=.env.local scripts/set-role.mjs <email> [role] [--dry-run]

Options:
  --dry-run    Inspect the database and preview changes without modifying anything
  [role]       Role to assign (default: 'admin')
`);
  process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing in environment");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

async function main() {
  console.log("\n==============================================");
  console.log("  Sakana Japanese - User Role Management");
  console.log("==============================================");
  console.log(`Target Email: ${email}`);
  console.log(`Target Role:  ${targetRole}`);
  console.log(`Mode:         ${isDryRun ? "DRY RUN (no database changes)" : "LIVE EXECUTION"}`);
  console.log("==============================================\n");

  try {
    // 1. Inspect public.users table
    const [publicUser] = await sql`
      SELECT id, email, display_name, role, created_at 
      FROM public.users 
      WHERE LOWER(email) = LOWER(${email})
      LIMIT 1;
    `;

    // 2. Inspect auth.users table (if accessible)
    let authUser = null;
    try {
      const [row] = await sql`
        SELECT id, email, raw_user_meta_data, raw_app_meta_data, created_at 
        FROM auth.users 
        WHERE LOWER(email) = LOWER(${email})
        LIMIT 1;
      `;
      authUser = row;
    } catch {
      // auth schema might require elevated permissions or specific configuration
    }

    console.log("🔍 Current Status in Supabase:");
    if (publicUser) {
      console.log(`  ✓ Found in public.users:`);
      console.log(`    - ID:           ${publicUser.id}`);
      console.log(`    - Display Name: ${publicUser.display_name || "(none)"}`);
      console.log(`    - Current Role: ${publicUser.role}`);
    } else {
      console.log(`  ⚠ Not found in public.users (account not created yet).`);
    }

    if (authUser) {
      console.log(`  ✓ Found in auth.users:`);
      console.log(`    - Auth UID:     ${authUser.id}`);
      console.log(`    - App Metadata: ${JSON.stringify(authUser.raw_app_meta_data || {})}`);
    } else {
      console.log(`  ℹ Not found in auth.users.`);
    }

    if (isDryRun) {
      console.log("\n----------------------------------------------");
      console.log("DRY RUN PREVIEW (NO CHANGES COMMITTED):");
      if (publicUser) {
        console.log(`  [SIMULATION] Would UPDATE public.users SET role = '${targetRole}' WHERE email = '${email}';`);
      } else {
        console.log(`  [SIMULATION] Account does not exist yet. When created, role will default to 'user' or can be inserted as '${targetRole}'.`);
      }
      if (authUser) {
        console.log(`  [SIMULATION] Would sync raw_app_meta_data.role = '${targetRole}' in auth.users.`);
      }
      console.log("----------------------------------------------");
      console.log("\n✅ Dry run completed successfully. Zero changes were made to the database.");
      return;
    }

    // LIVE EXECUTION
    console.log("\nApplying changes...");
    if (publicUser) {
      await sql`
        UPDATE public.users 
        SET role = ${targetRole}, updated_at = now() 
        WHERE LOWER(email) = LOWER(${email});
      `;
      console.log(`✓ Updated public.users role to '${targetRole}' for ${email}`);
    } else {
      console.log(`ℹ Account ${email} does not exist yet. Please create or register the account first.`);
    }

    if (authUser) {
      const newAppMeta = { ...(authUser.raw_app_meta_data || {}), role: targetRole };
      await sql`
        UPDATE auth.users 
        SET raw_app_meta_data = ${sql.json(newAppMeta)}
        WHERE id = ${authUser.id};
      `;
      console.log(`✓ Updated auth.users raw_app_meta_data.role to '${targetRole}'`);
    }

    console.log("\n✅ Done!");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
