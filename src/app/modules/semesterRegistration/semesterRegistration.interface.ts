export type ISemesterRegistrationFilterRequest = {
  searchTerm?: string | undefined;
  academicSemesterId?: string | undefined;
};

export type IEnrolledCoursed = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
