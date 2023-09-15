/*
  Warnings:

  - You are about to drop the `offered_course_sections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "offered_course_sections" DROP CONSTRAINT "offered_course_sections_offeredCourseId_fkey";

-- DropForeignKey
ALTER TABLE "offered_course_sections" DROP CONSTRAINT "offered_course_sections_semesterRegistrationId_fkey";

-- DropForeignKey
ALTER TABLE "offered_courses_schedule" DROP CONSTRAINT "offered_courses_schedule_offeredCourseSectionId_fkey";

-- DropForeignKey
ALTER TABLE "student_semester_registration_courses" DROP CONSTRAINT "student_semester_registration_courses_offeredCourseSection_fkey";

-- DropTable
DROP TABLE "offered_course_sections";

-- CreateTable
CREATE TABLE "offered_courses_section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "currentlyEnrolledStudent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "offered_courses_section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_courses_section" ADD CONSTRAINT "offered_courses_section_offeredCourseId_fkey" FOREIGN KEY ("offeredCourseId") REFERENCES "offeres_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_courses_section" ADD CONSTRAINT "offered_courses_section_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_courses_schedule" ADD CONSTRAINT "offered_courses_schedule_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_courses_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration_courses" ADD CONSTRAINT "student_semester_registration_courses_offeredCourseSection_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_courses_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
