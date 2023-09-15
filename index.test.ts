import { describe, expect, it } from "bun:test";
import { BigRational } from ".";

describe("BigRational", () => {
  // Creating a new BigRational object with valid numerator and denominator
  it("should create a new BigRational object with valid numerator and denominator", () => {
    const numerator = 5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });
});

describe("BigRational", () => {
  // Getting numerator and denominator of a BigRational object
  it("should return the correct numerator and denominator", () => {
    const numerator = 5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });

  // Reducing a BigRational object
  it("should reduce a BigRational object when called", () => {
    const numerator = 10n;
    const denominator = 20n;
    const bigRational = new BigRational(numerator, denominator);

    const reducedBigRational = bigRational.reduce();

    expect(reducedBigRational.getNumerator()).toBe(1n);
    expect(reducedBigRational.getDenominator()).toBe(2n);
  });

  // Adding two BigRational objects
  it("should add two BigRational objects when called", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 3n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    const expectedResult = new BigRational(
      numerator1 * denominator2 + numerator2 * denominator1,
      denominator1 * denominator2
    );

    const result = bigRational1.add(bigRational2);

    expect(result.getNumerator()).toBe(expectedResult.getNumerator());
    expect(result.getDenominator()).toBe(expectedResult.getDenominator());
  });

  // Subtracting two BigRational objects
  it("should subtract two BigRational objects when called", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 3n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    const result = bigRational1.subtract(bigRational2);

    const expectedNumerator =
      numerator1 * denominator2 - numerator2 * denominator1;
    const expectedDenominator = denominator1 * denominator2;
    const expected = new BigRational(expectedNumerator, expectedDenominator);

    expect(result.getNumerator()).toBe(expected.getNumerator());
    expect(result.getDenominator()).toBe(expected.getDenominator());
  });

  // Multiplying two BigRational objects
  it("should multiply two BigRational objects when called", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 3n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    const expectedResult = new BigRational(
      numerator1 * numerator2,
      denominator1 * denominator2
    );
    const result = bigRational1.mul(bigRational2);

    expect(result.getNumerator()).toBe(expectedResult.getNumerator());
    expect(result.getDenominator()).toBe(expectedResult.getDenominator());
  });

  // Dividing two BigRational objects
  it("should divide two BigRational objects when dividing", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 3n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    const result = bigRational1.div(bigRational2);

    expect(result.getNumerator()).toBe(numerator1 * denominator2);
    expect(result.getDenominator()).toBe(denominator1 * numerator2);
  });

  // Getting inverse of a BigRational object
  it("should return the inverse of a BigRational object", () => {
    const numerator = 5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    const inverse = bigRational.inverse();

    expect(inverse.getNumerator()).toBe(denominator);
    expect(inverse.getDenominator()).toBe(numerator);
  });

  // Getting negation of a BigRational object
  it("should return the negation of the BigRational object", () => {
    const numerator = 5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    const negation = bigRational.negate();

    expect(negation.getNumerator()).toBe(-numerator);
    expect(negation.getDenominator()).toBe(denominator);
  });

  // Checking if a BigRational object is positive
  it("should return false when the numerator and denominator have opposite signs", () => {
    const numerator = -5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.isPositive()).toBe(false);
  });

  // Checking if a BigRational object is negative
  it("should return true when the numerator is negative and the denominator is positive", () => {
    const numerator = -5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.isNegative()).toBe(true);
  });

  // Comparing two BigRational objects for equality
  it("should compare two BigRational objects for equality", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 10n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    expect(bigRational1.eq(bigRational2)).toBe(true);
  });

  // Comparing two BigRational objects for less than or equal to
  it("should compare two BigRational objects for less than or equal to", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 3n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    expect(bigRational1.lte(bigRational2)).toBe(false);
    expect(bigRational2.lte(bigRational1)).toBe(true);
    expect(bigRational1.lte(bigRational1)).toBe(true);
  });

  // Comparing two BigRational objects for greater than or equal to
  it("should compare two BigRational objects for greater than or equal to", () => {
    const numerator1 = 5n;
    const denominator1 = 2n;
    const bigRational1 = new BigRational(numerator1, denominator1);

    const numerator2 = 3n;
    const denominator2 = 4n;
    const bigRational2 = new BigRational(numerator2, denominator2);

    expect(bigRational1.gte(bigRational2)).toBe(true);
  });

  // Creating a new BigRational object with denominator as 0
  it("should throw an error when creating a new BigRational object with denominator as 0", () => {
    const numerator = 5n;
    const denominator = 0n;

    expect(() => new BigRational(numerator, denominator)).toThrow(
      "Denominator can't be zero"
    );
  });

  // Creating a new BigRational object with numerator as 0
  it("should create a new BigRational object with numerator as 0", () => {
    const numerator = 0n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });

  // Dividing a BigRational object by 0
  it("should throw an error when dividing a BigRational object by 0", () => {
    const numerator = 5n;
    const denominator = 0n;
    expect(() => new BigRational(numerator, denominator)).toThrow(
      "Denominator can't be zero"
    );
  });

  // Dividing a BigRational object by another BigRational object that has numerator as 0
  it("should throw an error when dividing by a BigRational object with numerator as 0", () => {
    const numerator = 0n;
    const denominator = 5n;
    const bigRational1 = new BigRational(numerator, denominator);
    const bigRational2 = new BigRational(2n, 3n);

    expect(() => bigRational2.div(bigRational1)).toThrow(
      "Denominator can't be zero"
    );
  });

  // Creating a new BigRational object with numerator and denominator as negative numbers
  it("should create a new BigRational object with numerator and denominator as negative numbers", () => {
    const numerator = -5n;
    const denominator = -2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });

  // Creating a new BigRational object with numerator and denominator as positive numbers
  it("should create a new BigRational object with valid numerator and denominator", () => {
    const numerator = 5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });

  // Creating a new BigRational object with numerator as negative and denominator as positive number
  it("should create a new BigRational object with numerator as negative and denominator as positive number", () => {
    const numerator = -5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });

  // Creating a new BigRational object with numerator as positive and denominator as negative number
  it("should create a new BigRational object with numerator as positive and denominator as negative number", () => {
    const numerator = 5n;
    const denominator = -2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.getNumerator()).toBe(numerator);
    expect(bigRational.getDenominator()).toBe(denominator);
  });

  // Getting string representation of a BigRational object
  it("should return the string representation of the BigRational object", () => {
    const numerator = 5n;
    const denominator = 2n;
    const bigRational = new BigRational(numerator, denominator);

    expect(bigRational.toString()).toBe(`${numerator} / ${denominator}`);
  });
});
