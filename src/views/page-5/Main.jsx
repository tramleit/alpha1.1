import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import {
  getUserSelect,
  createCustomer,
  uploadCustomerPicName,
  getAllCustomers,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../../services/database";
import { LoadingIcon } from "@/base-components";
import axios from "axios";
import Notification from "../../base-components/notification/Main";
import logoUrl from "@/assets/images/logo.svg";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usersSelect, setUsersSelect] = useState(null);
  const [allCustomers, setAllCustomers] = useState(null);
  const [customerIdDelete, setCustomerIdDelete] = useState(null);
  const [flagRefresh, setFlagRefresh] = useState(false);
  const [createUpdate, setCreateUpdate] = useState(null);
  const [addNewCustomer, setAddNewCustomer] = useState({
    id: "",
    owner: "",
    name: "",
    industry: "",
    description: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    website: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zip: "",
    street: "",
    numberStreet: "",
  });
  const [addNewCustomerPhoto, setAddNewCustomerPhoto] = useState(null);
  const [errorCustomerOwner, setErrorCustomerOwner] = useState(false);
  const [errorCustomerName, setErrorCustomerName] = useState(false);
  const [errorCustomerIndustry, setErrorCustomerIndustry] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState({
    icon: "CheckCircle",
    textType: "text-success",
    message: "New lead successfully created!!",
  });

  useEffect(() => {
    const getInfos = async () => {
      const res = await getUserSelect();
      const res2 = await getAllCustomers();
      setUsersSelect(res);
      setAllCustomers(res2);
    };
    getInfos();
  }, [flagRefresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorCustomerOwner(false);
    setErrorCustomerName(false);
    setErrorCustomerIndustry(false);
    if (
      addNewCustomer.owner == "" ||
      addNewCustomer.owner == "-" ||
      addNewCustomer.name == "" ||
      addNewCustomer.industry == ""
    ) {
      if (addNewCustomer.owner == "" || addNewCustomer.owner == "-") {
        setErrorCustomerOwner(true);
      }
      if (addNewCustomer.name == "") {
        setErrorCustomerName(true);
      }
      if (addNewCustomer.industry == "") {
        setErrorCustomerIndustry(true);
      }
      setLoading(false);
      return;
    }

    const resCreateCustomer = await createCustomer(addNewCustomer);

    if (addNewCustomerPhoto) {
      const newIdCustomer = resCreateCustomer.insertId;
      const data = new FormData();
      data.append("file", addNewCustomerPhoto, addNewCustomerPhoto.name);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/customers/upload-customer-pic`,
        data
      );

      const res2 = await uploadCustomerPicName(newIdCustomer, res.data);
    }

    setShowModal(false);
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "New lead successfully created!!",
    });
    setAddNewCustomer({
      id: "",
      owner: "",
      name: "",
      industry: "",
      description: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      website: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      zip: "",
      street: "",
      numberStreet: "",
    });
    setFlagRefresh(!flagRefresh);
    successNotificationToggle();
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorCustomerOwner(false);
    setErrorCustomerName(false);
    setErrorCustomerIndustry(false);
    if (
      addNewCustomer.owner == "" ||
      addNewCustomer.owner == "-" ||
      addNewCustomer.name == "" ||
      addNewCustomer.industry == ""
    ) {
      if (addNewCustomer.owner == "" || addNewCustomer.owner == "-") {
        setErrorCustomerOwner(true);
      }
      if (addNewCustomer.name == "") {
        setErrorCustomerName(true);
      }
      if (addNewCustomer.industry == "") {
        setErrorCustomerIndustry(true);
      }
      setLoading(false);
      return;
    }

    const resCreateCustomer = await updateCustomer(addNewCustomer);

    if (addNewCustomerPhoto) {
      const data = new FormData();
      data.append("file", addNewCustomerPhoto, addNewCustomerPhoto.name);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/customers/upload-customer-pic`,
        data
      );

      const res2 = await uploadCustomerPicName(addNewCustomer.id, res.data);
    }

    setShowModal(false);
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "Lead successfully updated!!",
    });
    setAddNewCustomer({
      id: "",
      owner: "",
      name: "",
      industry: "",
      description: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      website: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      zip: "",
      street: "",
      numberStreet: "",
    });
    setFlagRefresh(!flagRefresh);
    successNotificationToggle();
    setLoading(false);
  };

  const successNotification = useRef();
  const successNotificationToggle = () => {
    // Show notification
    successNotification.current.showToast();
  };

  const handleDelete = (bool, id) => {
    setCustomerIdDelete(id);
    setDeleteConfirmationModal(bool);
  };

  const handleDeleteCustomer = async () => {
    const res = await deleteCustomer(customerIdDelete);
    setNotificationMsg({
      icon: "CheckCircle",
      textType: "text-success",
      message: "Lead successfully deleted!!",
    });
    successNotificationToggle();
    setDeleteConfirmationModal(false);
    setFlagRefresh(!flagRefresh);
  };

  const handleGetCustomer = async (id) => {
    setAddNewCustomer({
      id: "",
      owner: "",
      name: "",
      industry: "",
      description: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      website: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      zip: "",
      street: "",
      numberStreet: "",
    });
    const res = await getCustomer(id);
    setAddNewCustomer({
      id: res[0].id,
      owner: res[0].owner_id,
      name: res[0].name,
      industry: res[0].industry,
      description: res[0].description,
      instagram: res[0].instagram,
      facebook: res[0].facebook,
      linkedin: res[0].linkedin,
      twitter: res[0].twitter,
      website: res[0].website,
      email: res[0].mail,
      phone: res[0].phone,
      country: res[0].address_country,
      city: res[0].address_city,
      zip: res[0].address_zip,
      street: res[0].address_street,
      numberStreet: res[0].address_number,
    });
    openModal(2);
  };

  const openModal = (status) => {
    setCreateUpdate(status);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal == false) {
      setAddNewCustomer({
        id: "",
        owner: "",
        name: "",
        industry: "",
        description: "",
        instagram: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        website: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        zip: "",
        street: "",
        numberStreet: "",
      });
    }
  }, [showModal]);

  return (
    <>
      <Notification
        getRef={(el) => {
          successNotification.current = el;
        }}
        options={{
          duration: 3000,
        }}
        className="flex"
      >
        <Lucide
          icon={notificationMsg.icon}
          className={notificationMsg.textType}
        />
        <div className="ml-4 mr-4">
          <div className="font-medium">{notificationMsg.message}</div>
          {/* <div className="text-slate-500 mt-1">
              The message will be sent in 5 minutes.
            </div> */}
        </div>
      </Notification>
      <h2 className="intro-y text-lg font-medium mt-10">Lead List</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <div
            onClick={() => openModal(1)}
            // href="javascript:;"
            data-tw-toggle="modal"
            data-tw-target="#superlarge-slide-over-size-preview"
            className="btn btn-primary mr-2"
          >
            Add New Lead
          </div>
          {/* BEGIN: Add New Modal */}
          {/* <div
            id="superlarge-slide-over-size-preview"
            className="modal modal-slide-over"
            tabindex="-1"
            aria-hidden="true"
          > */}
          <Modal
            size="modal-xl"
            show={showModal}
            slideOver={true}
            onHidden={() => {
              setShowModal(false);
            }}
          >
            {/* <div className="modal-dialog modal-xl">
              <div className="modal-content"> */}
            {/* <div className="modal-body"> */}
            <ModalBody>
              <form onSubmit={createUpdate == 1 ? handleSubmit : handleUpdate}>
                {/* BEGIN: Wizard Form */}
                <div className="flex justify-center mt-5">
                  <button className="intro-y w-15 h-15 rounded-full btn btn-primary">
                    <Lucide icon="UserPlus" className="w-8 h-8" />
                  </button>
                </div>
                <div className="px-5 mt-5">
                  <div className="font-medium text-center text-lg">
                    Add New Lead
                  </div>
                  <div className="text-slate-500 text-center mt-2">
                    Please complete the feilds below.
                  </div>
                </div>
                <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div className="font-medium text-center text-lg">
                    Lead Information
                  </div>
                  <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-1" className="form-label">
                        Lead Owner
                      </label>
                      <select
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            owner: e.target.value,
                          })
                        }
                        id="input-wizard-1"
                        className="form-select"
                      >
                        <option value="-">Choose a Lead owner</option>
                        {usersSelect &&
                          usersSelect.map((user) => {
                            return (
                              <option
                                value={user.id}
                              >{`${user.first_name} ${user.last_name}`}</option>
                            );
                          })}
                      </select>
                      {errorCustomerOwner && (
                        <div className="text-danger mt-2">
                          Lead Owner is a required field
                        </div>
                      )}
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-2" className="form-label">
                        Lead Name
                      </label>
                      <input
                        id="input-wizard-2"
                        type="text"
                        className="form-control"
                        placeholder="Lead's Company Name"
                        value={addNewCustomer.name}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            name: e.target.value,
                          })
                        }
                      />
                      {errorCustomerName && (
                        <div className="text-danger mt-2">
                          Lead Name is a required field
                        </div>
                      )}
                    </div>
                    {/* <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-3" className="form-label">
                        Customer Number
                      </label>
                      <input
                        id="input-wizard-3"
                        type="text"
                        className="form-control"
                        placeholder="123456"
                      />
                    </div> */}
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-4" className="form-label">
                        Industry
                      </label>
                      <input
                        id="input-wizard-4"
                        type="text"
                        className="form-control"
                        placeholder="Restaurant, Event, High-Tech..."
                        value={addNewCustomer.industry}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            industry: e.target.value,
                          })
                        }
                      />
                      {errorCustomerIndustry && (
                        <div className="text-danger mt-2">
                          Industry is a required field
                        </div>
                      )}
                    </div>

                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-6" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="input-wizard-6"
                        type="text"
                        className="form-control"
                        placeholder="Type here..."
                        value={addNewCustomer.description}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                        <div className="mx-auto cursor-pointer relative mt-5">
                          <button
                            htmlFor="input-wizard-5"
                            type="button"
                            className="btn btn-primary w-full"
                          >
                            Upload Photo/Logo
                          </button>
                          <input
                            id="input-wizard-5"
                            type="file"
                            className="w-full h-full top-0 left-0 absolute opacity-0"
                            // value={addNewCustomer.photo}
                            onChange={(e) =>
                              setAddNewCustomerPhoto(e.target.files[0])
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-center mt-10 text-lg">
                    Social Networks
                  </div>
                  <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-7" className="form-label">
                        Instagram
                      </label>
                      <input
                        id="input-wizard-7"
                        type="text"
                        className="form-control"
                        placeholder="@johndoe"
                        value={addNewCustomer.instagram}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            instagram: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-8" className="form-label">
                        Facebook
                      </label>
                      <input
                        id="input-wizard-8"
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                        value={addNewCustomer.facebook}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            facebook: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-9" className="form-label">
                        LinkedIn
                      </label>
                      <input
                        id="input-wizard-9"
                        type="text"
                        className="form-control"
                        placeholder="John Doe"
                        value={addNewCustomer.linkedin}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            linkedin: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-10" className="form-label">
                        twitter
                      </label>
                      <input
                        id="input-wizard-10"
                        type="text"
                        className="form-control"
                        placeholder="Twitter: @JohnDoe"
                        value={addNewCustomer.twitter}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            twitter: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="font-medium text-center mt-10 text-lg">
                    Lead Details
                  </div>
                  <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-11" className="form-label">
                        Website
                      </label>
                      <input
                        id="input-wizard-11"
                        type="text"
                        className="form-control"
                        placeholder="website.com"
                        value={addNewCustomer.website}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            website: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-12" className="form-label">
                        Email
                      </label>
                      <input
                        id="input-wizard-12"
                        type="text"
                        className="form-control"
                        placeholder="example@gmail.com"
                        value={addNewCustomer.email}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-13" className="form-label">
                        Phone
                      </label>
                      <input
                        id="input-wizard-13"
                        type="text"
                        className="form-control"
                        placeholder="+972506070809"
                        value={addNewCustomer.phone}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-14" className="form-label">
                        Country
                      </label>
                      <input
                        id="input-wizard-14"
                        type="text"
                        className="form-control"
                        placeholder="France"
                        value={addNewCustomer.country}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-15" className="form-label">
                        City
                      </label>
                      <input
                        id="input-wizard-15"
                        type="text"
                        className="form-control"
                        placeholder="Paris"
                        value={addNewCustomer.city}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-16" className="form-label">
                        Zip Code
                      </label>
                      <input
                        id="input-wizard-16"
                        type="text"
                        className="form-control"
                        placeholder="75000"
                        value={addNewCustomer.zip}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            zip: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-17" className="form-label">
                        Street Name
                      </label>
                      <input
                        id="input-wizard-17"
                        type="text"
                        className="form-control"
                        placeholder="Bonaparte Street"
                        value={addNewCustomer.street}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            street: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-6">
                      <label htmlFor="input-wizard-18" className="form-label">
                        Street Number
                      </label>
                      <input
                        id="input-wizard-18"
                        type="text"
                        className="form-control"
                        placeholder="12"
                        value={addNewCustomer.numberStreet}
                        onChange={(e) =>
                          setAddNewCustomer({
                            ...addNewCustomer,
                            numberStreet: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                      {loading ? (
                        <LoadingIcon icon="puff" className="w-8 h-8" />
                      ) : (
                        <>
                          <button className="btn btn-secondary w-24">
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary w-24 ml-2"
                          >
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* END: Wizard Form */}
                {/* </div> */}
                {/* </div> */}
                {/* </div> */}
              </form>
            </ModalBody>
          </Modal>
          {/* </div> */}
          {/* END: Wizard Form */}
          <Dropdown>
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                  Excel
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="Trash2" className="w-4 h-4 mr-2" /> Delete
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* <div className="hidden md:block mx-auto text-slate-500">
            Showing 1 to 10 of 150 entries
          </div> */}
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List -*/}
        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th className="whitespace-nowrap">LEAD</th>
                <th className="text-center whitespace-nowrap">MAIN CONTACT</th>
                <th className="text-center whitespace-nowrap">INDUSTRY</th>
                <th className="text-center whitespace-nowrap">STATUS</th>
                <th className="text-center whitespace-nowrap">TOTAL DEALS</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allCustomers &&
                allCustomers.map((customer, index) => {
                  var contact = usersSelect.filter((user) => {
                    return user.id == customer.owner_id;
                  });
                  return (
                    <tr key={index} className="intro-x">
                      <td className="w-10">
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td className="!py-3.5">
                        <div className="flex items-center">
                          <div className="w-9 h-9 image-fit zoom-in">
                            <Tippy
                              tag="img"
                              alt="Alpha - Modular CRM"
                              className="rounded-lg border-white shadow-md"
                              src={customer.photo ? customer.photo : logoUrl}
                            // content={`Uploaded at ${faker.dates[0]}`}
                            />
                          </div>
                          <div className="ml-4">
                            <a
                              href="./Lead-view"
                              className="font-medium whitespace-nowrap"
                            >
                              {customer.name}
                            </a>
                            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                              <a
                                href="mailto:"
                                className="font-medium whitespace-nowrap"
                              >
                                {customer.mail}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <a
                          className="flex items-center justify-center underline decoration-dotted"
                          href="#"
                        >
                          {`${contact[0].first_name} ${contact[0].last_name}`}
                        </a>
                      </td>
                      <td className="text-center capitalize">
                        {customer.industry}
                      </td>
                      <td className="w-40">
                        <div
                          className={classnames({
                            "flex items-center justify-center": true,
                            "text-success": customer.status == 1,
                            "text-danger": customer.status == 0,
                          })}
                        >
                          {customer.status ? (
                            <div className="flex items-center justify-center">
                              <Lucide
                                icon="CheckSquare"
                                className="w-4 h-4 mr-1"
                              />
                              Active
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <Lucide icon="X" className="w-4 h-4 mr-1" />
                              Inactive
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-center"> 10 Deals</td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          <a
                            className="flex items-center mr-3"
                            href="#"
                            onClick={() => handleGetCustomer(customer.id)}
                          >
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-1"
                            />{" "}
                            Edit
                          </a>
                          <a
                            className="flex items-center text-danger"
                            href="#"
                            onClick={() => {
                              handleDelete(true, customer.id);
                            }}
                          >
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* END: Data List -*/}
        {/* BEGIN: Pagination -*/}
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        {/* END: Pagination -*/}
      </div>
      {/* BEGIN: Delete Confirmation Modal -*/}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete this Lead? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-24"
              onClick={handleDeleteCustomer}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal -*/}
    </>
  );
}

export default Main;
