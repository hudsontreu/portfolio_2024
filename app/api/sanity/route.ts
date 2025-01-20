import { client } from '../../../sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  console.log('API route called with query:', query);

  if (!query) {
    console.error('No query provided');
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    console.log('Executing Sanity query...');
    const data = await client.fetch(query);
    console.log('Sanity query result:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Sanity query error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}