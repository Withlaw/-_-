import FormRow from './FormRow';

const Form = () => {
  const list = [
    { label: 'Distance', placeholder: 'km' },
    { label: 'Duration', placeholder: 'min' },
    { label: 'Cadence', placeholder: 'step/min' },
  ];
  return (
    <form className="form">
      <FormRow label="Type">
        <select className="form__input form__input--type">
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </FormRow>
      {list.map((el, idx) => (
        <FormRow key={`item-${idx}`} label={el.label}>
          <input
            className={`form__input form__input--${el.label.toLowerCase()}`}
            placeholder={el.placeholder}
          />
        </FormRow>
      ))}
      {/* <div className="form__row form__row--hidden"> */}
      {/*<label className="form__label">Elev Gain</label>
        <input
          className="form__input form__input--elevation"
          placeholder="meters"
        />
      </div> */}
      {/* <button className="form__btn">OK</button> */}
    </form>
  );
};

export default Form;
