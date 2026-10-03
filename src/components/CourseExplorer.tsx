"use client";

import { useState } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm from "@/components/CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    setCourses((prev) =>
      prev.filter((course) => course.id !== id)
    );
  }

  function handleSave(draft: CourseDraft) {
    if (editingId) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingId
            ? {
                ...course,
                code: draft.code.trim(),
                name: draft.name.trim(),
                credit: Number(draft.credit),
                instructor: draft.instructor.trim(),
              }
            : course
        )
      );

      setEditingId(null);
      return;
    }

    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses((prev) => [...prev, newCourse]);
  }

  const editingCourse = courses.find(
    (course) => course.id === editingId
  );

  return (
    <div>
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <hr />

      <h2>รายการรายวิชา</h2>

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onEdit={() => setEditingId(course.id)}
          onDelete={() => handleDelete(course.id)}
        />
      ))}
    </div>
  );
}