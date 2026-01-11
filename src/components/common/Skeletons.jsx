import React from 'react';

export const PostSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-slate-700"></div>
    <div className="p-6 flex-grow space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="flex gap-4">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
      </div>
      <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24 mt-4"></div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-48"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-full w-20"></div>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
        <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
      </div>
    </td>
  </tr>
);

export const DashboardCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24 mb-4"></div>
    <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-16 mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
  </div>
);
