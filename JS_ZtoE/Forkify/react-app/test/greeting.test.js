import Greeting from "./greeting";

describe("Greeting component", () => {
  // test1
  test("renders 'Hello ' as a text", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...

    // Assert
    const helloWorldElement = screen.getByText("Hello", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  // test2
  test("renders 'Good ' if the button was NOT clicked", () => {
    render(<Greeting />);

    const outputElement = screen.getByText("Good ", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  // test3
  test("renders 'Changed ' if the button was clicked", () => {
    render(<Greeting />);

    // Act
    const buttonEl = screen.getByRole("button");
    userEvent.click(buttonEl);

    // Assert
    const outputElement = screen.getByText("Changed ", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  // test4
  test("does not render 'Good ' if the button was clicked", () => {
    render(<Greeting />);

    // Act
    const buttonEl = screen.getByRole("button");
    userEvent.click(buttonEl);

    // Assert
    const outputElement = screen.queryByText("Good ", { exact: false });
    expect(outputElement).toBeNull();
  });
});
