import { render, screen, fireEvent } from '@testing-library/react';
import { ImageCard, ProjectImage } from '../ImageCard';
import { describe, it, expect, vi } from 'vitest';

describe('ImageCard', () => {
    const mockImage: ProjectImage = {
        id: '1',
        project_id: 'proj1',
        image_url: 'http://example.com/image.jpg',
        title: 'Test Image',
        description: null,
        display_order: 0,
        is_before: false,
        is_after: false,
    };

    const defaultProps = {
        image: mockImage,
        index: 0,
        isDragging: false,
        isDropTarget: false,
        onDragStart: vi.fn(),
        onDragOver: vi.fn(),
        onDragEnd: vi.fn(),
        onDragLeave: vi.fn(),
        onDelete: vi.fn(),
        onToggleBeforeAfter: vi.fn(),
    };

    it('renders image correctly with title alias', () => {
        render(<ImageCard {...defaultProps} />);
        const imgElement = screen.getByRole('img');
        expect(imgElement).toHaveAttribute('src', mockImage.image_url);
        expect(imgElement).toHaveAttribute('alt', mockImage.title);
    });

    it('renders index label correctly', () => {
        render(<ImageCard {...defaultProps} index={4} />);
        expect(screen.getByText('Image 5')).toBeInTheDocument();
    });

    it('calls onDelete when trash button is clicked', () => {
        render(<ImageCard {...defaultProps} />);
        const deleteBtn = screen.getByRole('button'); // usually the first button or identify via icon
        // A more precise selector might be needed if there are multiple buttons using aria-label if available, 
        // but here we know structure.
        fireEvent.click(deleteBtn);
        expect(defaultProps.onDelete).toHaveBeenCalledWith(mockImage);
    });
});
