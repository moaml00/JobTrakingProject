"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Column, JobApplication } from "../models";
import board from "../models/board";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  columnId: string;
  boardId: string;
  tags?: string[];
  description?: string;
}

export async function createJopApplication(data: JobApplicationData) {
  const session = await  getSession();

  if (!session?.user) {
    console.log(session?.user);
    return { error: "Unauthorized" };
  }

  await connectDB();

  const {
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    tags,
    description,
  } = data;

  if (!company || !position || !columnId || !boardId) {
    return { error: "Missing required fields" };
  }

  const isboard = await board.findOne({
    _id: boardId,
    userId: session.user.id,
  });


  if (!isboard) {
    return { error: "board is not found" };
  }
  
  const isCol = Column.findOne({
    _id: columnId,
    boardId: boardId,
  });

  if (!isCol) {
    return { error: "column not found" };
  }

    const last_order= (
    await JobApplication 
    .findOne
    ({columnId})
    .sort({order:-1})
    .select("order")
    .lean()) as {order:number} || null


  const jobapplications = await JobApplication.create({
    company: company,
    position:position,
    location:location,
    notes:notes,
    salary:salary,
    jobUrl:jobUrl,
    userId:session.user.id,
    columnId:columnId,
    boardId:boardId,
    tags:tags||[],
    description:description,
    status:"applied",
    order: last_order? last_order.order + 1:0 
  });

  await Column.findByIdAndUpdate(
    columnId,
    {
    $push :{jobApplications:jobapplications._id}
  })

  revalidatePath("/dashboard");
  return {data:JSON.parse(JSON.stringify(jobapplications))}
}
