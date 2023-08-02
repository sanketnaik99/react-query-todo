import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Field, Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("A title is required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("A description is required required"),
});

interface FormValues {
  title: string;
  description: string;
}

const TodoForm = () => {
  // useMutation(mutationFn, { config })

  /*
  Post an op -> Response -> id -> fetch op-details
  mutation -> onSuccess -> useQuery -> fetch op-details (retry till you get it)

  */
  const queryClient = useQueryClient();

  const addTodo = useMutation(
    (values: FormValues) =>
      axios
        .post("https://api.tablebackend.com/v1/rows/kZCWhv3BlpXi", [
          {
            title: values.title,
            description: values.description,
            isDone: false,
          },
        ])
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        console.log("Success");
        console.log(data);
        // queryClient.invalidateQueries(["ops"]); // Invalidate cache data -> refetch when the component is mounted
        // queryClient.refetchQueries(["ops"]); // Refetch data -> refetch instantly -> Don't use this much
        // const oldData = queryClient.getQueryData(["ops"]);
        // console.log(oldData);
        // queryClient.setQueryData(["ops"], (oldData: any) => {
        //   return {
        //     ...oldData,
        //     data: [...oldData.data, data[0]],
        //   };
        // });
        // navigate them to op-details
      },
      // You call a mutation -> if that fails -> revert the optimistic update
      onMutate(variables) {
        const oldData = queryClient.getQueryData(["ops"]);

        queryClient.setQueryData(["ops"], (oldData: any) => {
          return {
            ...oldData,
            data: [...oldData.data, { ...variables, _id: "temp-id" }],
          };
        });
        // A mutation is about to happen!
        // Optionally return a context containing data to use when for example rolling back
        // the optimistic update
        return { oldData };
      },
      onSettled(data, error, variables, context) {
        // The mutation is done!
        // You probably want to hide a loading indicator now
      },
      onError(error, variables, context) {
        // An error happened!
        // You can also use the context here to roll back an optimistic update
        queryClient.setQueryData(["ops"], (oldData: any) => {
          return context?.oldData;
        });
      },
    }
  );

  return (
    <div className="container flex flex-col gap-2">
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={TodoSchema}
        onSubmit={(values, { resetForm }) => {
          addTodo.mutate(
            {
              title: values.title,
              description: values.description,
            },
            {
              onSuccess: () => {
                resetForm();
              },
            }
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="title" className="text-sm text-gray-700 font-bold">
              Title
            </label>
            <Field
              name="title"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
            />
            <p className="flex w-full items-center p-3 text-sm text-red-500">
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
            </p>
            <label
              htmlFor="description"
              className="text-sm text-gray-700 font-bold"
            >
              Description
            </label>
            <Field
              name="description"
              className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
            />
            <p className="flex w-full items-center p-3 text-sm text-red-500">
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </p>
            <div className="flex flex-row justify-center">
              <button
                className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                type="submit"
              >
                Add Todo
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
