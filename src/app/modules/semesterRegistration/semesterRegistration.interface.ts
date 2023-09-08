export type ISemesterRegistrationFilterRequest = {
  searchTerm?: string | undefined;
  academicSemesterId?: string | undefined;
};

export type IEnrolledCoursed = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};

export type IEnrollCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
