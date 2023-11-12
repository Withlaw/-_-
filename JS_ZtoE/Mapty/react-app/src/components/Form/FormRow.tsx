import Card from '../layout/Card';

type FormRowType = {
  children: React.ReactNode;
  label: string;
};

const FormRow = ({ children, label }: FormRowType) => {
  return (
    <Card>
      <div className="form__row">
        <label className="form__label">{label}</label>
        {children}
      </div>
    </Card>
  );
};

export default FormRow;
