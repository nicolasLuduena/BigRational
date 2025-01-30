import { gcd } from "big-integer";

/**
 * Class representing a mathematical rational number. A rational is a number that can
 * be expressed as the quotient of two integers. Each rational number `a/b` is associated
 * with two integers, a numerator `a` and a denominator `b` such as `b ≠ 0`.
 */
export class BigRational {
  declare private numerator: bigint;
  declare private denominator: bigint;

  /**
   * Creates a BigRational object.
   *
   * @param {bigint} numerator - The numerator of the rational number.
   * @param {bigint} denominator - The denominator of the rational number.
   * @throws Will throw an error if the denominator is zero.
   */
  constructor(numerator: bigint, denominator: bigint) {
    if (denominator === 0n) {
      throw new Error("Denominator can't be zero");
    }
    this.numerator = numerator;
    this.denominator = denominator;
    return this;
  }

  /**
   * Returns the absolute value of the current instance.
   *
   * @returns {BigRational} The absolute value of the current instance.
   */
  abs(): BigRational {
    const abs = (n: bigint) => (n >= 0n ? n : -n);
    return new BigRational(abs(this.numerator), abs(this.denominator));
  }

  /**
   * Returns a new BigRational object that represents the negation of the current instance.
   * In simpler terms, it changes the sign of the numerator, allowing the representation of negative fractions.
   * For example, if the current instance represents the fraction 3/4, the negate method would return a new BigRational object representing -3/4.
   *
   * @returns {BigRational} A new BigRational object representing the negation of the current instance.
   */
  negate(): BigRational {
    return new BigRational(-this.numerator, this.denominator);
  }

  /**
   * Returns a new BigRational object that represents the sum of the current instance and the provided BigRational number.
   *
   * This is performed by finding a common denominator, which is the product of the denominator of the current instance and the denominator
   * of the provided BigRational number. The resulting numerator is the sum of the product of the numerator of the provided BigRational
   * number and the denominator of the original number, and the product of the denominator of the provided BigRational number
   * and the numerator of the original number.
   *
   * @param {BigRational} a - The BigRational number to be added.
   * @returns {BigRational} - A new BigRational object representing the sum of the current instance and the provided BigRational number.
   */
  add(a: BigRational): BigRational {
    const [numerator, denominator] = a.toPair();
    const resultingNumerator = numerator * this.denominator + this.numerator * denominator;

    const resultingDenominator = this.denominator * denominator;
    return new BigRational(resultingNumerator, resultingDenominator);
  }

  /**
   * Returns a new BigRational object that represents the difference between the current instance and the provided BigRational number.
   *
   * It uses the 'add' method of the current instance and the negation of the provided BigRational number to perform the subtraction.
   *
   * @param {BigRational} a - The BigRational number to be subtracted.
   * @returns {BigRational} A new BigRational object representing the difference.
   */
  subtract(a: BigRational): BigRational {
    return this.add(a.negate());
  }

  /**
   * Returns a new BigRational object that represents the inverse (also known as the reciprocal) of the current instance.
   *
   * The numerator and denominator are swapped to get the reciprocal. For instance, the inverse of 2/3 would be 3/2.
   *
   * @returns {BigRational} A new BigRational object representing the inverse of the current instance.
   */
  inverse(): BigRational {
    return new BigRational(this.denominator, this.numerator);
  }

  /**
   * Returns a new BigRational object that represents the product of the current instance and the provided BigRational number.
   *
   * This is achieved by multiplying the numerators together for the new numerator, and the denominators for the new denominator.
   *
   * @param {BigRational} a - The BigRational number to be multiplied.
   * @returns {BigRational} A new BigRational object representing the product of the two numbers.
   */
  mul(a: BigRational): BigRational {
    return new BigRational(a.numerator * this.numerator, a.denominator * this.denominator);
  }

  /**
   * Returns a new BigRational object that represents the quotient of the current instance divided by the provided BigRational number.
   *
   * This is achieved by multiplying the current instance by the inverse of the provided BigRational number.
   *
   * @param {BigRational} a - The BigRational number to divide the current instance by.
   * @returns {BigRational} A new BigRational object representing the quotient of the two numbers.
   */
  div(a: BigRational): BigRational {
    return this.mul(a.inverse());
  }

  /**
   * Returns the numerator of the current instance.
   *
   * @returns {bigint} The numerator of the instance.
   */
  getNumerator(): bigint {
    return this.numerator;
  }

  /**
   * Returns the denominator of the current instance.
   *
   * @returns {bigint} The denominator of the instance.
   */
  getDenominator(): bigint {
    return this.denominator;
  }

  /**
   * Returns the numerator and denominator of the current instance in an array.
   *
   * @returns {[bigint, bigint]} An array where the first element is the numerator and the second element is the denominator.
   */
  toPair(): [bigint, bigint] {
    return [this.numerator, this.denominator];
  }

  /**
   * Checks if the current BigRational number is less than or equal to the provided BigRational number 'a'.
   *
   * This is computed by cross-multiplying the fractions and comparing them. Specifically, it checks if the
   * product of the current instance's numerator and 'a's denominator is less than or equal to the product of 'a's numerator
   * and the current instance's denominator. In case any one of the fractions has a denominator less than zero, it checks if the
   * product of the current instance's numerator and 'a's denominator is greater than or equal to the product of 'a's numerator
   * and the current instance's denominator.
   *
   * @param {BigRational} a - The BigRational number to compare to.
   * @returns {boolean} Returns true if the current instance is less than or equal to 'a', and false otherwise.
   */
  lte(a: BigRational): boolean {
    const [numerator, denominator] = a.toPair();

    const crossMultiplicationNegative =
      (denominator > 0n && this.denominator < 0n) || (denominator < 0n && this.denominator > 0n);

    if (crossMultiplicationNegative) {
      return this.numerator * denominator >= numerator * this.denominator;
    }
    return this.numerator * denominator <= numerator * this.denominator;
  }

  /**
   * Checks if the current BigRational number is less than the provided BigRational number 'a'.
   *
   * This is computed using the less than or equal to (`lte`) method of this class. A number is less than another if it's less than or equal to 'a' and 'a' is not less than or equal to it.
   *
   * @param {BigRational} a - The BigRational number to compare to.
   * @returns {boolean} Returns true if the current instance is less than 'a', and false otherwise.
   */
  lt(a: BigRational): boolean {
    return this.lte(a) && !a.lte(this);
  }

  /**
   * Checks if the current BigRational number is equal to the provided BigRational number 'a'.
   *
   * This is computed using the less than or equal to (`lte`) method of this class. A number is equal to another if it's less than or equal to 'a' and 'a' is less than or equal to it as well.
   *
   * @param {BigRational} a - The BigRational number to compare to.
   * @returns {boolean} Returns true if the current instance is equal to 'a', and false otherwise.
   */
  eq(a: BigRational): boolean {
    return this.lte(a) && a.lte(this);
  }

  /**
   * Checks if the current BigRational number is greater than or equal to the provided BigRational number 'a'.
   *
   * This is computed using the less than or equal to (`lte`) method of this class. A number is greater than or equal to another if 'a' is less than or equal to it.
   *
   * @param {BigRational} a - The BigRational number to compare to.
   * @returns {boolean} Returns true if the current instance is greater than or equal to 'a', and false otherwise.
   */
  gte(a: BigRational): boolean {
    return a.lte(this);
  }

  /**
   * Checks if the current BigRational number is greater than the provided BigRational number 'a'.
   *
   * This is computed using the less than (`lt`) method of this class. A number is greater than another if 'a' is less than it.
   *
   * @param {BigRational} a - The BigRational number to compare to.
   * @returns {boolean} Returns true if the current instance is greater than 'a', and false otherwise.
   */
  gt(a: BigRational): boolean {
    return a.lt(this);
  }

  /**
   * Returns a simplified version of the current BigRational instance.
   *
   * The simplification is performed by computing the greatest common divisor (gcd) of the numerator and denominator,
   * and then dividing the numerator and denominator by their gcd. The division of bigint numbers in TypeScript computes
   * the floor of the resulting quotient, ensuring the numerator and denominator are immediately reduced to their simplest form.
   *
   * @returns {BigRational} A new BigRational object that represents the simplified version of the current BigRational instance.
   */
  public reduce(): BigRational {
    const [numerator, denominator] = this.toPair();

    const divisor = BigRational.gcd(numerator, denominator);
    return new BigRational(numerator / divisor, denominator / divisor);
  }

  /**
   *  Returns the greatest common divisor (gcd) of two BigInt numbers 'a' and 'b'.
   *
   *  This static method employs the gcd function (provided by `big-integer`) to find the gcd of 'a' and 'b'.
   *
   * @param {bigint} a - The first number to compute the gcd of.
   * @param {bigint} b - The second number to compute the gcd of.
   * @returns {bigint} The greatest common divisor (gcd) of 'a' and 'b'.
   */
  private static gcd(a: bigint, b: bigint): bigint {
    return BigInt(gcd(a, b).toString());
  }

  /**
   * Returns a string representation of the current BigRational instance.
   *
   * This method represents the BigRational object as a string in the format "numerator / denominator".
   *
   * @returns {string} A string in the format "numerator / denominator", representing the current BigRational instance.
   */
  toString(): string {
    return `${this.numerator} / ${this.denominator}`;
  }

  /**
   *  Checks if the current BigRational instance is a positive number.
   *
   *  In accordance with the rules of maths, a rational number is considered positive if and only if either
   *  both the numerator and the denominator are positive or both are negative. This is because a negative
   *  divided by a negative gives a positive number.
   *
   * @returns {boolean} Returns true if the current BigRational number is positive, and false otherwise.
   */
  isPositive(): boolean {
    return (this.numerator > 0n && this.denominator > 0n) || (this.numerator < 0n && this.denominator < 0n);
  }

  /**
   *  Checks if the current BigRational instance represents a negative number.
   *
   *  This is determined by two conditions: first, the numerator should not be zero; second, evaluating the `isPositive`
   *  method for the instance should return false. It means that a BigRational number is considered negative if it's not
   *  zero and not positive.
   *
   * @returns {boolean} Returns true if the current BigRational number is negative, and false otherwise.
   */
  isNegative(): boolean {
    return this.numerator !== 0n && !this.isPositive();
  }
}
