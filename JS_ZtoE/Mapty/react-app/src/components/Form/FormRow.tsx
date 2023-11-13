type FormRowType = {
  children: React.ReactNode;
  label: string;
};

const FormRow = ({ children, label }: FormRowType) => {
  return (
    <div className="form__row">
      <label className="form__label">{label}</label>
      {children}
    </div>
  );
};

export default FormRow;
