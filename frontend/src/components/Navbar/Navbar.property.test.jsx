import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import Navbar from './Navbar';

/**
 * Feature: restaurant-partner-dashboard, Property 1: Navigation state consistency
 * 
 * Property: For any navigation action between dashboard pages, the navbar should 
 * highlight the correct active page and maintain full functionality
 * 
 * Validates: Requirements 3.3, 3.4, 3.5
 */

describe('Navbar Property Tests', () => {
  const validPaths = ['/', '/menu', '/report'];
  
  it('Property 1: Navigation state consistency - active state highlighting works for all valid paths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        (currentPath) => {
          // Render Navbar with the current path
          render(
            <MemoryRouter initialEntries={[currentPath]}>
              <Navbar />
            </MemoryRouter>
          );

          // Find all navigation links
          const dashboardLink = screen.getByLabelText('Navigate to Dashboard');
          const menuLink = screen.getByLabelText('Navigate to Menu');
          const reportLink = screen.getByLabelText('Navigate to Report');

          // Verify all links are present (functionality maintained)
          expect(dashboardLink).toBeInTheDocument();
          expect(menuLink).toBeInTheDocument();
          expect(reportLink).toBeInTheDocument();

          // Verify correct active state highlighting
          if (currentPath === '/') {
            expect(dashboardLink).toHaveAttribute('aria-current', 'page');
            expect(menuLink).not.toHaveAttribute('aria-current');
            expect(reportLink).not.toHaveAttribute('aria-current');
          } else if (currentPath === '/menu') {
            expect(menuLink).toHaveAttribute('aria-current', 'page');
            expect(dashboardLink).not.toHaveAttribute('aria-current');
            expect(reportLink).not.toHaveAttribute('aria-current');
          } else if (currentPath === '/report') {
            expect(reportLink).toHaveAttribute('aria-current', 'page');
            expect(dashboardLink).not.toHaveAttribute('aria-current');
            expect(menuLink).not.toHaveAttribute('aria-current');
          }

          // Verify all links have correct href attributes (navigation functionality)
          expect(dashboardLink.getAttribute('href')).toBe('/');
          expect(menuLink.getAttribute('href')).toBe('/menu');
          expect(reportLink.getAttribute('href')).toBe('/report');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1: Navigation state consistency - navbar structure remains consistent across all paths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...validPaths),
        (currentPath) => {
          render(
            <MemoryRouter initialEntries={[currentPath]}>
              <Navbar />
            </MemoryRouter>
          );

          // Verify consistent structure - exactly 3 navigation items
          const navLinks = screen.getAllByRole('link');
          expect(navLinks).toHaveLength(3);

          // Verify all expected navigation items are present
          expect(screen.getByText('Dashboard')).toBeInTheDocument();
          expect(screen.getByText('Menu')).toBeInTheDocument();
          expect(screen.getByText('Report')).toBeInTheDocument();

          // Verify navigation accessibility
          const nav = screen.getByRole('navigation');
          expect(nav).toHaveAttribute('aria-label', 'Main navigation');
        }
      ),
      { numRuns: 100 }
    );
  });
});