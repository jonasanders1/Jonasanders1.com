import { useState } from "react";
import "./services.css";
import { serviceData } from "./serviceData";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What i offer</span>

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
