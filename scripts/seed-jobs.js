#!/usr/bin/env node
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/jobtracker";

const { Schema } = mongoose;

const BoardSchema = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
  },
  { timestamps: true },
);

const ColumnSchema = new Schema(
  {
    name: { type: String, required: true },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    order: { type: Number, required: true, default: 0 },
    jobApplications: [{ type: Schema.Types.ObjectId, ref: "JobApplication" }],
  },
  { timestamps: true },
);

const JobApplicationSchema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String },
    status: { type: String, required: true, default: "applied" },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
      index: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    userId: { type: String, required: true, index: true },
    order: { type: Number, required: true, default: 0 },
    notes: { type: String },
    salary: { type: String },
    jobUrl: { type: String },
    appliedDate: { type: Date },
    tags: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true },
);

const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);
const Column = mongoose.models.Column || mongoose.model("Column", ColumnSchema);
const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);

async function seed() {
  await mongoose.connect(MONGO_URI, { bufferCommands: false });
  console.log("Connected to", MONGO_URI);

  const userId = "6981d3863313d32fe827b76a";

  // Create board
  const board = new Board({ name: "Seed Board", userId });
  await board.save();

  // Create columns
  const columnsData = [
    { name: "Backlog", order: 0 },
    { name: "In Progress", order: 1 },
    { name: "Offer / Done", order: 2 },
  ];

  const columns = [];
  for (const c of columnsData) {
    const col = new Column({ ...c, boardId: board._id });
    await col.save();
    columns.push(col);
    board.columns.push(col._id);
  }

  await board.save();

  // Dummy job applications
  const dummyJobs = [
    {
      company: "Acme Corp",
      position: "Frontend Engineer",
      location: "Remote",
      status: "applied",
      tags: ["react", "frontend"],
      salary: "$100k",
    },
    {
      company: "Globex",
      position: "Backend Engineer",
      location: "NY",
      status: "interview",
      tags: ["node", "api"],
      salary: "$110k",
    },
    {
      company: "Initech",
      position: "Fullstack Developer",
      location: "SF",
      status: "applied",
      tags: ["fullstack"],
      salary: "$120k",
    },
    {
      company: "Hooli",
      position: "SRE",
      location: "Remote",
      status: "offer",
      tags: ["infra"],
      salary: "$130k",
    },
    {
      company: "Vehement Capital",
      position: "Data Engineer",
      location: "Remote",
      status: "applied",
      tags: ["data"],
      salary: "$115k",
    },
    {
      company: "Stark Industries",
      position: "Platform Engineer",
      location: "LA",
      status: "interview",
      tags: ["platform"],
      salary: "$140k",
    },
    {
      company: "Wayne Enterprises",
      position: "Product Engineer",
      location: "Gotham",
      status: "applied",
      tags: ["product"],
      salary: "$105k",
    },
    {
      company: "Wonka",
      position: "Frontend Intern",
      location: "Remote",
      status: "applied",
      tags: ["intern"],
      salary: "$30k",
    },
  ];

  const createdJobs = [];
  for (let i = 0; i < dummyJobs.length; i++) {
    const col = columns[i % columns.length];
    const j = dummyJobs[i];
    const job = new JobApplication({
      ...j,
      columnId: col._id,
      boardId: board._id,
      userId,
      order: i,
      appliedDate: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
    });
    await job.save();
    createdJobs.push(job);
    col.jobApplications.push(job._id);
    await col.save();
  }

  console.log(
    `Seeded ${createdJobs.length} job applications for user ${userId}`,
  );
  await mongoose.disconnect();
  console.log("Disconnected. Seed complete.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
