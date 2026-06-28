# Implementation Plan

- [ ] 1. Set up project structure and core interfaces
  - Create `src/` directory for source code
  - Create `tests/` directory for test files
  - Create `index.html` with basic form structure (input field, submit button, results container, history container)
  - Create `src/styles.css` for styling
  - Create `src/index.js` as main entry point
  - Set up `package.json` with Jest for testing
  - Define TypeScript-style interface comments for all classes
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 2. Implement InputValidator class
- [ ] 2.1 Create `src/InputValidator.js`
  - Implement `validateNumber(input)` method: parse input, check non-empty and numeric
  - Implement `validateRange(num)` method: check num >= 2 and <= 1,000,000
  - Return object with `{valid, value, error}` structure
  - _Requirements: 1.2, 1.3, 1.4_

- [ ]* 2.2 Write unit tests for InputValidator
  - Create `tests/InputValidator.test.js`
  - Test valid inputs (2, 10, 100, 1000, 1000000)
  - Test boundary cases (1, 0, -5, 1000001)
  - Test non-numeric inputs ("abc", "", null)
  - Test error messages are clear
  - _Requirements: 1.2, 1.3_

- [ ] 3. Implement PrimeCalculator class
- [ ] 3.1 Create `src/PrimeCalculator.js`
  - Implement Sieve of Eratosthenes algorithm in `calculatePrimes(max)` method
  - Return object with `{count, primes}` where primes array is sorted ascending
  - Implement `calculateCount(max)` method as optimized version (returns only count)
  - Include performance guard: if computation takes > 10 seconds, throw error
  - _Requirements: 2.1, 2.2, 2.4_

- [ ]* 3.2 Write unit tests for PrimeCalculator
  - Create `tests/PrimeCalculator.test.js`
  - Test small ranges (2, 10, 20) with known expected results
  - Test medium ranges (100, 1000) against known prime lists
  - Test edge case: range 2 returns [2] with count 1
  - Test large range (100000) completes in reasonable time
  - _Requirements: 2.1, 2.2_

- [ ] 4. Implement StorageManager class
- [ ] 4.1 Create `src/StorageManager.js`
  - Implement `saveResult(result)` method: JSON stringify and write to localStorage under key `prime-calculator-history`
  - Implement `getHistory()` method: read and parse JSON from localStorage, return array
  - Implement `deleteResult(id)` method: filter out result by id, save updated array
  - Implement `clearHistory()` method: remove entire localStorage key
  - Implement `isAvailable()` method: check if localStorage exists and is writable
  - Handle quota exceeded error: catch `QuotaExceededError`, delete oldest item, retry save
  - _Requirements: 4.1, 4.2, 5.4, 5.1_

- [ ]* 4.2 Write unit tests for StorageManager
  - Create `tests/StorageManager.test.js`
  - Mock localStorage for testing
  - Test save and retrieve single result
  - Test save and retrieve multiple results
  - Test delete removes correct result
  - Test clearHistory removes all results
  - Test isAvailable handles missing localStorage
  - _Requirements: 4.1, 4.2_

- [ ] 5. Checkpoint - Verify all tests pass
  - Run `npm test` for InputValidator, PrimeCalculator, StorageManager tests
  - Address any test failures before continuing
  - All unit tests must pass (3/3 test files)

- [ ] 6. Implement HistoryManager class
- [ ] 6.1 Create `src/HistoryManager.js`
  - Maintain internal state: array of CalculationResult objects
  - Implement `add(result)` method: add to beginning of array, keep max 10 items, persist to StorageManager
  - Implement `getAll()` method: return all items in order (newest first)
  - Implement `delete(id)` method: remove by id, persist to StorageManager
  - Implement `getById(id)` method: find and return specific result or null
  - Implement `loadFromStorage()` method: retrieve history from StorageManager on initialization
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 6.2 Write unit tests for HistoryManager
  - Create `tests/HistoryManager.test.js`
  - Test add stores new result
  - Test add maintains max 10 items
  - Test delete removes correct item
  - Test getById returns correct result
  - Test getAll returns items in correct order
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 7. Implement DisplayManager class
- [ ] 7.1 Create `src/DisplayManager.js`
  - Implement `showResult(result)` method: update DOM with `primeCount`, `range`, `timestamp`, `computeTimeMs`
  - Implement `showPrimeList(primes)` method: create and insert list element with all primes (hidden by default, toggle on demand)
  - Implement `showHistory(results)` method: render list of previous results with delete buttons
  - Implement `showLoading(show)` method: show/hide loading spinner
  - Implement `showError(message)` method: display error banner in red
  - Implement `clearResults()` method: clear all result displays
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3_

- [ ]* 7.2 Write integration tests for DisplayManager
  - Create `tests/DisplayManager.integration.test.js`
  - Test showing result updates DOM correctly
  - Test history rendering displays all items
  - Test error display appears with message
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 8. Checkpoint - Verify all tests pass
  - Run `npm test` for all test files (InputValidator, PrimeCalculator, StorageManager, HistoryManager, DisplayManager)
  - Address any test failures before continuing
  - All unit and integration tests must pass

- [ ] 9. Wire components together in main flow
- [ ] 9.1 Create event handlers in `src/index.js`
  - Initialize InputValidator, PrimeCalculator, StorageManager, HistoryManager, DisplayManager
  - Attach `handleSubmit` listener to form: validate input → calculate → save → display
  - Attach `handleHistorySelect` listener: select from history → display result
  - Attach `handleHistoryDelete` listener: delete from history → update display
  - Attach `handleTogglePrimeList` listener: show/hide full prime list
  - Attach `handleClearHistory` listener: clear all history with confirmation
  - _Requirements: 2.1, 2.2, 3.1, 4.1, 5.1, 5.2, 5.3_

- [ ] 9.2 Implement error handling flow
  - Add try-catch around calculation: if error → show error message, prevent addition to history
  - Add localStorage unavailable handling: catch in StorageManager.isAvailable() → warn user, continue without saving
  - Add input validation error handling: show validation message near input field
  - _Requirements: 1.2, 2.4, 4.3, 4.1_

- [ ] 9.3 Initialize app on page load
  - Load history from StorageManager when page loads
  - Display previous results if history exists
  - Display empty state message if no history
  - Set up event listeners for all user interactions
  - _Requirements: 5.1, 5.2, 3.4_

- [ ] 10. Checkpoint - Full application integration
  - Run `npm test` to verify all tests pass
  - Open `index.html` in browser
  - Manually test: enter number → calculation → result displays → result appears in history
  - Manually test: refresh page → previous history appears
  - Manually test: delete result from history → updates immediately
  - Manually test: error cases (empty input, invalid number, number < 2)

- [ ] 11. Implement edge case handling and optimizations
- [ ] 11.1 Optimize large calculations
  - Add progress indication for ranges > 10,000 (update loading message with estimated progress)
  - Break calculation into chunks if needed to prevent UI blocking
  - _Requirements: 2.2, 2.3_

- [ ] 11.2 Handle storage quota issues
  - Implement automatic cleanup: if save fails with quota exceeded, delete oldest 2 items and retry
  - Test with mock localStorage quota exceeded scenario
  - _Requirements: 4.2, 4.3_

- [ ] 11.3 Improve error recovery
  - Add explicit error message for localStorage unavailable
  - Add "Retry" button for failed calculations
  - Test graceful degradation without localStorage
  - _Requirements: 4.3, 5.4_

- [ ] 12. Final Checkpoint - Verify complete implementation
  - Run full test suite: `npm test` - all tests pass
  - Verify all requirements covered:
    - Requirement 1: Input range validation (tasks 2.1)
    - Requirement 2: Calculate prime count (tasks 3.1)
    - Requirement 3: Display results (tasks 7.1)
    - Requirement 4: Save calculations (tasks 4.1, 6.1)
    - Requirement 5: Calculation history (tasks 6.1, 7.1)
    - Requirement 6: User interface (tasks 1, 7.1, 9.1)
  - Verify all acceptance criteria can be tested manually
  - Check no code is orphaned or unused
