"use client";
import { Board, Column, JobApplication } from "@/lib/models/modelsTypes";
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Award,
  Calendar,
  Calendar1Icon,
  CheckCheckIcon,
  CheckCircle2,
  ColumnsIcon,
  Divide,
  Mic,
  MoreHorizontal,
  MoreVertical,
  PenIcon,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
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
import UseBorad from "@/lib/hooks/useBorad";
import useBorad from "@/lib/hooks/useBorad";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { date } from "better-auth";
import { CSS } from "@dnd-kit/utilities";

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
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });

  const sortedjobs = [...(column.jobApplications ?? [])].sort(
  (a, b) => a.order - b.order
);

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

      <CardContent
        className={`space-y-4 pt-4 bg-background min-h-[400px] rounded-b-lg ${isOver ? "ring-blue-500" : ""} `}
        ref={setNodeRef}
      >
          <SortableContext items={sortedjobs.map((job)=>job._id)} strategy={verticalListSortingStrategy}>
          {sortedjobs.map((job, key) => {
            return (
              <SrotableJobCard
                key={job._id}
                job={{ ...job, columnId: job.columnId || column._id }}
                column={sortedCols}
              />
            );
          })}
          </SortableContext>
        <CreateApplicationForm columnId={column._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
}

function SrotableJobCard({
  job,
  column,
}: {
  job: JobApplication;
  column: Column[];
}) {
  const {attributes,listeners,transform,transition,isDragging,setNodeRef}=useSortable({
    id:job._id,
    data:{
      type:"job",
      job,
    },
  })
  const  style ={
    transform:CSS.Transform.toString(transform),
    transition,
    opacity: isDragging?0.5:1,
    
  }
  return (
    <div ref={setNodeRef} style={style}>
      <JobCard job={job} column={column} DragHandleProps={{...attributes,...listeners}}  /> 
    </div>
  );
} 

export default function Kanbanboard({ board, userId }: KanbanProps) {
  const {active,setactive}=useState<string|null>(null) 
  const { columns, moveJob } = useBorad(board);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const sortedcols = columns?.sort((a, b) => a.order - b.order) || [];
  async function handleDargStart(event:DragStartEvent) {
 setactive(event.active.id as string) 
  }
  async function handleDragEnd(e:DragEndEvent) {
    const {active,over}=e
    setactive(null);

  if(!over || !board._id)return;

  const activeid=active.id as string ;
  const  overid=over.id as string ;
  
  let draggedJob:JobApplication |null=null
  let SourceColumn:Column |null=null
  let sourceIndex=-1;
  
  for (const column of sortedcols){
    const jobs= column.jobApplications.sort((a,b)=>a.order-b.order);
    const jobindex=jobs.findIndex((j)=> j._id ===activeid);

      if(jobindex!==-1){
       draggedJob=jobs[jobindex] 
       SourceColumn= column
       sourceIndex=jobindex
       break;
    }
  }
  if(!draggedJob || !SourceColumn)return;

  const targetCol= sortedcols.find((col)=>col._id ===over.id);
  const targetJob=sortedcols.flatMap((col)=>col.jobApplications||[])
                          .find((job)=>job._id ===over.id)


    let targetColumnId:string;
    let neworder:number 

    if(targetCol){
      targetColumnId=targetCol._id
      const jobIntarget=targetCol.jobApplications.filter((j)=>j._id!==activeid)
      .sort((a,b)=>a.order-b.order);
      neworder=jobIntarget.length;
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragEnd}
      onDragEnd={handleDargStart}
    >
      <div className="space-y-4 ">
        <div className="flex gap-4 overflow-auto pb-4">
          {sortedcols.map((col, key) => {
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
    </DndContext>
  );
}
