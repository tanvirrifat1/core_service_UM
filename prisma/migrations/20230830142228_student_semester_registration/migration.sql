/*
  Warnings:

  - You are about to drop the `OfferedCourseClassSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OfferedCourseClassSchedule" DROP CONSTRAINT "OfferedCourseClassSchedule_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "OfferedCourseClassSchedule" DROP CONSTRAINT "OfferedCourseClassSchedule_offeredCourseSectionId_fkey";

-- DropForeignKey
ALTER TABLE "OfferedCourseClassSchedule" DROP CONSTRAINT "OfferedCourseClassSchedule_roomId_fkey";

-- DropForeignKey
ALTER TABLE "OfferedCourseClassSchedule" DROP CONSTRAINT "OfferedCourseClassSchedule_semesterRegistrationId_fkey";

-- DropTable
DROP TABLE "OfferedCourseClassSchedule";

-- CreateTable
CREATE TABLE "offered_courses_schedule" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "dayOfWeek" "WeekDays" DEFAULT 'SATURDAY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offeredCourseSectionId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "offered_courses_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_semester_registration" (
    "id" TEXT NOT NULL,
    "isConfirmed" BOOLEAN DEFAULT false,
    "totalCreditsTaken" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "semesterRegistrationId" TEXT NOT NULL,

    CONSTRAINT "student_semester_registration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offered_courses_schedule" ADD CONSTRAINT "offered_courses_schedule_offeredCourseSectionId_fkey" FOREIGN KEY ("offeredCourseSectionId") REFERENCES "offered_courses_section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_courses_schedule" ADD CONSTRAINT "offered_courses_schedule_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_courses_schedule" ADD CONSTRAINT "offered_courses_schedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offered_courses_schedule" ADD CONSTRAINT "offered_courses_schedule_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration" ADD CONSTRAINT "student_semester_registration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_registration" ADD CONSTRAINT "student_semester_registration_semesterRegistrationId_fkey" FOREIGN KEY ("semesterRegistrationId") REFERENCES "semester_registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
