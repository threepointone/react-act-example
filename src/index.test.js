import React from "react";
import { render, act } from "@testing-library/react";
import { App } from "./App";
import axios from "axios";

jest.useFakeTimers();

const renderPage = () => render(<App />);

describe("Page", () => {
  it("fetches the settings", async () => {

    const spy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: { total_count: 1 } }));

    await act(async () => {
      renderPage();  
    })

    await act(async () => {
      jest.runAllTimers()
    })  
    
    expect(spy).toHaveBeenCalledWith(
      "https://api.github.com/search/repositories?q=react"
    );
  });
});
