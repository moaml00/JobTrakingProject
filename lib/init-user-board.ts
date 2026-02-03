import connectDB from "./db";
import { Board, Column } from "./models";

const defaultColumns = [
  { name: "Applied", order: 0 },
  { name: "Interviewing", order: 1 },
  { name: "offer", order: 2 },
  { name: "rejected", order: 3 },
];

export default async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    const board = await Board.create({
      userId,
      name: "Job Hunt",
      columns: [],
    });

    const columns = await Promise.all(
      defaultColumns.map(async (col) => {
        const column = await Column.create({
          ...col,
          boardId: board._id,
          jobapplications: [],
        });
        return column;
      })
        );

        board.columns = columns.map((col) => col._id);
        await board.save();
        return board;


  } catch (error) {
    throw new Error("Database connection failed");
  }
}
