/**
 * Real covers from the BookSnap catalogue (https://be.booksnap.ai/api/v1/books).
 * The hero visual is a mock of the reader's own library, so it uses the actual
 * titles in it — invented covers would break the "this is your app" illusion.
 *
 * `snapped` marks the three the free plan already spent this month; the rest
 * are what the limit is currently holding shut.
 */
export const LIBRARY = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://be.booksnap.ai/uploads/books/covers/464cca8c-787f-4e93-b80c-3e06fbac8683_1777020353.png',
    snapped: true,
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    cover: 'https://be.booksnap.ai/uploads/books/covers/357eba6d-30e9-44d2-b936-e6edf2b5ca79_1779771113.png',
    snapped: true,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    cover: 'https://be.booksnap.ai/uploads/books/covers/50892fb0-5b54-4300-aacf-4e4a2c450083_1784281427.png',
    snapped: true,
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://be.booksnap.ai/uploads/books/covers/fc136eb0-e507-4660-859e-21cc07af9481_1779772605.png',
    snapped: false,
  },
  {
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    cover: 'https://be.booksnap.ai/uploads/books/covers/1d5b0bd9-5245-4de7-a185-6deb355df576_1784885766.png',
    snapped: false,
  },
  {
    title: 'Grit',
    author: 'Angela Duckworth',
    cover: 'https://be.booksnap.ai/uploads/books/covers/0ba806b0-bf0e-4cb1-b331-a6532f60aa77_1786009968.png',
    snapped: false,
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    cover: 'https://be.booksnap.ai/uploads/books/covers/563a78a6-10f7-4b72-b231-f77db189f997_1784280815.png',
    snapped: false,
  },
  {
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim',
    cover: 'https://be.booksnap.ai/uploads/books/covers/e653b0a4-73ed-47d6-9367-3af99095c033_1788236787.png',
    snapped: false,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    cover: 'https://be.booksnap.ai/uploads/books/covers/f79bd143-b77f-432a-86ba-04f825c7cd39_1779769983.png',
    snapped: false,
  },
]

/** The book the Ask AI mock is scoped to — it quotes this title's framework. */
export const ASK_AI_BOOK = LIBRARY[0]
