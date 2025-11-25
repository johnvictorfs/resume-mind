"use client";

import type { Experience } from "@local/schemas";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { formatDate } from "~/logic/date";
import { Section } from "./section";

export function ExperiencesSection({
  experience,
  handleChange,
}: {
  experience: Experience[] | null;
  handleChange: (field: "experience", value: Experience[]) => void;
}) {
  return (
    <Section title="Experience">
      <div className="space-y-6">
        {(experience || []).map((exp, index) => (
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
                      const newExp = [...(experience || [])];
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
                      const newExp = [...(experience || [])];
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
                      const newExp = [...(experience || [])];
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
                      const newExp = [...(experience || [])];
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
                        const newExp = [...(experience || [])];
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
                        const newExp = [...(experience || [])];
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
                    const newExp = [...(experience || [])];
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
                const newExp = (experience || []).filter((_, i) => i !== index);
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
              ...(experience || []),
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
  );
}
