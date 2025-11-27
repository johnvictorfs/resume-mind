"use client";

import type { Experience } from "@local/schemas";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { MonthYearInput } from "~/components/ui/month-year-input";
import { Section } from "./section";

export function ExperiencesSection({
  experience,
  handleChange,
}: {
  experience: Experience[] | null;
  handleChange: (field: "experience", value: Experience[]) => void;
}) {
  function handleFieldChange<T extends keyof Experience>(
    index: number,
    field: T,
    value: Experience[T] | null,
  ) {
    const newExp = [...(experience || [])];
    if (!newExp[index]) {
      throw new Error(` Experience entry not found at index ${index}`);
    }
    newExp[index] = {
      ...newExp[index],
      [field]: value,
    };
    handleChange("experience", newExp);
  }

  return (
    <Section title="Experience">
      <div className="space-y-6">
        {(experience || []).map((exp, index) => (
          <div
            className="relative border-white/10 border-l-2 pl-4 transition-colors hover:border-primary/50"
            // biome-ignore lint/suspicious/noArrayIndexKey: Needs to maintain render when editing
            key={index}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    defaultValue={exp.company}
                    onChange={(e) => {
                      handleFieldChange(index, "company", e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    defaultValue={exp.role}
                    onChange={(e) => {
                      handleFieldChange(index, "role", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <MonthYearInput
                    onChange={(date) => {
                      handleFieldChange(index, "startAt", date);
                    }}
                    value={exp.startAt}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <MonthYearInput
                    onChange={(date) => {
                      handleFieldChange(index, "endAt", date);
                    }}
                    value={exp.endAt}
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
                        handleFieldChange(index, "bulletPoints", [
                          ...exp.bulletPoints.slice(0, bpIndex),
                          e.target.value,
                          ...exp.bulletPoints.slice(bpIndex + 1),
                        ]);
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
                        handleFieldChange(index, "bulletPoints", [
                          ...exp.bulletPoints.slice(0, bpIndex),
                          ...exp.bulletPoints.slice(bpIndex + 1),
                        ]);
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
                    handleFieldChange(index, "bulletPoints", [
                      ...(exp.bulletPoints || []),
                      "New accomplishment",
                    ]);
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
