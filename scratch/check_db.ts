import { neon } from '@neondatabase/serverless';

async function check() {
	const sql = neon(process.env.DATABASE_URL!);
	await sql`DROP TABLE IF EXISTS covers CASCADE`;
	await sql`DROP TABLE IF EXISTS songs CASCADE`;
	await sql`DROP TYPE IF EXISTS gender CASCADE`;
	console.log('Dropped tables and types');
}

check();
