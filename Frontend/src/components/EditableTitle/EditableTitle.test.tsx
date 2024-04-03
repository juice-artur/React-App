import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import EditableTitle from "./EditableTitle";

describe('EditableTitle', () => {
  it('renders with initial title', () => {
    const initialTitle = 'Test Title';
    const onSave = jest.fn();

    const { getByText } = render(<EditableTitle initialTitle={initialTitle} onSave={onSave} />);

    expect(getByText(initialTitle)).toBeInTheDocument();
  });

  it('renders input when editing', () => {
    const initialTitle = 'Test Title';
    const onSave = jest.fn();

    const { getByText, getByDisplayValue } = render(<EditableTitle initialTitle={initialTitle} onSave={onSave} />);

    fireEvent.click(getByText(initialTitle));

    expect(getByDisplayValue(initialTitle)).toBeInTheDocument();
  });

  it('calls onSave when title is saved', () => {
    const initialTitle = 'Test Title';
    const newTitle = 'New Test Title';
    const onSave = jest.fn();

    const { getByText, getByDisplayValue } = render(<EditableTitle initialTitle={initialTitle} onSave={onSave} />);

    fireEvent.click(getByText(initialTitle));
    fireEvent.change(getByDisplayValue(initialTitle), { target: { value: newTitle } });
    fireEvent.blur(getByDisplayValue(newTitle));

    expect(onSave).toHaveBeenCalledWith(newTitle);
  });

  it('focuses input on mount if focusInput is true', () => {
    const initialTitle = 'Test Title';
    const onSave = jest.fn();

    const { getByDisplayValue } = render(<EditableTitle initialTitle={initialTitle} onSave={onSave} focusInput={true} />);

    expect(document.activeElement).toEqual(getByDisplayValue(initialTitle));
  });
});
