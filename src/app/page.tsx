"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { useGetJobsQuery } from "../redux/api/api";

export default function Home() {
  const { data } = useGetJobsQuery();

  return (
    <div className="grid min-h-screen bg-blue-500">
      <main className="bg-red-500">
        <table className="bg-green-500 w-full">
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((job) => (
                <TableRow key={job.id}>
                  <TableData>{job.title}</TableData>
                  <TableData>{job.description}</TableData>
                  <TableData>{job.id}</TableData>
                  <TableData>
                    <Link
                      className="px-2 py-1 bg-purple-500 rounded-xl"
                      href={`edit/${job.id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </TableData>
                </TableRow>
              ))}
          </TableBody>
        </table>
      </main>
    </div>
  );
}

const TableData: React.FC<PropsWithChildren> = ({ children }) => {
  return <td className="p-1">{children}</td>;
};

const TableRow: React.FC<PropsWithChildren> = ({ children }) => {
  return <tr className="p-1">{children}</tr>;
};

const TableBody: React.FC<PropsWithChildren> = ({ children }) => {
  return <tbody className="p-1">{children}</tbody>;
};

const TableHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <th className="p-1">{children}</th>;
};

const TableHead: React.FC<PropsWithChildren> = ({ children }) => {
  return <thead className="p-1">{children}</thead>;
};
