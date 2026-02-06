import { Column, JobApplication } from "@/lib/models/modelsTypes";
import React from "react";
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

interface JobCard {
  column: Column[];
  job: JobApplication;
}

export default function JobCard({ column, job }: JobCard) {
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
                        <DropdownMenuItem key={e._id}>
                          Move To {e.name}
                        </DropdownMenuItem>
                         </div>
                     ))}
                  <div className="border">
                    <DropdownMenuItem>
                      <EditIcon className="mr-2 h-4 w-4" />
                    <p className="text-gray-900" >edit</p> 
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="mr-2 h-4 w-4" />
                     <p className="text-red-500" >Delete</p> 
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
    </div>
  );
}
