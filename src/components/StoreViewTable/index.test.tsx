/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import userReducer, { updateField } from "../../store/slices/userSlice";
import StoreViewTable from "./index";
import { RootState } from "../../store";

const renderWithRedux = (
  component: React.ReactElement,
  { store }: { store: EnhancedStore }
) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("StoreViewTable Component", () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  test("it renders", () => {
    renderWithRedux(<StoreViewTable />, { store });
  });

  test("displays initial user data from store", () => {
    const screen = renderWithRedux(<StoreViewTable />, { store });

    expect(screen.getByTestId("first-name")).toHaveTextContent("");
    expect(screen.getByTestId("last-name")).toHaveTextContent("");
    expect(screen.getByTestId("email")).toHaveTextContent("");
    expect(screen.getByTestId("message")).toHaveTextContent("");
  });

  test("displays updated user data from store", () => {
    const mockedUser: RootState["user"] = {
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      message: "This is a test message.",
    };

    const screen = renderWithRedux(<StoreViewTable />, {
      store,
    });

    act(() => {
      store.dispatch(
        updateField({ field: "firstName", value: mockedUser.firstName })
      );
      store.dispatch(
        updateField({ field: "lastName", value: mockedUser.lastName })
      );
      store.dispatch(updateField({ field: "email", value: mockedUser.email }));
      store.dispatch(
        updateField({ field: "message", value: mockedUser.message })
      );
    });

    expect(screen.getByTestId("first-name")).toHaveTextContent(
      mockedUser.firstName
    );
    expect(screen.getByTestId("last-name")).toHaveTextContent(
      mockedUser.lastName
    );
    expect(screen.getByTestId("email")).toHaveTextContent(mockedUser.email);
    expect(screen.getByTestId("message")).toHaveTextContent(mockedUser.message);

    expect(store.getState().user).toStrictEqual(mockedUser);
  });
});
