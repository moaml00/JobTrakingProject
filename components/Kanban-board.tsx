"use client";
import { Board, Column, JobApplication } from "@/lib/models/modelsTypes";
import {
  Award,
  Calendar,
  Calendar1Icon,
  CheckCheckIcon,
  CheckCircle2,
  Divide,
  Mic,
  MoreHorizontal,
  MoreVertical,
  PenIcon,
  Trash2,
  XCircle,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import CreateApplicationForm from "./createApplication";
import board from "@/lib/models/board";
import JobCard from "./jobCard";

interface KanbanProps {
  board: Board;
  userId: string;
}

interface ColumnConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_COLOR: ColumnConfig[] = [
  {
    color: "bg-cyan-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <XCircle className="h-4 w-4" />,
  },
  {
    color: "bg-pink-500",
    icon: <PenIcon className="h-4 w-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedCols,
}: {
  column: Column;
  config: ColumnConfig;
  boardId: string;
  sortedCols: Column[];
}) {
  const sortedjobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];
  return (
    <Card className="p-0 shadow-lg min-w-[300px] flex-shrink-0">
      <CardHeader
        className={`p-4 ${config.color} flex justify-between items-center rounded-t-xl border-b-0`}
      >
        <div className="flex items-center space-x-2">
          <div>{config.icon}</div>
          <CardTitle className="font-bold">{column.name} </CardTitle>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <MoreVertical className="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                <p className="text-red-500"> Delete Column </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 bg-background min-h-[400px] rounded-b-lg">
        <div>
          {sortedjobs.map((job, key) => {
            return (
              <SrotableJobCard
                key={key}
                job={{ ...job, columnId: job.columnId || column._id }}
                column={sortedCols}
              />
            );
          })}
        </div>
        <CreateApplicationForm columnId={column._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
}

function SrotableJobCard({ job, column }: { job: JobApplication; column: Column[] }) {
  return (<div>
      <JobCard
      job={job}
      column={column}
      />
  </div>)
 
}

export default function Kanbanboard({ board, userId }: KanbanProps) {
  const columns = board.columns;
  const sortedcols = columns?.sort((a, b) => a.order - b.order) || [];

  return (
    <div>
      <div>
        {columns.map((col, key) => {
          const config = COLUMN_COLOR[key] || {
            color: "bg-gray-500",
            icon: <Calendar className="h-4 w-4" />,
          };

          return (
            <div className="">
            <DroppableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
              sortedCols={sortedcols}
            /> 
            </div>
         );
        })}
      </div>
    </div>
  );
}
