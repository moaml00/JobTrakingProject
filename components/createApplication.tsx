"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createJopApplication } from "@/lib/actions/create-application";
import { Alert } from "./ui/alert";

interface ApplicationForm {
  columnId?: string;
  boardId?: string;
}

interface FormData {
  company: string;
  position: string;
  location: string;
  salary: string;
  jobUrl: string;
  tags: string;
  notes: string;
  description: string;
}
export default function CreateApplicationForm({
  columnId,
  boardId,
}: ApplicationForm) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company: "",
    position: "",
    location: "",
    salary: "",
    jobUrl: "",
    tags: "",
    notes: "",
    description: "",
  });

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const CreateApp = await createJopApplication({
        ...formData,
           columnId,
           boardId,
         tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });
      if (!CreateApp.error) {
      setFormData(INITIAL_FORM_DATA); 
      console.log("job-created");
      } else {
        console.log("Failed to createJob", CreateApp.error);
        setFormData(INITIAL_FORM_DATA);
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setIsOpen(false);
    }
  };
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>
        <Button variant="outline" className=" w-full">
          <Plus className=" mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </DialogTrigger>
      {/* Form content goes here */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job Application</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new job application to your board.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 ">
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <label htmlFor="company">Company*</label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="position">Position*</label>
                <Input
                  type="text"
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 space-y-">
              <div>
                <label htmlFor="location">Location*</label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="salary">Salary*</label>
                <Input
                  type="text"
                  id="salary"
                  name="salary"
                  required
                  placeholder="eg. 5000 sar "
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 ">
            <div className="">
              <label htmlFor="jobUrl">Job URL</label>
              <Input
                type="text"
                id="jobUrl"
                name="jobUrl"
                placeholder="eg. https://example.com/job/123"
                value={formData.jobUrl}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="tags">Tags </label>
              <Input
                type="text"
                id="tags"
                name="tags"
                placeholder="eg. reat,next.js"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="notes">Notes</label>
              <Input
                type="text"
                id="notes"
                name="notes"
                placeholder=""
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                placeholder=""
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row-reverse items-center">
            <Button type="submit"  className="w-40 mt-4 bg-background text-foreground shadow-2xl border-solid  hover:bg-muted-foreground">
              Create Application
            </Button>
            <Button
              type="button"
              className="bg-red-500 w-20 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
