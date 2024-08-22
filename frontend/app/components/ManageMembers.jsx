"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import MembersList from "./MembersList";

const AddMembers = () => {
  const [members, setMembers] = useState([]);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const addMember = async (e) => {
    e.preventDefault();
    const newMember = {
      firstname: fname,
      lastname: lname,
      email,
      phone,
      status,
    };
    try {
      const localUrlApi = "http://localhost:5229/api/members";
      const prodUrlApi = "https://ccfi-dotnet-nextjs.vercel.app/api/members";
      const response = await fetch(localUrlApi || prodUrlApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      const data = await response.json();
      setMembers([...members, data]);
      setFName("");
      setLName("");
      setEmail("");
      setPhone("");
      setStatus("");
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMember = async () => {
    const updatedMember = {
      firstname: fname,
      lastname: lname,
      email,
      phone,
      status,
    };

    try {
      const prodUrlApi = "https://ccfi-dotnet-nextjs.vercel.app/api/members";
      const response = await fetch(
        `http://localhost:5229/api/members/${selectedMember.id}` || prodUrlApi,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMember),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      setMembers(
        members.map((member) =>
          member.id === selectedMember.id ? updatedMember : member
        )
      );
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstname") {
      setFName(value);
    }
    if (name === "lastname") {
      setLName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "phone") {
      setPhone(value);
    }
    if (name === "status") {
      setStatus(value);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openEditModal = (member) => {
    setSelectedMember(member);
    setFName(member.firstName);
    setLName(member.lastName);
    setEmail(member.email);
    setPhone(member.phone);
    setStatus(member.status);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedMember(null);
    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setStatus("");
  };

  return (
    <div className="mt-4">
      <div className="flex lg:w-[95%] justify-end">
        <button
          onClick={openModal}
          className="text-white bg-neutral-800 rounded-md px-4 py-2 mx-4"
        >
          New Member
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Member"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl mb-4">Add New Member</h2>
        <form onSubmit={addMember} className="space-y-4">
          <input
            type="text"
            name="firstname"
            value={fname}
            placeholder="First Name"
            onChange={handleChange}
            required
            className="py-2 px-1 border rounded-md w-full"
          />
          <input
            type="text"
            name="lastname"
            value={lname}
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="py-2 px-1 border rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            required
            className="py-2 px-1 border rounded-md w-full"
          />
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="Phone"
            onChange={handleChange}
            className="py-2 px-1 border rounded-md w-full"
          />
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={status === "Active"}
                onChange={handleChange}
                className="mr-1"
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={handleChange}
                className="mr-1"
              />
              Inactive
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-neutral-800 rounded-md px-4 py-2 mt-4"
          >
            Add Member
          </button>
        </form>
        <button
          onClick={closeModal}
          className="text-white bg-red-500 rounded-md px-4 py-2 mt-4"
        >
          Close
        </button>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Member"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl mb-4">Edit Member</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="firstname"
            value={fname}
            placeholder="First Name"
            onChange={handleChange}
            required
            className="py-2 px-1 border rounded-md w-full"
          />
          <input
            type="text"
            name="lastname"
            value={lname}
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="py-2 px-1 border rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            required
            className="py-2 px-1 border rounded-md w-full"
          />
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="Phone"
            onChange={handleChange}
            className="py-2 px-1 border rounded-md w-full"
          />
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={status === "Active"}
                onChange={handleChange}
                className="mr-1"
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={handleChange}
                className="mr-1"
              />
              Inactive
            </label>
          </div>
          <button
            onClick={() => updateMember(selectedMember.id)}
            className="text-white bg-neutral-800 rounded-md px-4 py-2 mt-4"
          >
            Update Member
          </button>
        </div>
        <button
          onClick={closeEditModal}
          className="text-white bg-red-500 rounded-md px-4 py-2 mt-4"
        >
          Close
        </button>
      </Modal>

      <MembersList
        onUpdate={openEditModal}
        members={members}
        setMembers={setMembers}
      />
    </div>
  );
};

export default AddMembers;
