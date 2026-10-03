"use client";

import { useState, type FormEvent } from "react";
import type { Course } from "@/types/course";

type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

function toDraft(course?: Course): CourseDraft {
  if (!course) return emptyDraft;

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (!value.code.trim()) {
    nextErrors.code = "กรุณากรอกรหัสวิชา";
  }

  if (!value.name.trim()) {
    nextErrors.name = "กรุณากรอกชื่อรายวิชา";
  }

  const credit = Number(value.credit);

  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็ม 1–6";
  }

  return nextErrors;
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(
    toDraft(initialCourse)
  );

  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);

    if (!initialCourse) {
      setDraft(emptyDraft);
    }

    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>{initialCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชา"}</h2>

      <div>
        <label htmlFor="code">รหัสวิชา</label>
        <input
          id="code"
          name="code"
          value={draft.code}
          onChange={handleChange}
          aria-invalid={!!errors.code}
          aria-describedby={errors.code ? "code-error" : undefined}
        />
        {errors.code && <p id="code-error">{errors.code}</p>}
      </div>

      <div>
        <label htmlFor="name">ชื่อรายวิชา</label>
        <input
          id="name"
          name="name"
          value={draft.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="credit">หน่วยกิต</label>
        <input
          id="credit"
          name="credit"
          type="number"
          inputMode="numeric"
          min="1"
          max="6"
          value={draft.credit}
          onChange={handleChange}
          aria-invalid={!!errors.credit}
          aria-describedby={
            errors.credit ? "credit-error" : undefined
          }
        />
        {errors.credit && (
          <p id="credit-error">{errors.credit}</p>
        )}
      </div>

      <div>
        <label htmlFor="instructor">ผู้สอน</label>
        <input
          id="instructor"
          name="instructor"
          value={draft.instructor}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {initialCourse ? "บันทึกการแก้ไข" : "เพิ่มรายวิชา"}
      </button>

      {initialCourse && (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      )}
    </form>
  );
}