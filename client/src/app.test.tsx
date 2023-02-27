import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./utils/test-utils";
import App from "./app";
import { data } from "./utils/test-data";
import { vi } from "vitest";

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_BASE_URL}/api`, (req, res, ctx) => {
    return res(ctx.json(data), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setup = () => {
  const utils = renderWithProviders(<App />);
  const input = screen.getByLabelText("Search");
  return {
    input,
    ...utils,
  };
};

test("fetches & receives search results after clicking the search button", async () => {
  const { input } = setup();
  expect(screen.queryByText(/Loading Results\.\.\./i)).not.toBeInTheDocument();
  fireEvent.change(input, {
    target: { value: "Jack Jones" },
  });
  fireEvent.click(screen.getByRole("button"));
  const items = await screen.findAllByTestId("card");
  expect(items).toHaveLength(10);
  expect(screen.queryByText(/Loading Results\.\.\./i)).not.toBeInTheDocument();
});

// etc...
