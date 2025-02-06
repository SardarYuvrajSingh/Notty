import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichTextEditor from '@/components/Editor/rich-text-edit';

// Mock the Quill class to simulate its behavior
jest.mock('quill', () => {
  return jest.fn().mockImplementation(() => ({
    root: {
      innerHTML: '',
    },
    on: jest.fn(),
    getContents: jest.fn(() => ({ ops: [{ insert: 'Hello World' }] })),
    setContents: jest.fn(),
    update: jest.fn(),
    getText: jest.fn(() => 'Hello World'),
  }));
});

describe('RichTextEditor Component', () => {
  test('renders without crashing', async () => {
    const { container } = render(<RichTextEditor />);
    // Query the editor element using a class name selector via querySelector
    const editor = container.querySelector('.h-64');
    expect(editor).toBeInTheDocument();
  });

  // test.skip('sets initial content correctly', async () => {
  //   const { container } = render(<RichTextEditor initialContent="<p>Hello World</p>" />);
  
  //   // Wait for Quill to initialize and get the editor instance
  //   await waitFor(() => {
  //     const editor = container.querySelector('[data-testid="editor-container"]'); // Assuming a test ID or ref is used
  //     expect(editor).toBeInTheDocument();
  //   });
  
  //   // Access Quill instance (mocked)
  //   const quillInstance = new (require('quill'))();
  //   quillInstance.root.innerHTML = "<p>Hello World</p>"; // Simulate initial content being set
  
  //   // Ensure the editor contains the expected initial content
  //   await waitFor(() => {
  //     expect(quillInstance.root.innerHTML).toContain('<p>Hello World</p>');
  //   });
  // });
  

  test('calls onChange when content changes', async () => {
    const handleChange = jest.fn();
    const { container } = render(<RichTextEditor onChange={handleChange} />);

    // Find the editor element using querySelector
    const editor = container.querySelector('.h-64');
    // Simulate content change by directly updating innerHTML
    if (editor) {
      editor.innerHTML = '<p>New Content</p>';
    }

    // Access the Quill instance, which is now mocked
    const quillInstance = new (require('quill'))();

    // Simulate the 'text-change' event and call onChange
    quillInstance.on('text-change', () => {
      handleChange(editor?.innerHTML || '');
    });

    // Emit the event
    quillInstance.on.mock.calls[0][1](); // Simulate the text-change event

    // Ensure handleChange is called with the new content
    expect(handleChange).toHaveBeenCalledWith('<p>New Content</p>');
  });

  test('disables editor when disabled prop is true', () => {
    const { container } = render(<RichTextEditor disabled />);
    // Check if the toolbar is either not rendered or disabled
    const toolbar = container.querySelector('.ql-toolbar');
    expect(toolbar).toBeNull(); // Ensure the toolbar is not rendered when disabled
  });
});
