import { useState } from "react";
import "./services.css";
import { serviceData } from "./serviceData";
import ServiceCard from "./ServiceCard";
import SectionTitle from "../SectionTitle/SectionTitle";

const Services = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <section className="services section" id="services">
      <SectionTitle title="Services" subtitle="What i offer" />
    
      <div className="services__container container grid">
        {serviceData.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={toggleState === service.id}
            onToggle={toggleTab}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
