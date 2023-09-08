/*
  Warnings:

  - You are about to drop the `offered_courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "offered_courses" DROP CONSTRAINT "offered_courses_academicDepartmentId_fkey";

-- DropForeignKey
ALTER TABLE "offered_courses" DROP CONSTRAINT "offered_courses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "offered_courses" DROP CONSTRAINT "offered_courses_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "offered_courses_section" DROP CONSTRAINT "offered_courses_section_offeredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_offeredCourseId_fkey";

-- DropTable
DROP TABLE "offered_courses";

-- CreateTable
CREATE TABLE "offeres_courses" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicDepartmentId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offeres_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offeres_courses" ADD CONSTRAINT "offeres_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offeres_courses" ADD CONSTRAINT "offeres_courses_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offeres_courses" ADD CONSTRAINT "offeres_courses_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_courses_section" ADD CONSTRAINT "offered_courses_section_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offeres_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offeres_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
