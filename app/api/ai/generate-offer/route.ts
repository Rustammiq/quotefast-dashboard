import { NextRequest, NextResponse } from 'next/server';
import { generateQuotationWithAI } from '@/lib/github-models';

export async function POST(request: NextRequest) {
  try {
    const { companyName, description, industry, template } = await request.json();

    if (!companyName || !description || !industry) {
      return NextResponse.json({
        success: false,
        message: 'companyName, description, and industry are required'
      }, { status: 400 });
    }

    const offerContent = await generateQuotationWithAI(
      companyName,
      description,
      industry
    );

    return NextResponse.json({
      success: true,
      offerContent: offerContent,
      message: 'AI offer generated successfully'
    });

  } catch (error) {
    console.error('AI offer generation error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      message: 'AI offer generation failed'
    }, { status: 500 });
  }
}
