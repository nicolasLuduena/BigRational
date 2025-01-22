# BigRational

[![npm version](https://badge.fury.io/js/big-rational-ts.svg)](https://badge.fury.io/js/big-rational-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript library for representing and manipulating rational numbers using `bigint`. Rational numbers are numbers that can be expressed as the quotient of two integers (numerator/denominator).

## Features

- **Precision**: Handles arbitrarily large numbers using `bigint`.
- **Arithmetic operations**: Addition, subtraction, multiplication, division, and negation.
- **Comparison operations**: `<`, `<=`, `>`, `>=`, `==`.
- **Simplification**: Automatically simplifies rational numbers to their reduced form.
- **Utilities**: Absolute value, reciprocal, conversion to string, and more.

## Installation

Install the package using npm:

```bash
npm install big-rational-ts
```
## Usage
```typescript
import { BigRational } from 'big-rational-ts';

// Create rational numbers
const r1 = new BigRational(3n, 4n);  // Represents 3/4
const r2 = new BigRational(5n, 6n);  // Represents 5/6

// Basic operations
const sum = r1.add(r2);             // 19/12
const difference = r1.subtract(r2);  // -1/12
const product = r1.mul(r2);          // 15/24 or simplified to 5/8
const quotient = r1.div(r2);         // 9/10

// Simplify a fraction
const simplified = product.reduce(); // 5/8

// Comparison
const isLess = r1.lt(r2);    // true
const isEqual = r1.eq(r2);   // false
const isGreater = r1.gt(r2); // false

// Utilities
const absoluteValue = r1.abs();  // 3/4
const inverse = r1.inverse();    // 4/3
const negation = r1.negate();    // -3/4

// String representation
console.log(r1.toString());  // "3 / 4"
```
