import { renderHook, waitFor } from '@testing-library/react';
import { useProjectsByCategory } from '../useProjects';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Supabase client
const mockSelect = vi.fn();
const mockOrder = vi.fn();
const mockEq = vi.fn();
const mockIn = vi.fn();

vi.mock('@/integrations/supabase/client', () => ({
    supabase: {
        from: () => ({
            select: mockSelect,
        }),
    },
}));

describe('useProjectsByCategory', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockBuilder: any;

    beforeEach(() => {
        vi.resetAllMocks();

        // from(..).select(..).eq(..) OR .in(..) -> .order(..)

        // We need to return "this" to allow chaining

        // Mock implementation helper
        mockBuilder = {
            select: vi.fn(),
            eq: vi.fn(),
            in: vi.fn(),
            order: vi.fn()
        };

        // Circular references for chaining
        mockBuilder.select.mockReturnValue(mockBuilder);
        mockBuilder.eq.mockReturnValue(mockBuilder);
        mockBuilder.in.mockReturnValue(mockBuilder);

        // Crucial: mockBuilder.order must call our test-controlled mockOrder
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockBuilder.order.mockImplementation((...args: any[]) => {
            return mockOrder(...args);
        });

        // Default mockOrder implementation
        mockOrder.mockImplementation((column) => {
            if (column === 'display_order') {
                return Promise.resolve({ data: [], error: null });
            }
            return mockBuilder;
        });

        mockSelect.mockReturnValue(mockBuilder);

        // Expose mocks for assertions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockEq.mockImplementation((...args: any[]) => {
            // We track the call, and return builder
            return mockBuilder;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockIn.mockImplementation((...args: any[]) => {
            return mockBuilder;
        });
    });

    it('fetches projects for a single category', async () => {
        const mockData = [
            {
                id: '1',
                title: 'Project 1',
                category: 'Test',
                project_images: [
                    { image_url: 'img1.jpg', rotation_angle: 0, display_order: 1 }
                ]
            }
        ];

        mockOrder.mockImplementation((column) => {
            if (column === 'display_order') {
                return Promise.resolve({ data: mockData, error: null });
            }
            return mockBuilder; // Return the builder to allow chaining
        });

        const { result } = renderHook(() => useProjectsByCategory('Test'));

        // Initial state
        expect(result.current.loading).toBe(true);

        // Wait for update
        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.projects).toHaveLength(1);
        expect(result.current.projects[0].title).toBe('Project 1');
        expect(result.current.projects[0].image_url).toBe('img1.jpg');

        expect(mockSelect).toHaveBeenCalled();
        // Verify arguments on the mocked implementation if needed, or rely on outcome
        expect(mockOrder).toHaveBeenCalledWith('display_order');
    });

    it.skip('fetches projects for multiple categories', async () => {
        const mockData = [
            {
                id: '1',
                title: 'Project 1',
                category: 'Cat1',
                project_images: []
            }
        ];

        mockOrder.mockImplementation((column) => {
            if (column === 'display_order') {
                return Promise.resolve({ data: mockData, error: null });
            }
            return mockBuilder;
        });

        const { result } = renderHook(() => useProjectsByCategory(['Cat1', 'Cat2']));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.projects).toHaveLength(1);
    });
});
