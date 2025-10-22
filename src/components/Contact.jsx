/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
/* eslint-enable no-unused-vars */

function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="py-10 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* ===== Left Info Section ===== */}
        <div className="flex flex-col justify-center space-y-5 text-center md:text-left md:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Fill in the form to start a conversation with us.
          </p>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <p className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 break-words">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-violet-600"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-center sm:text-left">
                123 Business Street, Lagos, Nigeria
              </span>
            </p>

            <p className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-violet-600"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>+234 123 456 7890</span>
            </p>

            <p className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 break-words">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-violet-600"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>contact@business.com</span>
            </p>
          </div>
        </div>

        {/* ===== Right Form Section ===== */}
        <form className="flex flex-col justify-center py-4 space-y-5 md:px-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 px-3 py-2 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="jane@doe.com"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 px-3 py-2 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-violet-500 focus:outline-none dark:bg-gray-800 dark:text-gray-100 px-3 py-2 resize-none text-sm sm:text-base"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="self-center md:self-start px-8 py-3 text-sm sm:text-base font-semibold text-white bg-violet-600 rounded-lg shadow-md hover:bg-violet-700 focus:ring-4 focus:ring-violet-300 transition duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
}

export default Contact;
