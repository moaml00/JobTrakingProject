"use client";

import React, { useEffect, useState } from "react";
import { Board, Column } from "../models/modelsTypes";

export default function useBorad(initalBoard?: Board | null) {
  const [board, setboard] = useState<Board | null>(initalBoard || null);
  const [columns, setcol] = useState<Column[]>(initalBoard?.columns || []);
  const [error, seterror] = useState<string | null>(null);

  useEffect(()=>{
    if(initalBoard){
    setboard(initalBoard);
    setcol(initalBoard?.columns||[]);
    }
  },[initalBoard])
   
  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {

  }

  return { board, columns, error ,moveJob};
}
