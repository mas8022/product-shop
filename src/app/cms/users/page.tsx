"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { User } from "../../../../types";
import CmsUserCart from "@/components/modules/CmsUserCart";
import AvailabilityAlert from "@/components/modules/AvailabilityAlert";

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const getAllUsers = (): void => {
    fetch("/api/cms/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      getAllUsers();
      return;
    }
    const filteredUsers = users.filter((item) =>
      item.email.includes(search.trim())
    );
    setUsers(filteredUsers);
  }, [search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="w-full pb-12 border-b-[1px] border-b-second/50 flex justify-end">
        <div className="navbar flex h-14 items-center justify-end gap-4 border-[2px] border-gray-800/20 pl-4 py-1 rounded-md">
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="دنبال چه کاربر ای هستین؟..."
            className="pr-4 h-full w-[20rem] sm:w-[30rem] bg-black/0 text-[1.3rem] pl-2 focus:outline-none outline-none font-light"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 active:scale-95 cursor-pointer stroke-black/40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="w-full flex flex-col items-end gap-40 py-[5rem] md:pr-14">
        <div className="w-full flex justify-center">
          {users?.length ? (
            <div className="grid grid-cols-1 lgg:grid-cols-2 2xl:grid-cols-3 gap-8">
              {users.map((item) => (
                <CmsUserCart
                  data={JSON.parse(JSON.stringify(item))}
                  key={item._id.toString()}
                />
              ))}
            </div>
          ) : (
            <AvailabilityAlert text="کاربری وجود ندارد" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
