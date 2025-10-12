import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '../../../lib/supabase'
import { db } from '../../../lib/neon-client'

// Helper function to get user from Supabase server-side
async function getUser(req: Request) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function POST(request: Request) {
  try {
    const user = await getUser(request);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json()
    const { name, client, description } = body

    if (!name) { // Client is not mandatory for project creation
      return new NextResponse("Project name is required", { status: 400 });
    }

    // Use Neon DB client to insert the new project
    const newProject = await db.insert('projects', {
      user_id: user.id,
      name,
      // The 'projects' table from neon-setup.sql does not have a 'client' column.
      // It has a 'customer_id' column which is a UUID.
      // For now, I will omit this, but it needs a proper implementation with customer selection.
      description,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json(newProject)
  } catch (error) {
    console.error('[PROJECTS_POST]', error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await getUser(request);
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Use Neon DB client to get projects for the user
    const userProjects = await db.query('projects', {
      where: {
        user_id: user.id
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return NextResponse.json(userProjects);
  } catch (error) {
    console.error('[PROJECTS_GET]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
