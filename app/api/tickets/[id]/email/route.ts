import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { seats, price, email } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    console.log(`Sending email for ticket ${params.id} to ${email}:`, {
      seats,
      price,
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: "Ticket sent to your email successfully!",
        ticketId: params.id,
        email: email,
        seats,
        price,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending ticket email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send ticket email",
      },
      { status: 500 }
    );
  }
}
