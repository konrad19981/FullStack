import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoApp from './task';
import { getByPlaceholderText, getByText } from "@testing-library/react";

test('Dodawanie nowego zadania', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<TodoApp />);
    const input = getByPlaceholderText('Dodaj nowe zadanie');
    const addButton = getByText('Dodaj');
    fireEvent.change(input, { target: { value: 'Nowe zadanie' } });
    fireEvent.click(addButton);
    const task = getByText('Nowe zadanie');
    expect(task).toBeInTheDocument();
});

test('Usuwanie zadania', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoApp />);
    const input = getByPlaceholderText('Dodaj nowe zadanie');
    const addButton = getByText('Dodaj');
    fireEvent.change(input, { target: { value: 'Zadanie do usunięcia' } });
    fireEvent.click(addButton);
    const deleteButton = getByText('Usuń');
    fireEvent.click(deleteButton);

    const task = queryByText('Zadanie do usunięcia');
    expect(task).not.toBeInTheDocument();
});

test('Oznaczanie zadania jako wykonane', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<TodoApp />);
    const input = getByPlaceholderText('Dodaj nowe zadanie');
    const addButton = getByText('Dodaj');
    fireEvent.change(input, { target: { value: 'Zadanie do oznaczenia' } });
    fireEvent.click(addButton);
    const doneButton = getByText('Zrobione');
    fireEvent.click(doneButton);
    const task = getByTestId('completed-task');
    expect(task).toHaveTextContent('✅ Zadanie do oznaczenia');
});
