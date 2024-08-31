// src/app/api/hello/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Retornar uma resposta com "Hello, World!"
    return NextResponse.json({ message: 'Hello, World!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
