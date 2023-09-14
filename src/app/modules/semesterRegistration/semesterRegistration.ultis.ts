const getAvailableCourse = async (
  offeredCourses: any,
  studentCompletedCourses: any,
  studentCurrentSemesterTakenCourse: any
) => {
  const completedCourseId = studentCompletedCourses.map(
    (course: any) => course.courseId
  );

  const availableCoursesList = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCourseId.includes(offeredCourse.courseId)
    )

    .filter((course: any) => {
      const preRequisites = course.course.PreRequisite;
      if (preRequisites.length === 0) {
        return true;
      } else {
        const preRequisiteIds = preRequisites.map(
          (PreRequisite: any) => PreRequisite.PreRequisiteId
        );
        return preRequisiteIds.every((id: string) =>
          completedCourseId.includes(id)
        );
      }
    })

    .map((course: any) => {
      const isAlreadyTakenCourse = studentCurrentSemesterTakenCourse.find(
        (c: any) => c.offeredCourseId === course.id
      );

      if (isAlreadyTakenCourse) {
        course.offeredCourseSections.map((section: any) => {
          if (section.id === isAlreadyTakenCourse.offeredCourseSectionId) {
            section.isTaken = true;
          } else {
            section.isTaken = false;
          }
        });
        return {
          ...course,
          isTaken: true,
        };
      } else {
        course.offeredCourseSections.map((section: any) => {
          section.isTaken = false;
        });
        return {
          ...course,
          isTaken: false,
        };
      }
    });

  return availableCoursesList;
};

export const SemesterRegistrationUtils = {
  getAvailableCourse,
};
