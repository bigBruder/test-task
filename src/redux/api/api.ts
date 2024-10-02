import { Job } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query: () => "jobs",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query<Job, string>({
      query: (id) => `jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Jobs", id }],
    }),
    updateJob: builder.mutation<Job, Partial<Job>>({
      query: ({ id, ...patch }) => ({
        url: `jobs/${id}`,
        method: "PUT",
        body: patch,
      }),
      onQueryStarted: async (
        { id, ...patch },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          jobsApi.util.updateQueryData("getJobById", id.toString(), (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Jobs", id }],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useLazyGetJobByIdQuery,
  useUpdateJobMutation,
} = jobsApi;
