"use client";

import { useParams } from "next/navigation";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../../redux/api/api";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

const EditJob: React.FC = () => {
  const { id } = useParams();
  const parsedId = (Array.isArray(id) ? id[0] : id) ?? "-1";

  const [isEditing, setEditing] = useState(false);
  const { data: job, isLoading } = useGetJobByIdQuery(parsedId);
  const [mutateJob] = useUpdateJobMutation();

  const handleSubmit = (values: { title: string; description: string }) => {
    mutateJob({ id: parseInt(parsedId), ...values });
    setEditing(false);
  };

  const Content = () => {
    return isEditing ? (
      <>
        <Formik
          initialValues={{
            title: job?.title || "",
            description: job?.description || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-between h-full w-full">
              <div>
                <h2 className="text-2xl pb-4">Editing Job</h2>
                <div className="flex gap-4 mb-4">
                  <label className="inline-block w-24">Title:</label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full bg-red-500"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="inline-block w-24">Description:</label>
                  <Field
                    name="description"
                    type="text"
                    className="w-full bg-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    ) : (
      <>
        <div>
          <h2 className="text-2xl pb-4">Job</h2>
          <p>Title: {job?.title}</p>
          <p>Description: {job?.description}</p>
        </div>

        <button
          onClick={() => setEditing(true)}
          className="bg-green-500 text-white px-4 py-2"
        >
          Edit
        </button>
      </>
    );
  };

  return (
    <div className="bg-red-500 grid justify-center items-center min-h-dvh text-black">
      <div
        className={`bg-white flex w-96 h-96 flex-col p-4 items-center ${
          isLoading ? "justify-center" : "justify-between"
        }`}
      >
        {isLoading ? "Loading..." : <Content />}
      </div>
    </div>
  );
};

export default EditJob;
