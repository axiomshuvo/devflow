"use client";

import { currentUser } from "@/lib/mock-data";
import { useState } from "react";
import { MdCameraAlt, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";

export function ProfileTab() {
  const [name, setName] = useState(currentUser.name);
  const [jobTitle, setJobTitle] = useState("Senior Developer");
  const [bio, setBio] = useState(
    "Building great products one commit at a time.",
  );
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function saveProfile() {
    toast.success("Profile updated (mock).");
  }

  function changePassword() {
    if (!currentPw || !newPw || !confirmPw) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPw !== confirmPw) {
      toast.error("New passwords do not match.");
      return;
    }
    toast.success("Password changed (mock).");
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  }

  return (
    <div className="flex gap-5 p-6 items-start">
      <div className="flex flex-col gap-5 flex-1 min-w-0">
        {/* Profile info */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Profile Information
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Update your personal details.
            </p>
          </div>
          <div className="px-6 py-5 flex flex-col gap-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                  {initials}
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Photo upload coming in Phase 4.")}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <MdCameraAlt className="text-gray-500 text-xs" />
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                value={currentUser.email}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed here.
              </p>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={saveProfile}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Use a strong password to keep your account secure.
            </p>
          </div>
          <div className="px-6 py-5 flex flex-col gap-4">
            {[
              {
                label: "Current Password",
                value: currentPw,
                setter: setCurrentPw,
                show: showCurrent,
                toggleShow: () => setShowCurrent((v) => !v),
              },
              {
                label: "New Password",
                value: newPw,
                setter: setNewPw,
                show: showNew,
                toggleShow: () => setShowNew((v) => !v),
              },
              {
                label: "Confirm New Password",
                value: confirmPw,
                setter: setConfirmPw,
                show: showConfirm,
                toggleShow: () => setShowConfirm((v) => !v),
              },
            ].map(({ label, value, setter, show, toggleShow }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {show ? (
                      <MdVisibilityOff className="text-base" />
                    ) : (
                      <MdVisibility className="text-base" />
                    )}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={changePassword}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
