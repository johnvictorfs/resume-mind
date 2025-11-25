"use client";

import type { ResumeData } from "@local/schemas";
import { Info, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { EducationSection } from "./education";
import { ExperiencesSection } from "./experiences";
import { Section } from "./section";
import { SkillsSection } from "./skills";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

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

      <ExperiencesSection
        experience={data.experience}
        handleChange={handleChange}
      />

      <EducationSection
        education={data.education}
        handleChange={handleChange}
      />

      <SkillsSection handleChange={handleChange} skills={data.skills} />
    </div>
  );
}
