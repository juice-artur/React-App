import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders with primary variant', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button variant="primary" onClick={onClickMock}>
        Click me
      </Button>
    );
    const button = getByText('Click me');
    expect(button.classList.contains('bg-blue-500')).toBe(true)
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('renders with secondary variant', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button variant="secondary" onClick={onClickMock}>
        Click me
      </Button>
    );
    const button = getByText('Click me');
    expect(button.classList.contains('bg-gray-500')).toBe(true)
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });

});
