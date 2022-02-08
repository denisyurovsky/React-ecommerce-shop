import { render, fireEvent, screen, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  EDITOR_MAX_SYMBOLS,
  MAX_LENGTH_MESSAGE,
  table,
  LINK_PREDEFINED_TEXT,
} from '../constants';
import { LONG_TEXT } from '../helpers/test-utils/testConstants';
import Wrapper from '../helpers/test-utils/Wrapper';

const { INPUT_ERROR, MAX_ROWS } = table;

window.scrollTo = jest.fn();

const getTextArea = () => screen.getByRole('textbox');
const pasteText = (text) =>
  createEvent.paste(getTextArea(), {
    clipboardData: {
      types: ['text/plain'],
      getData: () => text,
    },
  });

const addTableToEditor = () => {
  userEvent.click(screen.getByTestId('TableChartIcon'));
  fireEvent.change(screen.getByLabelText('Number of rows'), {
    target: { value: '2' },
  });
  userEvent.click(screen.getByRole('button', { name: /add table/i }));
};

describe('footer:', () => {
  describe('inner errors', () => {
    beforeEach(() => render(<Wrapper />));

    it('should show max size is reached message', async () => {
      await screen.findByText(/description/i);
      fireEvent(getTextArea(), pasteText(LONG_TEXT));

      expect(screen.getByText(MAX_LENGTH_MESSAGE)).toBeInTheDocument();
    });
  });

  describe('outer errors', () => {
    beforeEach(() => render(<Wrapper error={true} helperText="test error" />));

    it('should show outer error', () => {
      expect.assertions(2);
      const text = 'try';

      fireEvent(getTextArea(), pasteText(text));

      expect(screen.getByText(text)).toBeInTheDocument();
      expect(screen.getByText('test error')).toBeInTheDocument();
    });

    it('should display inner error with higher importance', () => {
      fireEvent(getTextArea(), pasteText(LONG_TEXT));

      expect(screen.getByText(MAX_LENGTH_MESSAGE)).toBeInTheDocument();
    });
  });

  describe('correct messages', () => {
    beforeEach(() => render(<Wrapper />));

    it('should show how many symbols are left to max value', () => {
      const text = 'try';
      const expectedLength = `${EDITOR_MAX_SYMBOLS - text.length}`;

      fireEvent(getTextArea(), pasteText(text));

      expect(screen.getByTestId('left-number')).toHaveTextContent(
        expectedLength
      );
    });

    it('should change styles for state with less than 50 symbols', () => {
      fireEvent(getTextArea(), pasteText(LONG_TEXT.slice(0, 990)));

      expect(screen.getByTestId('editor-footer')).toMatchSnapshot();
    });

    it('should show hint when anchor placed into table', () => {
      addTableToEditor();

      expect(
        screen.getByTestId('TipsAndUpdatesOutlinedIcon')
      ).toBeInTheDocument();
    });
  });
});

describe('modifiers functionality:', () => {
  describe('table', () => {
    beforeEach(() => render(<Wrapper />));

    it('should show error if entered number more than max table rows', async () => {
      await screen.findByText('Description');
      expect.assertions(2);

      userEvent.click(screen.getByTestId('TableChartIcon'));
      fireEvent.change(screen.getByLabelText('Number of rows'), {
        target: { value: MAX_ROWS + 2 },
      });

      expect(screen.getByRole('button', { name: /add table/i }).disabled).toBe(
        true
      );
      expect(screen.getByText(INPUT_ERROR)).toBeInTheDocument();
    });

    it('should create a new block after "Enter"', () => {
      fireEvent(getTextArea(), pasteText('block'));
      userEvent.keyboard('{enter}');
      fireEvent(getTextArea(), pasteText('one more block'));
      userEvent.keyboard('{enter}');

      addTableToEditor();

      userEvent.keyboard('{enter}');

      expect(screen.queryByTestId('TipsAndUpdatesOutlinedIcon')).toBeNull();
    });

    it('should create a new line after "Enter" + "Shift"', () => {
      fireEvent(getTextArea(), pasteText('block'));
      addTableToEditor();

      userEvent.keyboard('{shift}{enter}');

      expect(
        screen.queryByTestId('TipsAndUpdatesOutlinedIcon')
      ).toBeInTheDocument();
    });
  });

  describe('link', () => {
    beforeEach(() => render(<Wrapper />));

    it('should show predefined text for link', () => {
      userEvent.click(screen.getByTestId('AddLinkIcon'));

      expect(screen.getByLabelText(/insert hyperlink/i).value).toBe(
        LINK_PREDEFINED_TEXT
      );
    });

    it('should add correct link', () => {
      const displayedText = 'test link';

      userEvent.click(screen.getByTestId('AddLinkIcon'));
      fireEvent.change(screen.getByLabelText(/insert hyperlink/i), {
        target: { value: 'veryimportant.com' },
      });
      fireEvent.change(screen.getByLabelText(/displayed text/i), {
        target: { value: displayedText },
      });
      userEvent.click(screen.getByRole('button', { name: /add link/i }));

      expect(screen.getByText(displayedText)).toBeInTheDocument();
    });
  });

  describe('email', () => {
    beforeEach(() => render(<Wrapper />));

    it('should add correct email', () => {
      const email = 'test@email.com';

      userEvent.click(screen.getByTestId('MailIcon'));
      fireEvent.change(screen.getByLabelText(/e-mail/i), {
        target: { value: email },
      });
      userEvent.click(screen.getByRole('button', { name: /insert/i }));

      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  describe('inline', () => {
    beforeEach(() => render(<Wrapper />));

    it('should apply styles', () => {
      const text = 'bold style';

      userEvent.click(screen.getByText(/total/i));
      userEvent.click(screen.getByTestId('FormatBoldIcon'));

      fireEvent(getTextArea(), pasteText(text));

      expect(screen.getByText(text).parentElement.style['font-weight']).toBe(
        'bold'
      );
    });
  });

  describe('block', () => {
    beforeEach(() => render(<Wrapper />));

    it('should apply list styles', () => {
      const listItem = 'first item';

      userEvent.click(screen.getByText(/total/i));
      userEvent.click(screen.getByTestId('FormatListNumberedIcon'));
      fireEvent(getTextArea(), pasteText(listItem));

      expect(screen.getByText(listItem).closest('ol')).toBeInTheDocument();
    });
  });
});

describe('general functionality', () => {
  beforeEach(() => render(<Wrapper />));

  it('should be able to react on "Backspace"', () => {
    const text = 'test343';

    fireEvent(getTextArea(), pasteText(text));

    userEvent.click(screen.getByText(text));
    userEvent.keyboard('{Backspace}{Backspace}{Backspace}');

    expect(screen.getByText(text.slice(0, 4))).toBeInTheDocument();
  });
});
