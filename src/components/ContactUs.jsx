import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (name, value) => {
  switch (name) {
    case "name":
      return value.trim() ? "" : "Name is required";
    case "email":
      if (!value.trim()) return "Email is required";
      return EMAIL_REGEX.test(value.trim()) ? "" : "Enter a valid email address";
    case "message":
      return value.trim() ? "" : "Message is required";
    default:
      return "";
  }
};

const initialState = { name: "", email: "", subject: "", message: "" };

const ContactUs = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      message: validateField("message", values.message),
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => error === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm() || status === "submitting") return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("succeeded");
      setValues(initialState);
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  };

  return (
    <div id='contact' className='container mx-auto'>
      <div className='lg:flex lg:px-32 gap-x-10 '>
        <div className=' flex-grow'>
          <section className="w-full bg-gradient-to-l  from-[#110D2E]/30  to-[#fc466a4a]/10  rounded-md shadow-md  p-6 md:p-16">
            <div className='flex flex-col mb-10 justify-center items-center'>
              <h2 className="text-2xl font-semibold  capitalize text-white">Drop Us Your Message</h2>
              <p className='text-gray-400 '>Freely contact with us anytime. We're available here for you.</p>
            </div>

            {status === "succeeded" && (
              <div className="mb-6 rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-center text-sm font-medium text-green-300">
                ✓ Thanks for reaching out! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
                <div className='col-span-2 lg:col-span-1'>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    placeholder='Full Name'
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className=" w-full px-4 py-2 mt-2 text-blue-600  rounded-full bg-transparent formBorder-gradient  focus:outline-none focus:ring-0"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className='col-span-2 lg:col-span-1'>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder='Your Email'
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className=" w-full px-4 py-2 mt-2 text-blue-600  rounded-full bg-transparent formBorder-gradient  focus:outline-none focus:ring-0"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className='col-span-2'>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={handleChange}
                    placeholder='Select Subject'
                    className=" w-full px-4 py-2 mt-2 text-blue-600  rounded-full bg-transparent formBorder-gradient  focus:outline-none focus:ring-0"
                  />
                </div>

                <div className='col-span-2 '>
                  <textarea
                    id="contact-message"
                    name="message"
                    type="text"
                    value={values.message}
                    onChange={handleChange}
                    placeholder='Message...'
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className=" w-full px-6 py-2 mt-2 text-blue-600  rounded-full bg-transparent formBorder-gradient  focus:outline-none focus:ring-0"
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="mt-1 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-start mt-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-2 rounded-full bg-[#6318F1] text-white disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:bg-gradient-to-r hover:from-[#FC466B]/40 hover:to-[#3F5EFB]/40 hover:scale-105 duration-200"
                >
                  {status === "submitting" ? "Sending..." : "Send Messages"}
                </button>
              </div>
            </form>
          </section>
        </div>

        <div className='  lg:w-[22%] flex flex-col items-center justify-center mx-16 formBorder-gradient border'>
          <div className='flex flex-1 flex-col items-center justify-around '>
            <div className='flex flex-col justify-center items-center py-4'>
              <FaPhoneAlt size={44} className='text-blue-700 my-4'/>
              <div className='text-white text-lg py-1'>Phone</div>
              <div className='text-gray-400 text-lg'>0310 - 7756294</div>
            </div>
            <hr className='w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
          </div>

          <div className='flex flex-1 flex-col items-center justify-around '>
            <div className='flex flex-col justify-center items-center py-4'>
              <MdMarkEmailUnread size={44} className='text-blue-700 my-4'/>
              <div className='text-white text-lg py-1'>Email</div>
              <div className='text-gray-400 text-lg'>0310 - 7756294</div>
            </div>
            <hr className='w-32 align-bottom bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
          </div>

          <div className='flex flex-1 flex-col items-center justify-around '>
            <div className='flex flex-col justify-center items-center py-4'>
              <FaLocationDot size={44} className='text-blue-700 my-4'/>
              <div className='text-white text-lg py-1'>Location</div>
              <div className='text-gray-400 text-lg'>0310 - 7756294</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
