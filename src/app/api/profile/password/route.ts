import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify(token, process.env.JWT_SECRET!) as any;

    const { currentPassword, newPassword } = await request.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new password are required" },
        { status: 400 }
      );
    }

    // Verify current password (replace with actual DB call)
    // const isCurrentPasswordValid = await verifyCurrentPassword(decoded.UserID, currentPassword);
    // if (!isCurrentPasswordValid) {
    //   return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    // }

    // Hash and update new password
    // const hashedPassword = await bcrypt.hash(newPassword, 12);
    // await updatePasswordInDB(decoded.UserID, hashedPassword);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}