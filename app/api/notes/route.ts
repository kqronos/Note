import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const NOTES_FILE = path.join(process.cwd(), "data", "notes.json");
const MAX_FILE_SIZE_MB = 10;

function getFileSizeInMB(filePath: string): number {
  if (!fs.existsSync(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return stats.size / (1024 * 1024); // Convert bytes to MB
}

export async function GET() {
  if (!fs.existsSync(NOTES_FILE)) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify([])); // Create file if it doesn't exist
  }
  const notes = fs.readFileSync(NOTES_FILE, "utf-8");
  return NextResponse.json(JSON.parse(notes));
}

export async function POST(req: Request) {
  const fileSize = getFileSizeInMB(NOTES_FILE);
  if (fileSize >= MAX_FILE_SIZE_MB) {
    return NextResponse.json(
      { error: "File size limit reached. Cannot add more notes." },
      { status: 400 }
    );
  }

  const newNote = await req.json();
  const notes = fs.existsSync(NOTES_FILE)
    ? JSON.parse(fs.readFileSync(NOTES_FILE, "utf-8"))
    : [];

  notes.push(newNote);
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2)); // Save notes to file
  return NextResponse.json({ success: true });
}