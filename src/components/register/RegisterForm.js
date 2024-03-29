import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorDetail from "../ErrorDetail";

const RegisterForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/auth/signin");
    } else {
      const errorData = await response.json();
      setError(errorData.message);
    }
  };
  return (
    <form className="space-y-6" onSubmit={registerUser}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 ">
          Name
        </label>
        <div className="mt-2">
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            id="name"
            name="name"
            type="text"
            // autoComplete="name"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 ">
          Email address
        </label>
        <div className="mt-2">
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 "
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {error && <ErrorDetail message={error} />}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
