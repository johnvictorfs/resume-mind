"use client";

import { Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Section } from "./section";

export function SkillsSection({
  skills,
  handleChange,
}: {
  skills: string[];
  handleChange: (field: "skills", value: string[]) => void;
}) {
  return (
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
                  handleChange("skills", [...skills, ...newSkills]);
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
          {skills.map((skill, index) => (
            <span
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary text-sm"
              key={skill}
            >
              {skill}
              <button
                className="ml-2 hover:text-white"
                onClick={() => {
                  const newSkills = skills.filter((_, i) => i !== index);
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
  );
}
