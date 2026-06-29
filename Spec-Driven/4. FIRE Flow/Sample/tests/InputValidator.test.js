/**
 * Unit tests for InputValidator class.
 * Tests numeric parsing and range validation.
 * Requirements: 1.2, 1.3
 */

const InputValidator = require('../src/InputValidator.js');

describe('InputValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new InputValidator();
  });

  describe('validateNumber', () => {
    describe('Valid inputs', () => {
      test('accepts integer 2', () => {
        const result = validator.validateNumber('2');
        expect(result.valid).toBe(true);
        expect(result.value).toBe(2);
      });

      test('accepts integer 10', () => {
        const result = validator.validateNumber('10');
        expect(result.valid).toBe(true);
        expect(result.value).toBe(10);
      });

      test('accepts integer 100', () => {
        const result = validator.validateNumber('100');
        expect(result.valid).toBe(true);
        expect(result.value).toBe(100);
      });

      test('accepts integer 1000', () => {
        const result = validator.validateNumber('1000');
        expect(result.valid).toBe(true);
        expect(result.value).toBe(1000);
      });

      test('accepts integer 1000000', () => {
        const result = validator.validateNumber('1000000');
        expect(result.valid).toBe(true);
        expect(result.value).toBe(1000000);
      });

      test('trims whitespace', () => {
        const result = validator.validateNumber('  50  ');
        expect(result.valid).toBe(true);
        expect(result.value).toBe(50);
      });
    });

    describe('Invalid inputs', () => {
      test('rejects empty string', () => {
        const result = validator.validateNumber('');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Please enter a number');
      });

      test('rejects whitespace-only string', () => {
        const result = validator.validateNumber('   ');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Please enter a number');
      });

      test('rejects non-numeric string', () => {
        const result = validator.validateNumber('abc');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Please enter a valid number');
      });

      test('rejects decimal number', () => {
        const result = validator.validateNumber('50.5');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('whole number');
      });

      test('rejects null', () => {
        const result = validator.validateNumber(null);
        expect(result.valid).toBe(false);
      });

      test('rejects undefined', () => {
        const result = validator.validateNumber(undefined);
        expect(result.valid).toBe(false);
      });

      test('rejects mixed alphanumeric', () => {
        const result = validator.validateNumber('123abc');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Please enter a valid number');
      });
    });
  });

  describe('validateRange', () => {
    describe('Valid ranges', () => {
      test('accepts minimum value 2', () => {
        const result = validator.validateRange(2);
        expect(result.valid).toBe(true);
      });

      test('accepts mid-range value 100', () => {
        const result = validator.validateRange(100);
        expect(result.valid).toBe(true);
      });

      test('accepts maximum value 1000000', () => {
        const result = validator.validateRange(1000000);
        expect(result.valid).toBe(true);
      });
    });

    describe('Below minimum', () => {
      test('rejects 0', () => {
        const result = validator.validateRange(0);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Minimum');
      });

      test('rejects 1', () => {
        const result = validator.validateRange(1);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Minimum');
      });

      test('rejects negative numbers', () => {
        const result = validator.validateRange(-5);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Minimum');
      });
    });

    describe('Above maximum', () => {
      test('rejects 1000001', () => {
        const result = validator.validateRange(1000001);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Maximum');
      });

      test('rejects very large number', () => {
        const result = validator.validateRange(10000000);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Maximum');
      });
    });
  });

  describe('Integration: validateNumber + validateRange', () => {
    test('validates valid input completely', () => {
      const numResult = validator.validateNumber('100');
      expect(numResult.valid).toBe(true);

      const rangeResult = validator.validateRange(numResult.value);
      expect(rangeResult.valid).toBe(true);
    });

    test('detects number error before range check', () => {
      const numResult = validator.validateNumber('abc');
      expect(numResult.valid).toBe(false);
    });

    test('detects range error after number check', () => {
      const numResult = validator.validateNumber('1');
      expect(numResult.valid).toBe(true);

      const rangeResult = validator.validateRange(numResult.value);
      expect(rangeResult.valid).toBe(false);
    });
  });
});
