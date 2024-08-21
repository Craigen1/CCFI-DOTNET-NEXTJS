"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Modal from "react-modal";

const MembersList = ({ members, setMembers, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const deleteMember = async () => {
    try {
      const response = await fetch(
        `http://localhost:5229/api/members/${selectedMember.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMembers(members.filter((member) => member.id !== selectedMember.id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5229/api/members");
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMembers();
  }, [setMembers]);

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "text-green-500 font-bold"
      : "text-red-500 font-bold";
  };

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Link href="/">
        <h2 className="text-2xl font-medium m-2">Members</h2>
      </Link>
      <Table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[150px] px-4 py-2 text-left">
              Name
            </TableHead>
            <TableHead className="w-[200px] px-4 py-2 text-left">
              Email
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-left">
              Phone
            </TableHead>
            <TableHead className="w-[100px] px-4 py-2 text-left">
              Status
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-left">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-4">
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell className="px-4 py-4">{member.email}</TableCell>
                <TableCell className="px-4 py-4">{member.phone}</TableCell>
                <TableCell
                  className={`px-4 py-4 ${getStatusStyle(member.status)}`}
                >
                  {member.status}
                </TableCell>
                <TableCell className="px-4 py-4">
                  <button
                    onClick={() => onUpdate(member)}
                    className="rounded-md px-4 py-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 transition"
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    onClick={() => handleDeleteClick(member)}
                    className="rounded-md px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center px-4 py-4">
                No members found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Delete Member"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="space-y-4">
          <h2 className="text-xl mb-8">
            Are you sure you want to delete{" "}
            <span className="font-bold">
              {selectedMember?.firstName} {selectedMember?.lastName}
            </span>
            ?
          </h2>
          <button
            onClick={() => deleteMember()}
            className="border-2 rounded-md px-4 py-2 mt-4 mx-1 text-white bg-red-500"
          >
            Delete Member
          </button>
          &nbsp;
          <button
            onClick={handleCloseModal}
            className="border-2 rounded-md px-4 py-2 mt-4 mx-1"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MembersList;
