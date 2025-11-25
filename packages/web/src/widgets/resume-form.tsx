"use client";

import type { ResumeData } from "@local/schemas";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Info,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "";
  try {
    return format(new Date(date), "yyyy-MM");
  } catch (_e) {
    return "";
  }
};

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const handleChange = (
    section: keyof ResumeData,
    value: ResumeData[keyof ResumeData],
  ) => {
    onChange({ ...data, [section]: value });
  };

  const handleContactChange = (field: string, value: string) => {
    onChange({
      ...data,
      contacts: {
        ...data.contacts,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8 p-4">
      <div className="rounded-md border border-blue-700 bg-blue-900/20 p-3 text-blue-300 text-sm">
        <Info className="mr-2 mb-0.5 inline h-4 w-4 text-blue-400" />
        Your information is auto-saved locally in your browser
      </div>

      {/* Personal Info Section */}
      <Section title="Personal Information">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Doe"
              value={data.name || ""}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              value={data.email || ""}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 234 567 890"
              value={data.phone || ""}
            />
          </div>
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              onChange={(e) => handleContactChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              value={data.contacts.linkedin || ""}
            />
          </div>
          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input
              onChange={(e) => handleContactChange("github", e.target.value)}
              placeholder="github.com/johndoe"
              value={data.contacts.github || ""}
            />
          </div>
        </div>
      </Section>

      {/* Summary Section */}
      <Section
        action={
          <div title="Coming soon">
            <Button
              className="h-8 text-primary hover:bg-primary/10 hover:text-primary"
              disabled
              size="sm"
              variant="ghost"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Enhance
            </Button>
          </div>
        }
        title="Professional Summary"
      >
        <div title="Coming soon">
          <Textarea
            className="min-h-[100px]"
            disabled
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Brief overview of your career..."
            value={data.summary || ""}
          />
        </div>
      </Section>

      {/* Experience Section */}
      <Section title="Experience">
        <div className="space-y-6">
          {(data.experience || []).map((exp, index) => (
            <div
              className="relative border-white/10 border-l-2 pl-4 transition-colors hover:border-primary/50"
              key={exp.role + exp.company + exp.startAt.toString()}
            >
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      onChange={(e) => {
                        const newExp = [...(data.experience || [])];
                        if (!newExp[index]) {
                          throw new Error(
                            ` Experience entry not found at index ${index}`,
                          );
                        }
                        newExp[index] = {
                          ...newExp[index],
                          company: e.target.value,
                        };
                        handleChange("experience", newExp);
                      }}
                      value={exp.company}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      onChange={(e) => {
                        const newExp = [...(data.experience || [])];
                        if (!newExp[index]) {
                          throw new Error(
                            ` Experience entry not found at index ${index}`,
                          );
                        }
                        newExp[index] = {
                          ...newExp[index],
                          role: e.target.value,
                        };
                        handleChange("experience", newExp);
                      }}
                      value={exp.role}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      onChange={(e) => {
                        const newExp = [...(data.experience || [])];
                        if (!newExp[index]) {
                          throw new Error(
                            ` Experience entry not found at index ${index}`,
                          );
                        }
                        newExp[index] = {
                          ...newExp[index],
                          startAt: e.target.valueAsDate || new Date(),
                        };
                        handleChange("experience", newExp);
                      }}
                      type="month"
                      value={formatDate(exp.startAt)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      onChange={(e) => {
                        const newExp = [...(data.experience || [])];
                        if (!newExp[index]) {
                          throw new Error(
                            ` Experience entry not found at index ${index}`,
                          );
                        }
                        newExp[index] = {
                          ...newExp[index],
                          endAt: e.target.valueAsDate,
                        };
                        handleChange("experience", newExp);
                      }}
                      type="month"
                      value={formatDate(exp.endAt)}
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Leave empty for Present
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bullet Points</Label>
                  {exp.bulletPoints.map((point, bpIndex) => (
                    <div className="flex gap-2" key={point}>
                      <Input
                        onChange={(e) => {
                          const newExp = [...(data.experience || [])];
                          if (!newExp[index]) {
                            throw new Error(
                              ` Experience entry not found at index ${index}`,
                            );
                          }

                          const newPoints = [...newExp[index].bulletPoints];
                          newPoints[bpIndex] = e.target.value;
                          newExp[index] = {
                            ...newExp[index],
                            bulletPoints: newPoints,
                          };
                          handleChange("experience", newExp);
                        }}
                        value={point}
                      />

                      <Button
                        disabled
                        size="icon"
                        title="Enhance"
                        variant="ghost"
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={() => {
                          const newExp = [...(data.experience || [])];
                          if (!newExp[index]) {
                            throw new Error(
                              ` Experience entry not found at index ${index}`,
                            );
                          }
                          const newPoints = newExp[index].bulletPoints.filter(
                            (_, i) => i !== bpIndex,
                          );
                          newExp[index] = {
                            ...newExp[index],
                            bulletPoints: newPoints,
                          };
                          handleChange("experience", newExp);
                        }}
                        size="icon"
                        title="Delete Bullet Point"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const newExp = [...(data.experience || [])];
                      if (newExp[index]) {
                        newExp[index] = {
                          ...newExp[index],
                          bulletPoints: [
                            ...newExp[index].bulletPoints,
                            "New accomplishment",
                          ],
                        };
                      }
                      handleChange("experience", newExp);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="mr-2 h-3 w-3" /> Add Bullet Point
                  </Button>
                </div>
              </div>
              <Button
                className="-right-2 -top-2 absolute h-6 w-6 pr-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  const newExp = (data.experience || []).filter(
                    (_, i) => i !== index,
                  );
                  handleChange("experience", newExp);
                }}
                size="icon"
                title="Delete Experience Entry"
                variant="ghost"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button
            className="w-full border-white/20 border-dashed bg-transparent hover:border-primary hover:bg-primary/5"
            onClick={() => {
              handleChange("experience", [
                ...(data.experience || []),
                {
                  company: "",
                  role: "",
                  startAt: new Date(),
                  endAt: null,
                  bulletPoints: ["New accomplishment"],
                },
              ]);
            }}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      </Section>

      {/* Education Section */}
      <Section title="Education">
        <div className="space-y-6">
          {(data.education || []).map((edu, index) => (
            <div
              className="relative border-white/10 border-l-2 pl-4"
              key={edu.institution + edu.degree + edu.startAt.toString()}
            >
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      onChange={(e) => {
                        const newEdu = [...(data.education || [])];
                        if (!newEdu[index]) {
                          throw new Error(
                            ` Education entry not found at index ${index}`,
                          );
                        }
                        newEdu[index] = {
                          ...newEdu[index],
                          institution: e.target.value,
                        };
                        handleChange("education", newEdu);
                      }}
                      value={edu.institution}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      onChange={(e) => {
                        const newEdu = [...(data.education || [])];
                        if (!newEdu[index]) {
                          throw new Error(
                            ` Education entry not found at index ${index}`,
                          );
                        }
                        newEdu[index] = {
                          ...newEdu[index],
                          degree: e.target.value,
                        };
                        handleChange("education", newEdu);
                      }}
                      value={edu.degree}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      onChange={(e) => {
                        const newEdu = [...(data.education || [])];
                        if (!newEdu[index]) {
                          throw new Error(
                            ` Education entry not found at index ${index}`,
                          );
                        }
                        newEdu[index] = {
                          ...newEdu[index],
                          startAt: e.target.valueAsDate || new Date(),
                        };
                        handleChange("education", newEdu);
                      }}
                      type="month"
                      value={formatDate(edu.startAt)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      onChange={(e) => {
                        const newEdu = [...(data.education || [])];
                        if (!newEdu[index]) {
                          throw new Error(
                            ` Education entry not found at index ${index}`,
                          );
                        }
                        newEdu[index] = {
                          ...newEdu[index],
                          endAt: e.target.valueAsDate,
                        };
                        handleChange("education", newEdu);
                      }}
                      type="month"
                      value={formatDate(edu.endAt)}
                    />
                  </div>
                </div>
              </div>
              <Button
                className="-right-2 -top-2 absolute h-6 w-6 pr-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  const newEdu = (data.education || []).filter(
                    (_, i) => i !== index,
                  );
                  handleChange("education", newEdu);
                }}
                size="icon"
                title="Delete Education Entry"
                variant="ghost"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button
            className="w-full border-white/20 border-dashed bg-transparent hover:border-primary hover:bg-primary/5"
            onClick={() => {
              handleChange("education", [
                ...(data.education || []),
                {
                  institution: "",
                  degree: "",
                  startAt: new Date(),
                  endAt: null,
                  notes: "",
                },
              ]);
            }}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </Section>

      {/* Skills Section */}
      <Section title="Skills">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = e.currentTarget.value.trim();
                  if (val) {
                    const newSkills = val
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    handleChange("skills", [...data.skills, ...newSkills]);
                    e.currentTarget.value = "";
                  }
                }
              }}
              placeholder="Add skills (comma separated)..."
            />

            <div title="Coming soon">
              <Button disabled size="sm" variant="ghost">
                <Sparkles className="mr-1 h-3 w-3" />
                Add from experiences
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary text-sm"
                key={skill}
              >
                {skill}
                <button
                  className="ml-2 hover:text-white"
                  onClick={() => {
                    const newSkills = data.skills.filter((_, i) => i !== index);
                    handleChange("skills", newSkills);
                  }}
                  type="button"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 font-semibold text-lg text-white transition-colors hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
          {title}
        </button>
        {action}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
          >
            <div className="pt-2 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
