import Output from "./output";

const Greeting = () => {
  const [changed, setChanged] = useState(false);

  const changeHandler = () => {
    setChanged(true);
  };

  return (
    <div>
      <Output>
        <h2>Hello World!</h2>
      </Output>
      {changed && <p>It's good to see you!</p>}
      <button onClick={changeHandler}>change text</button>
    </div>
  );
};

export default Greeting;
