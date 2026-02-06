"use client";
import { Column, JobApplication } from "@/lib/models/modelsTypes";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Edit2,
  EditIcon,
  ExternalLink,
  MoreVertical,
  Tags,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { updateJobApplication } from "@/lib/actions/update-application";
import EditCard from "./edit-card";
import { deleteJob } from "@/lib/actions/delete-application";

interface JobCard {
  column: Column[];
  job: JobApplication;
}

export default function JobCard({ column, job }: JobCard) {
  const [isEditing, setIsEditing] = useState(false);


  async function hadleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });
    } catch (error) {
      console.log("failed to move job", error);
    }
  }
    async function handleDelete() {
    try {
      const result = await deleteJob(job._id);
      if(result.error)
      console.log("failed to move job", result.error);
    } catch (error) {
      console.log("failed to move job", error);
    }
  }

  return (
    <div>
      <Card className="cursor-pointer hover:shadow-lg bg-background shadow-sm group transition-shadow">
        <CardContent>
          <div className="p-4">
            {/* Header: title + menu */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-foreground font-bold">{job.position}</h1>
                <p className="text-muted-foreground font-light">
                  {job.company}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {column.length > 0 &&
                    column
                      .filter((e) => e._id !== job.columnId)
                      .map((e) => (
                        <div className="border">
                          <DropdownMenuItem
                            key={e._id}
                            onClick={() => hadleMove(e._id)}
                          >
                            Move To {e.name}
                          </DropdownMenuItem>
                        </div>
                      ))}
                  <div className="border">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <EditIcon className="mr-2 h-4 w-4" />
                      <p className="text-forground font-bold">edit</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>handleDelete()}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <p className="text-red-500 font-bold">Delete</p>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2 mt-2">
              {job.description && (
                <p className="text-muted-foreground font-light">
                  {job.description}
                </p>
              )}

              {job.tags && job.tags.length > 0 && (
                <div className="flex gap-3 mt-2 flex-wrap">
                  {job.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="bg-blue-200 font-semibold rounded-full text-blue-700 text-xs py-2 px-2 min-w-[48px] text-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {job.jobUrl && (
                <a
                  target="_blank"
                  href={job.jobUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex w-fit"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <EditCard job={job} open={isEditing} onOpenChange={setIsEditing} />
    </div>
  );
}
