"use client";

import type { Education } from "@local/schemas";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { MonthYearInput } from "~/components/ui/month-year-input";
import { Section } from "./section";

export function EducationSection({
  education,
  handleChange,
}: {
  education: Education[] | null;
  handleChange: (field: "education", value: Education[]) => void;
}) {
  function handleFieldChange<T extends keyof Education>(
    index: number,
    field: T,
    value: Education[T] | null,
  ) {
    const newEdu = [...(education || [])];
    if (!newEdu[index]) {
      throw new Error(` Education entry not found at index ${index}`);
    }

    newEdu[index] = {
      ...newEdu[index],
      [field]: value,
    };

    handleChange("education", newEdu);
  }

  return (
    <Section title="Education">
      <div className="space-y-6">
        {(education || []).map((edu, index) => (
          <div
            className="relative border-white/10 border-l-2 pl-4"
            // biome-ignore lint/suspicious/noArrayIndexKey: Needs to maintain render when editing
            key={index}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    onChange={(e) => {
                      handleFieldChange(index, "institution", e.target.value);
                    }}
                    value={edu.institution}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    onChange={(e) => {
                      handleFieldChange(index, "degree", e.target.value);
                    }}
                    value={edu.degree}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <MonthYearInput
                    onChange={(date) =>
                      handleFieldChange(index, "startAt", date)
                    }
                    value={edu.startAt}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <MonthYearInput
                    onChange={(date) => handleFieldChange(index, "endAt", date)}
                    value={edu.endAt}
                  />
                </div>
              </div>
            </div>
            <Button
              className="-right-2 -top-2 absolute h-6 w-6 pr-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                const newEdu = (education || []).filter((_, i) => i !== index);
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
              ...(education || []),
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
  );
}
