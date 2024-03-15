"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

interface Item {
  id: number;
  projectName: string;
  stack: string;
  appType: string;
  language: string;
  description: string;
}

export default function CRUDFunction(): JSX.Element {
  const [items, setItems] = useState<Item[]>(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("items");
      return storedItems ? JSON.parse(storedItems) : [];
    } else {
      return [];
    }
  });

  const [completedItems, setCompletedItems] = useState<Item[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [appType, setAppType] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalProjectName, setModalProjectName] = useState<string>("");
  const [modalStack, setModalStack] = useState<string>("");
  const [modalAppType, setModalAppType] = useState<string>("");
  const [modalLanguage, setModalLanguage] = useState<string>("");
  const [modalDescription, setModalDescription] = useState<string>("");

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    const storedCompletedItems = localStorage.getItem("completedItems");
    if (storedCompletedItems) {
      setCompletedItems(JSON.parse(storedCompletedItems));
    }
  }, []);

  const handleAdd = (): void => {
    if (
      projectName.trim() === "" ||
      stack.trim() === "" ||
      appType.trim() === "" ||
      language.trim() === "" ||
      description.trim() === ""
    ) {
      return alert("Fill all fields to keep a Record");
    }

    const newItem: Item = {
      id: Date.now(),
      projectName,
      stack,
      appType,
      language,
      description,
    };
    setItems([...items, newItem]);
    closeModal();
  };

  const handleDelete = (id: number): void => {
    setItemToDeleteId(id);
    setIsConfirmationOpen(true);
  };

  const confirmDelete = (): void => {
    if (itemToDeleteId !== null) {
      const updatedItems: Item[] = items.filter(
        (item) => item.id !== itemToDeleteId
      );
      setItems(updatedItems);
      setIsConfirmationOpen(false);
      setItemToDeleteId(null);
    }
  };

  const cancelDelete = (): void => {
    setIsConfirmationOpen(false);
    setItemToDeleteId(null);
  };

  const handleEdit = (id: number): void => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedProject(selectedItem);
      setModalProjectName(selectedItem.projectName);
      setModalStack(selectedItem.stack);
      setModalAppType(selectedItem.appType);
      setModalLanguage(selectedItem.language);
      setModalDescription(selectedItem.description);
      setIsModalOpen(true);
    }
  };

  const handleMarkCompleted = (id: number): void => {
    const projectToComplete = items.find((item) => item.id === id);
    if (projectToComplete) {
      setCompletedItems([...completedItems, projectToComplete]);
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      localStorage.setItem(
        "completedItems",
        JSON.stringify([...completedItems, projectToComplete])
      );
      localStorage.setItem("items", JSON.stringify(updatedItems));
    }
  };

  const handleSaveChanges = (): void => {
    if (!selectedProject) {
      return alert("Fill all fields to keep a Record");
    }

    if (
      modalProjectName.trim() === "" ||
      modalStack.trim() === "" ||
      modalAppType.trim() === "" ||
      modalLanguage.trim() === "" ||
      modalDescription.trim() === ""
    ) {
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === selectedProject.id
        ? {
            ...item,
            projectName: modalProjectName,
            stack: modalStack,
            appType: modalAppType,
            language: modalLanguage,
            description: modalDescription,
          }
        : item
    );

    closeModal();
    setModalProjectName("");
    setModalStack("");
    setModalAppType("");
    setModalLanguage("");
    setModalDescription("");
    setItems(updatedItems);
  };
  const handleProjectClick = (id: number): void => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedProject(selectedItem);
    }
  };

  const closeModal = (): void => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <div className="py-10 text-white">
      <div className="h-full rounded shadow-2xl shadow-black p-6">
        <h1>Enter The Credentials.</h1>
        <div className="mt-5">
          <div className="w-full py-4 bg-[#222222] shadow-2xl shadow-black rounded">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              className="pt-2 px-4 text-[17px] focus:outline-none bg-transparent w-full tracking-[3px]  text-sm    disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 "
              placeholder="Project Name"
            />
          </div>
        </div>
        <div className="flex justify-between md:flex-row flex-col mt-6 gap-4 md:gap-0">
          <div className="inline-block relative w-full md:w-[32%]">
            <select
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              className="block appearance-none w-full bg-[#222222] px-4 py-5 pr-8 rounded shadow-2xl shadow-black focus:outline-none "
            >
              <option value="Stack">Stack</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Front End">Front End</option>
              <option value="Back End">Back End</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="inline-block relative w-full md:w-[32%]">
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="block appearance-none w-full bg-[#222222] px-4 py-5 pr-8 rounded shadow-2xl shadow-black focus:outline-none "
            >
              <option value="Type">Type</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="IOS App">IOS App</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="inline-block relative w-full md:w-[32%] ">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block appearance-none w-full bg-[#222222] px-4 py-5 pr-8 rounded shadow-2xl shadow-black focus:outline-none "
            >
              <option value="Language">Language</option>
              <option value="PHP/Laravel">PHP/Laravel</option>
              <option value="Go/Gin">Go/Gin</option>
              <option value="Python/Django">Python/Django</option>
              <option value="Ruby/Rails">Ruby/Rails</option>
              <option value="C#/ASP.NET">C#/ASP.NET</option>
              <option value="Java">Java</option>
              <option value="Node.js/Express.">Node.js/Express.</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none w-full h-[25vh] bg-[#222222] tracking-[3px] rounded shadow-2xl shadow-black focus:outline-none p-8"
            placeholder="Description"
          />
        </div>

        <div className="mt-5">
          <button
            onClick={handleAdd}
            className="relative items-center  inline-block px-10 py-3 overflow-hidden font-medium rounded group bg-[#222222] shadow-2xl shadow-black"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-[#222222] opacity-[3%] shadow-2xl shadow-black"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 shadow-2xl shadow-black bg-[black] opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white-900 shadow-2xl shadow-black">
              Add
            </span>
            <span className="absolute inset-0 shadow-2xl shadow-black"></span>
          </button>
        </div>
      </div>
      <div className="mt-[5%]">
        {items.length === 0 && (
          <div className="text-white text-center mt-4">
            Currently You Have No Project to do
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-[5%]">
          <div className="text-[30px] font-black px-3 mb-[1%]">
            Projects Ahead
          </div>
          <table className="table-auto w-full min-h-[20vh] bg-[#1d1d1d] rounded shadow-2xl shadow-black p-6">
            <thead>
              <tr>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-4">
                  Project Name
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  Stack
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  App Type
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  Language
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-[#222222] transition-all">
                  <td
                    onClick={() => handleProjectClick(item.id)}
                    className=" text-center text-[10px] md:text-[20px] px-4 py-2"
                  >
                    {item.projectName}
                  </td>
                  <td
                    onClick={() => handleProjectClick(item.id)}
                    className=" text-center text-[10px] md:text-[20px] px-4 py-2"
                  >
                    {item.stack}
                  </td>
                  <td
                    onClick={() => handleProjectClick(item.id)}
                    className=" text-center text-[10px] md:text-[20px] px-4 py-2"
                  >
                    {item.appType}
                  </td>
                  <td className=" text-center text-[10px] md:text-[20px] px-4 py-2">
                    {item.language}
                  </td>
                  <td className=" text-center text-[10px] md:text-[20px] px-4 py-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleMarkCompleted(item.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                      Mark Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {completedItems.length > 0 && (
        <div className="mt-[5%]">
          <div className="text-[30px] font-black px-3 mb-[1%]">
            Completed Projects
          </div>
          <table className="table-auto w-full min-h-[20vh] bg-[#1d1d1d] rounded shadow-2xl shadow-black p-6">
            <thead>
              <tr>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-4">
                  Project Name
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  Stack
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  App Type
                </th>
                <th className="border-b text-[10px] md:text-[20px] font-medium px-4 py-2">
                  Language
                </th>
              </tr>
            </thead>
            <tbody>
              {completedItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#222222] transition-all">
                  <td
                    onClick={() => handleProjectClick(item.id)}
                    className=" text-center text-[10px] md:text-[20px] px-4 py-2"
                  >
                    {item.projectName}
                  </td>
                  <td
                    onClick={() => handleProjectClick(item.id)}
                    className=" text-center text-[10px] md:text-[20px] px-4 py-2"
                  >
                    {item.stack}
                  </td>
                  <td
                    onClick={() => handleProjectClick(item.id)}
                    className=" text-center text-[10px] md:text-[20px] px-4 py-2"
                  >
                    {item.appType}
                  </td>
                  <td className=" text-center text-[10px] md:text-[20px] px-4 py-2">
                    {item.language}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed z-10 inset-0 overflow-y-auto overflow-x-hidden"
        >
          <div className="flex items-center justify-center min-h-screen md:pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[#000000] opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div
              className="inline-block align-bottom bg-[#222222] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-[#222222] px-4 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="">
                    <div className="flex ">
                      <h3
                        className="text-[32px]  font-medium text-white py-4"
                        id="modal-headline"
                      >
                        {selectedProject.projectName}
                      </h3>
                      <button
                        onClick={closeModal}
                        type="button"
                        className=" absolute right-1 top-1 text-[20px] hover:bg-[#161616] p-3 rounded"
                      >
                        <IoClose />
                      </button>
                    </div>
                    <div className="flex justify-between gap-6">
                      <p className=" text-white">{selectedProject.stack}</p>
                      <p className="text-sm text-white py-1">
                        {selectedProject.appType}
                      </p>
                      <p className="text-sm text-white py-1">
                        {selectedProject.language}
                      </p>
                    </div>
                    <p className="text-sm text-white tracking-widest py-5">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {isModalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed z-10 inset-0 overflow-y-auto  overflow-x-hidden"
        >
          <div className="flex  items-center justify-center min-h-screen md:pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="inline-block  align-bottom bg-[#222222] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="h-full rounded shadow-2xl shadow-black p-6">
                <h1>Edit Credentials</h1>
                <div className="mt-5">
                  <div className="w-full py-4 bg-[#222222] shadow-2xl shadow-black rounded">
                    <input
                      value={modalProjectName}
                      onChange={(e) => setModalProjectName(e.target.value)}
                      type="text"
                      className="pt-2 px-4 text-[17px] focus:outline-none bg-transparent w-full tracking-[3px] text-sm disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                      placeholder="Project Name"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="w-full py-4 bg-[#222222] shadow-2xl shadow-black rounded">
                    <select
                      value={modalStack}
                      onChange={(e) => setModalStack(e.target.value)}
                      className="pt-2 px-4 text-[17px] focus:outline-none bg-[#222222] w-full tracking-[3px] text-sm disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Front End">Front End</option>
                      <option value="Back End">Back End</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="w-full py-4 bg-[#222222] shadow-2xl shadow-black rounded">
                    <select
                      value={modalAppType}
                      onChange={(e) => setModalAppType(e.target.value)}
                      className="pt-2 px-4 text-[17px] focus:outline-none bg-[#222222] w-full tracking-[3px] text-sm disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                    >
                      <option value="Web App">Web App</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="IOS App">IOS App</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="w-full py-4 bg-[#222222] shadow-2xl shadow-black rounded">
                    <select
                      value={modalLanguage}
                      onChange={(e) => setModalLanguage(e.target.value)}
                      className="pt-2 px-4 text-[17px] focus:outline-none bg-[#222222] w-full tracking-[3px] text-sm disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                    >
                      <option value="PHP/Laravel">PHP/Laravel</option>
                      <option value="Go/Gin">Go/Gin</option>
                      <option value="Python/Django">Python/Django</option>
                      <option value="Ruby/Rails">Ruby/Rails</option>
                      <option value="C#/ASP.NET">C#/ASP.NET</option>
                      <option value="Java">Java</option>
                      <option value="Node.js/Express.">Node.js/Express.</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <textarea
                    value={modalDescription}
                    onChange={(e) => setModalDescription(e.target.value)}
                    className="resize-none w-full h-[25vh] bg-[#222222] tracking-[3px] rounded shadow-2xl shadow-black focus:outline-none p-8"
                    placeholder="Description"
                  />
                </div>
                <div className="mt-5">
                  <button
                    onClick={handleSaveChanges}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {isConfirmationOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed z-10 top-[30%] inset-0 overflow-y-auto overflow-x-hidden"
        >
          <div className="flex items-center justify-center min-h-screen md:pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[#000000] opacity-75"></div>
            </div>

            <div
              className="inline-block align-bottom bg-[#222222] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-[#222222] px-4 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="">
                    <h3
                      className="text-[32px] font-medium text-white py-4"
                      id="modal-headline"
                    >
                      Confirm Deletion
                    </h3>
                    <p className="text-white">
                      Are you sure you want to delete this item?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={confirmDelete}
                    className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
