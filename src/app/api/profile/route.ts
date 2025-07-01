import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function PUT(request: NextRequest) {
  try {
    // Get token from header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify(token, process.env.JWT_SECRET!) as any;

    // Get request data
    const { name, email, phone } = await request.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Update user in database (replace with actual DB call)
    // const user = await updateUserInDB(decoded.UserID, { name, email, phone });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        UserID: decoded.UserID,
        name,
        email,
        phone,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}