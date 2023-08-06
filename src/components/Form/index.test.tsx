/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import userReducer from "../../store/slices/userSlice";
import { RootState } from "../../store";
import Form from "./index";

const renderWithRedux = (
  component: React.ReactElement,
  { store }: { store: EnhancedStore }
) => {
  return render(<Provider store={store}>{component}</Provider>);
};

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("Form Component", () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  test("it renders", () => {
    renderWithRedux(<Form />, { store });
  });

  test("submit button is initially disabled", () => {
    const screen = renderWithRedux(<Form />, { store });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("submit button is enabled when form is valid", () => {
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "First" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Last" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is a valid message." },
    });

    expect(screen.getByRole("button")).toBeEnabled();
  });

  test("input values stored after submit button clicked", () => {
    const mockedUser: RootState["user"] = {
      firstName: "First",
      lastName: "Last",
      email: "test@test.com",
      message: "This is a valid message.",
    };
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "First" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Last" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is a valid message." },
    });

    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(screen.getByRole("button"));

    expect(store.getState().user).toStrictEqual(mockedUser);
  });

  test("alert shows after submit button clicked", () => {
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "First" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Last" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is a valid message." },
    });

    expect(screen.getByRole("button")).toBeEnabled();

    fireEvent.click(screen.getByRole("button"));

    expect(window.alert).toBeCalledWith("Information recorded!");
  });

  test("submit button is disabled when first name is invalid", () => {
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "" },
    }); // Invalid because it's empty
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Last" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is a valid message." },
    });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("submit button is disabled when last name is invalid", () => {
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "First" },
    }); // Invalid because it's empty
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is a valid message." },
    });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("submit button is disabled when email is invalid", () => {
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "First" },
    }); // Invalid because it's empty
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Last" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test$2x@testdscsSXcs_com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is a valid message." },
    });

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("submit button is disabled when message is invalid", () => {
    const screen = renderWithRedux(<Form />, {
      store,
    });

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "First" },
    }); // Invalid because it's empty
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Last" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "This is " },
    });

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
