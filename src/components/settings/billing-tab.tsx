"use client";

import { mockInvoices } from "@/lib/mock-data";
import type { Invoice } from "@/types";
import { useState } from "react";
import {
  MdCreditCard,
  MdDownload,
  MdRocketLaunch,
  MdSync,
} from "react-icons/md";
import { toast } from "react-toastify";

export function BillingTab() {
  const [invoices] = useState<Invoice[]>(mockInvoices);

  return (
    <div className="p-6 flex flex-col gap-5">
      {/* Current Plan */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Current Plan</h2>
          <p className="text-sm text-gray-500 mt-0.5">Your active subscription details.</p>
        </div>
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <MdRocketLaunch className="text-violet-600 text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900">Pro Plan</p>
                <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">$29/month · Renews Jun 1, 2026</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Plan upgrade coming in Phase 4.")}
            className="px-5 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors shrink-0"
          >
            Upgrade Plan
          </button>
        </div>
        <div className="px-6 pb-5 grid grid-cols-3 gap-3">
          {[
            { label: "Members", value: "Up to 50" },
            { label: "Projects", value: "Unlimited" },
            { label: "Storage", value: "10 GB" },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-sm font-semibold text-gray-800">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Payment Method</h2>
          <p className="text-sm text-gray-500 mt-0.5">Your current billing payment method.</p>
        </div>
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <MdCreditCard className="text-gray-600 text-xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">•••• •••• •••• 4242</p>
              <p className="text-xs text-gray-500 mt-0.5">Visa · Expires 12/27</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Payment method update coming in Phase 4.")}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MdSync className="text-base" /> Update
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Invoice History</h2>
          <p className="text-sm text-gray-500 mt-0.5">Download past invoices for your records.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center gap-4 px-6 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{inv.date}</p>
                <p className="text-xs text-gray-500 mt-0.5">{inv.plan} Plan</p>
              </div>
              <span className="text-sm font-semibold text-gray-800 w-16 text-right">{inv.amount}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold w-14 text-center ${
                  inv.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
              </span>
              <button
                type="button"
                onClick={() => toast.success(`Invoice ${inv.id} downloaded (mock).`)}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-xs text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
              >
                <MdDownload className="text-sm" /> PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
