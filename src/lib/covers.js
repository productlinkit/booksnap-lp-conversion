/**
 * Real covers from the BookSnap catalogue (https://be.booksnap.ai/api/v1/books).
 * They scroll past under the hero as the thing the monthly limit is holding
 * shut — invented covers would break the "this is your app" illusion the whole
 * page runs on.
 *
 * `cover` is a local copy; `source` is the catalogue URL it came from, kept so
 * the set can be refreshed. The originals are served at full print resolution —
 * 500KB to 1.6MB each, 7.1MB for the nine — against a tile rendered 104px tall.
 * Loading them live cost more than the rest of the page put together. The local
 * copies are 420px tall JPEGs, 152KB for the set.
 *
 * To refresh: download each `source`, then
 *   sips -Z 420 -s format jpeg -s formatOptions 80 in.png --out public/covers/<slug>.jpg
 *
 * `snapped` marks the three the free plan already spent this month.
 */
export const LIBRARY = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: '/covers/atomic-habits.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/464cca8c-787f-4e93-b80c-3e06fbac8683_1777020353.png',
    snapped: true,
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    cover: '/covers/deep-work.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/357eba6d-30e9-44d2-b936-e6edf2b5ca79_1779771113.png',
    snapped: true,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    cover: '/covers/thinking-fast-and-slow.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/50892fb0-5b54-4300-aacf-4e4a2c450083_1784281427.png',
    snapped: true,
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: '/covers/sapiens.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/fc136eb0-e507-4660-859e-21cc07af9481_1779772605.png',
    snapped: false,
  },
  {
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    cover: '/covers/the-body-keeps-the-score.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/1d5b0bd9-5245-4de7-a185-6deb355df576_1784885766.png',
    snapped: false,
  },
  {
    title: 'Grit',
    author: 'Angela Duckworth',
    cover: '/covers/grit.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/0ba806b0-bf0e-4cb1-b331-a6532f60aa77_1786009968.png',
    snapped: false,
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    cover: '/covers/becoming.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/563a78a6-10f7-4b72-b231-f77db189f997_1784280815.png',
    snapped: false,
  },
  {
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim',
    cover: '/covers/blue-ocean-strategy.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/e653b0a4-73ed-47d6-9367-3af99095c033_1788236787.png',
    snapped: false,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    cover: '/covers/educated.jpg',
    source: 'https://be.booksnap.ai/uploads/books/covers/f79bd143-b77f-432a-86ba-04f825c7cd39_1779769983.png',
    snapped: false,
  },
]
