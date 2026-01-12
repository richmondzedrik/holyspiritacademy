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

export const PageHeaderSkeleton = () => (
  <div className="bg-blue-600 dark:bg-blue-700 text-white py-16 mb-12">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center animate-pulse">
        <div className="h-12 bg-white/20 rounded w-48 mx-auto mb-4"></div>
        <div className="h-6 bg-white/20 rounded w-64 mx-auto mb-2"></div>
        <div className="h-6 bg-white/20 rounded w-80 mx-auto"></div>
      </div>
    </div>
  </div>
);

export const FacilityCardSkeleton = () => (
  <div className="group relative overflow-hidden rounded-3xl h-96 shadow-xl border border-gray-200 dark:border-slate-700 animate-pulse">
    <div className="w-full h-full bg-gray-200 dark:bg-slate-700"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 flex items-end p-8">
      <div className="w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="h-7 bg-white/20 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

export const AdministratorCardSkeleton = () => (
  <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 animate-pulse">
    <div className="relative mb-6">
      <div className="w-44 h-44 mx-auto rounded-full bg-gray-200 dark:bg-slate-700 border-4 border-blue-100 dark:border-blue-900/50"></div>
    </div>
    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mx-auto mb-3"></div>
    <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
  </div>
);

export const SinglePostSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-40"></div>
    <div className="h-96 bg-gray-200 dark:bg-slate-700 rounded-2xl"></div>
    <div className="flex gap-4 mb-6">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
    </div>
    <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-8"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/5"></div>
    </div>
  </div>
);

export const ContactFormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-6"></div>
    <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded"></div>
    <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded"></div>
    <div className="h-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
    <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
  </div>
);

export const AdmissionsContentSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-6 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
          <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-slate-700"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4 animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white"></div>
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-white/20 rounded w-48"></div>
              <div className="h-4 bg-white/20 rounded w-64"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-white/20 rounded-full w-24"></div>
                <div className="h-6 bg-white/20 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl">
                <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-24 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-slate-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);