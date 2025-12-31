import { render, screen } from '@testing-library/react';
import { ImageGrid } from '../ImageGrid';
import { ProjectImage } from '../ImageCard';
import { describe, it, expect, vi } from 'vitest';

describe('ImageGrid', () => {
    const mockImages: ProjectImage[] = [
        {
            id: '1',
            project_id: 'p1',
            image_url: 'url1',
            title: 'Img 1',
            description: null,
            display_order: 0,
            is_before: false,
            is_after: false,
        },
        {
            id: '2',
            project_id: 'p1',
            image_url: 'url2',
            title: 'Img 2',
            description: null,
            display_order: 1,
            is_before: true,
            is_after: false,
        },
    ];

    const defaultProps = {
        images: mockImages,
        onDelete: vi.fn(),
        onToggleBeforeAfter: vi.fn(),
        onReorder: vi.fn(),
    };

    it('renders correct number of cards', () => {
        render(<ImageGrid {...defaultProps} />);
        // Check for the heading
        expect(screen.getByText(/Project Images/)).toBeInTheDocument();
        expect(screen.getByText('(2)')).toBeInTheDocument();
        // Check for images
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
    });

    it('renders nothing when empty', () => {
        const { container } = render(<ImageGrid {...defaultProps} images={[]} />);
        expect(container).toBeEmptyDOMElement();
    });
});
