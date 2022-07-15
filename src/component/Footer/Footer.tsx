import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <Link
              className="uppercase text-blue-500 text-3xl cursor-pointer"
              to="/"
            >
              blog
            </Link>
          </span>
        </div>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="#" className="hover:underline">
          BLOG™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
