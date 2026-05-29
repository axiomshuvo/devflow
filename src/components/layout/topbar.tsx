"use client";

import { currentUser } from "@/lib/mock-data";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MdAdd,
  MdHelpOutline,
  MdKeyboardArrowDown,
  MdNotifications,
  MdSearch,
} from "react-icons/md";
import { toast } from "react-toastify";

export function Topbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shrink-0">
      <div className="min-w-0 flex-1 flex items-center gap-6">
        {/* Search */}
        <div className="w-full max-w-95 relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <input
            type="text"
            placeholder="Search issues, projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 border border-transparent focus:border-blue-300 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notifications */}
        <Link
          href="/notifications"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <MdNotifications className="text-xl" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-semibold">
            6
          </span>
        </Link>

        {/* Help */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <MdHelpOutline className="text-xl" />
        </button>

        {/* User menu */}
        <Dropdown>
          <Dropdown.Trigger className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2.5">
              <Avatar size="sm" className="w-8 h-8 shrink-0">
                <Avatar.Image
                  src={currentUser.imageUrl}
                  alt={currentUser.name}
                />
                <Avatar.Fallback>{currentUser.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 leading-tight capitalize">
                  {currentUser.role.charAt(0) +
                    currentUser.role.slice(1).toLowerCase()}
                </p>
              </div>
              <MdKeyboardArrowDown className="text-gray-400 text-lg" />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item
                onPress={() => router.push("/settings?tab=Profile")}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item onPress={() => router.push("/settings")}>
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                className="text-red-600"
                onPress={() => toast.info("Signed out (mock).")}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Create Issue */}
        <Link href="/issues/create">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
          >
            <MdAdd className="text-base" />
            Create Issue
            <MdKeyboardArrowDown className="text-base" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
