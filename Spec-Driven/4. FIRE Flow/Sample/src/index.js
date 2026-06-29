/**
 * Main entry point for Prime Calculator application.
 * Initializes all components and sets up event handlers.
 * Requirements: 6.1, 6.2, 6.3 (UI and initialization)
 */

// Initialize components
const validator = new InputValidator();
const calculator = new PrimeCalculator();
const storage = new StorageManager();
const history = new HistoryManager();
const display = new DisplayManager();

/**
 * Initialize app on page load.
 * Load history and set up event listeners.
 */
function initializeApp() {
  // Load history from storage
  history.loadFromStorage();

  // Display initial history
  const allHistory = history.getAll();
  if (allHistory.length > 0) {
    display.showHistory(allHistory);
  }

  // Set up event listeners
  const form = document.getElementById('calculatorForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  const toggleBtn = document.getElementById('togglePrimesBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', handleTogglePrimeList);
  }

  const clearBtn = document.getElementById('clearHistoryBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', handleClearHistory);
  }
}

/**
 * Handle form submission.
 * Validates input, calculates primes, saves result, displays output.
 */
function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById('rangeInput');
  const rangeValue = input.value.trim();

  // Validate input
  const validation = validator.validateNumber(rangeValue);
  if (!validation.valid) {
    display.showError(validation.error);
    return;
  }

  const rangeValidation = validator.validateRange(validation.value);
  if (!rangeValidation.valid) {
    display.showError(rangeValidation.error);
    return;
  }

  // Clear previous errors
  display.clearResults();
  display.showError(''); // Clear error if exists

  // Show loading state
  display.showLoading(true);

  try {
    const range = validation.value;
    const startTime = performance.now();

    // Calculate primes
    const result = calculator.calculateCount(range);
    const endTime = performance.now();

    // Create calculation result
    const calculationResult = {
      id: generateUUID(),
      range: range,
      primeCount: result,
      timestamp: Date.now(),
      computeTimeMs: Math.round(endTime - startTime)
    };

    // Save to history
    history.add(calculationResult);

    // Display result
    display.showResult(calculationResult);
    display.showHistory(history.getAll());

    // Clear input
    input.value = '';
  } catch (error) {
    display.showError('Calculation failed: ' + error.message);
  } finally {
    display.showLoading(false);
  }
}

/**
 * Handle toggle of prime list display.
 */
function handleTogglePrimeList() {
  const container = document.getElementById('primeListContainer');
  const btn = document.getElementById('togglePrimesBtn');

  if (container.style.display === 'none') {
    // Calculate full prime list and show
    const rangeSpan = document.getElementById('resultRange');
    const range = parseInt(rangeSpan.textContent);

    if (!isNaN(range)) {
      const result = calculator.calculatePrimes(range);
      display.showPrimeList(result.primes);
      container.style.display = 'block';
      btn.textContent = 'Hide Prime List';
    }
  } else {
    container.style.display = 'none';
    btn.textContent = 'Show Prime List';
  }
}

/**
 * Handle history item selection.
 */
function handleHistorySelect(id) {
  const result = history.getById(id);
  if (result) {
    display.showResult(result);
  }
}

/**
 * Handle history item deletion.
 */
function handleHistoryDelete(id, e) {
  if (e) {
    e.stopPropagation();
  }

  history.delete(id);
  display.showHistory(history.getAll());
}

/**
 * Handle clear all history.
 */
function handleClearHistory() {
  if (confirm('Are you sure you want to delete all calculation history? This cannot be undone.')) {
    storage.clearHistory();
    history.loadFromStorage(); // Reload (will be empty)
    display.showHistory([]);
  }
}

/**
 * Generate UUID v4.
 * Simple UUID generator for result IDs.
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
