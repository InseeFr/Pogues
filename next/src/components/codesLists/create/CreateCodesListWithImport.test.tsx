import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithRouter } from '@/testing/render';
import CreateCodesListWithCombinedImport from './CreateCodesListWithImport';

describe('CreateCodesListWithCombinedImport', () => {
    it('should render the form and CSV import toggle', async () => {
        const { getByText, getByRole } = await renderWithRouter(
            <CreateCodesListWithCombinedImport
                questionnaireId="test-q-id"
                variables={[]}
            />,
        );

        // Should show the create title
        expect(getByText('codesList.create.title')).toBeInTheDocument();

        // Should show the import button initially
        expect(getByRole('button', { name: 'codesList.import.importButton' })).toBeInTheDocument();

        // Should not show CSV import section initially
        expect(screen.queryByText('codesList.import.title')).not.toBeInTheDocument();
    });

    it('should show CSV import when toggle is clicked', async () => {
        const user = userEvent.setup();
        const { getByRole, queryByText } = await renderWithRouter(
            <CreateCodesListWithCombinedImport
                questionnaireId="test-q-id"
                variables={[]}
            />,
        );

        const importButton = screen.getByRole('button', { name: 'codesList.import.importButton' });
        await user.click(importButton);

        // Should now show CSV import section
        expect(queryByText('codesList.import.title')).toBeInTheDocument();
        expect(queryByText('codesList.import.description')).toBeInTheDocument();

        // Should show cancel button to hide import
        expect(getByRole('button', { name: 'common.cancel' })).toBeInTheDocument();
    });

    it('should handle form submission with manual codes', async () => {
        const user = userEvent.setup();

        // Mock the form submission
        const codesListsModule = await import('@/api/codesLists');
        vi.spyOn(codesListsModule, 'putCodesList').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({}))));

        const { getByRole, getByLabelText } = await renderWithRouter(
            <CreateCodesListWithCombinedImport
                questionnaireId="test-q-id"
                variables={[]}
            />,
        );

        // Fill in the form
        const labelInput = getByLabelText('codesList.common.label');
        await user.type(labelInput, 'Test Code List');

        const codeValueInput = screen.getByTestId('codes.0.value');
        await user.type(codeValueInput, 'CODE1');

        const codeLabelInput = screen.getByTestId('codes.0.label');
        await user.type(codeLabelInput, 'Label 1');

        // Submit the form
        const submitButton = getByRole('button', { name: 'common.validate' });
        await user.click(submitButton);

        // Should call the API
        await waitFor(() => {
            expect(codesListsModule.putCodesList).toHaveBeenCalled();
        });
    });
});