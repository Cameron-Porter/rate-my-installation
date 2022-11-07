import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const styles = {
  textColor: "text-green-800",
  lineStyle: "max-w-lg mx-auto border my-5 border-green-800",
  form: {
    label: "block mb-5",
    span: "text-gray-700",
    input:
      "ring-green-800 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
    textarea:
      "ring-green-800 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
    submit:
      "shadow text-white bg-green-800 hover:bg-green-600 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
  },
};

interface ContactInput {
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>();
  const onSubmit: SubmitHandler<ContactInput> = async (data) => {
    fetch("/api/createMessage", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <div className="m-3">
      {session ? (
        submitted ? (
          <div className="flex flex-col p-10 my-10 bg-green-800 text-white max-w-2xl mx-auto rounded-lg">
            <h3 className="text-3xl font-bold">Thank you for reaching out!</h3>
            <p>
              We will get back with you as soon as possible. Till then, have a
              wonderful day!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-sm">
              <span className={styles.textColor}>
                Questions, Comments, Concerns?
              </span>
            </h3>
            <h4 className="text-3xl font-bold">
              Please fill out the below with your thoughts
            </h4>
            <hr className="py-3 mt-2" />
            <input
              {...register("email")}
              type="hidden"
              name="email"
              value={session.user!.email!}
            />
            <label className={styles.form.label}>
              <span className={styles.form.span}>Subject</span>
              <input
                {...register("subject", { required: true })}
                className={styles.form.input}
                placeholder="Your Subject Topic Here"
              />
            </label>
            <div className="flex flex-col p-5">
              {errors.subject && (
                <span className="text-red-500">
                  - The subject field is required
                </span>
              )}
            </div>
            <label className={styles.form.label}>
              <span className={styles.form.span}>Message</span>
              <textarea
                {...register("message", { required: true })}
                className={styles.form.textarea}
                placeholder="Your Message Content Here"
                rows={8}
              />
            </label>
            <div className="flex flex-col p-5">
              {errors.message && (
                <span className="text-red-500">
                  - The message field is required
                </span>
              )}
            </div>
            <input type="submit" className={styles.form.submit} />
          </form>
        )
      ) : (
        <div className="flex flex-col p-10 my-10 bg-green-800 text-white max-w-2xl mx-auto rounded-lg">
          <h3 className="text-3xl text-center font-bold">
            Please sign in to verify you are a real person prior to reaching
            out.
          </h3>
          <p></p>
        </div>
      )}
    </div>
  );
}

export default Contact;
