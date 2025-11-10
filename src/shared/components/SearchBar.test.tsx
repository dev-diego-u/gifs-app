import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("should render search bar correctly", () => {
    // prueba de renderizado de la barra de búsqueda
    const { container } = render(<SearchBar onQuery={() => {}} />);
    expect(container).toMatchSnapshot(); // verifica el snapshot
    expect(screen.getByRole("textbox")).toBeDefined(); // verifica el input
    expect(screen.getByRole("button")).toBeDefined(); // verifica el botón
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    // prueba de llamada a onQuery con debounces
    const mockOnQuery = vi.fn();
    render(<SearchBar onQuery={mockOnQuery} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "cats" } });
    // screen.debug();
    // espera 700ms y verifica la llamada
    await waitFor(() => {
      expect(mockOnQuery).toHaveBeenCalledTimes(1);
      expect(mockOnQuery).toHaveBeenCalledWith("cats");
    });
  });
  test("should call only once with the last value(debounces)", async () => {
    const mockOnQuery = vi.fn();
    render(<SearchBar onQuery={mockOnQuery} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "to" } });
    fireEvent.change(input, { target: { value: "tom" } });
    fireEvent.change(input, { target: { value: "toma" } });
    fireEvent.change(input, { target: { value: "tomar" } });
    fireEvent.change(input, { target: { value: "tomate" } });
    await waitFor(() => {
      expect(mockOnQuery).toHaveBeenCalledTimes(1);
      expect(mockOnQuery).toHaveBeenCalledWith("tomate");
    });
  });

  test("should not call onQuery when button is clicked with input value", async () => {
    const mockOnQuery = vi.fn();
    render(<SearchBar onQuery={mockOnQuery} />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "dogs" } });
    fireEvent.click(button);
    expect(mockOnQuery).toHaveBeenCalled();
    expect(mockOnQuery).toHaveBeenCalledWith("dogs");
  });

  test("should the input has the placeholder text", () => {
    const placeholderText = "Search gifs...";
    render(<SearchBar onQuery={() => {}} placeholder={placeholderText} />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("placeholder")).toBe(placeholderText);
  });
});
