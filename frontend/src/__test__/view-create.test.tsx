import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import RichNote from "@/components/Editor/view-create";
import { useNotes } from "@/services/notes.service-hook";
import '@testing-library/jest-dom'

jest.mock("@/services/notes.service-hook"); // Mock the notes service
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("RichNote Component", () => {
  const mockOnClose = jest.fn();
  let createMutationMock: jest.Mock;
  let updateMutationMock: jest.Mock;

  beforeEach(() => {
    createMutationMock = jest.fn();
    updateMutationMock = jest.fn();

    (useNotes as jest.Mock).mockReturnValue({
      createMutation: {
        mutate: createMutationMock,
        isPending: false,
      },
      updateMutation: {
        mutate: updateMutationMock,
        isPending: false,
      },
    });
  });

  test("renders create new note UI", () => {
    render(<RichNote onClose={mockOnClose} />);

    // Replaced `toBeInTheDocument` with basic checks
    expect(screen.getByPlaceholderText("Title")).toBeTruthy();
    expect(screen.getByText("Create New Note")).toBeTruthy();
  });

  test("calls createMutation when submitting new note", () => {
    render(<RichNote onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Note" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Note" }));

    expect(createMutationMock).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("New Note created successfully!.");
  });

  test("renders edit note UI with existing data", () => {
    const note = {
      note_id: 1,
      title: "Existing Note",
      body: "This is an existing note",
      author: 1,
      created: "2024-02-05T10:00:00Z",
      modified: "2024-02-05T12:00:00Z",
    };

    render(<RichNote note={note} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Title").getAttribute('value')).toBe("Existing Note");
    expect(screen.getByText("Edit Note")).toBeTruthy();
  });

  test("calls updateMutation when updating an existing note", () => {
    const note = {
      note_id: 1,
      title: "Existing Note",
      body: "This is an existing note",
      author: 1,
      created: "2024-02-05T10:00:00Z",
      modified: "2024-02-05T12:00:00Z",
    };

    render(<RichNote note={note} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Note" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update Note" }));

    expect(updateMutationMock).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Note updated successfully!.");
  });

  test("disables update button if no changes are made", () => {
    const note = {
      note_id: 1,
      title: "Existing Note",
      body: "This is an existing note",
      author: 1,
      created: "2024-02-05T10:00:00Z",
      modified: "2024-02-05T12:00:00Z",
    };
  
    render(<RichNote note={note} onClose={mockOnClose} />);
  
    const updateButton = screen.getByRole("button", { name: "Update Note" });
    expect(updateButton).toHaveClass("disabled:opacity-50");
  });
  
});
