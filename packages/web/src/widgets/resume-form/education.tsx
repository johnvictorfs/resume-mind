"use client";

import type { Education } from "@local/schemas";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { formatDate } from "~/logic/date";
import { Section } from "./section";

export function EducationSection({
  education,
  handleChange,
}: {
  education: Education[] | null;
  handleChange: (field: "education", value: Education[]) => void;
}) {
  return (
    <Section title="Education">
      <div className="space-y-6">
        {(education || []).map((edu, index) => (
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
                      const newEdu = [...(education || [])];
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
                      const newEdu = [...(education || [])];
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
                      const newEdu = [...(education || [])];
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
                      const newEdu = [...(education || [])];
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
