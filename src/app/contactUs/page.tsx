"use client";
import React from "react";

import ContactUsForm from "@/components/templates/contactUsForm";
import ContactUsDescription from "../../components/templates/contactUsDescription";
import Aos from "../../../utils/Aos";

const ContactUs = () => {
  return (
    <div className="pt-56 pb-24 px-8 md:px-40 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-40">
      <Aos />
      <ContactUsDescription />
      <ContactUsForm />
    </div>
  );
};

export default ContactUs;
