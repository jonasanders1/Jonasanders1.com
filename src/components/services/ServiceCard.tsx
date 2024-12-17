import { ServiceCardProps } from "../../types";

const ServiceCard = ({ service, isActive, onToggle }: ServiceCardProps) => {
  return (
    <div className="services__content">
      <div>
        <i className={`${service.icon} services__icon`}></i>
        <h3 className="services__title">{service.title}</h3>
      </div>

      <span className="services__button" onClick={() => onToggle(service.id)}>
        View more
        <i className="uil uil-arrow-right services__button-icon"></i>
      </span>

      <div className={`services__modal ${isActive ? "active-modal" : ""}`}>
        <div className="services__modal-content">
          <i
            className="uil uil-times services__modal-close"
            onClick={() => onToggle(0)}
          ></i>

          <h3 className="services__modal-title">{service.title}</h3>
          <p className="services__modal-description">{service.description}</p>

          <ul className="services__modal-services grid">
            {service.services.map((item, index) => (
              <li className="services__modal-service" key={index}>
                <i className="uil uil-check-circle services__modal-icon"></i>
                <p className="services__modal-info">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
