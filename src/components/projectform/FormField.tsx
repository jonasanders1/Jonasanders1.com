import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "textarea" | "file" | "date";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onFileChange,
  onDateChange,
  placeholder,
  required = false,
  accept,
  multiple,
  children,
  className = "",
}) => {
  return (
    <div className={`form-field ${className}`}>
      <label className="form-field__label">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          className="form-field__input form-field__textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          className="form-field__input"
          onChange={onFileChange}
          accept={accept}
          multiple={multiple}
        />
      ) : type === "date" ? (
        <input
          type="date"
          name={name}
          className="form-field__input"
          value={value}
          onChange={onDateChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          className="form-field__input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
      {children}
    </div>
  );
};

export default FormField; 