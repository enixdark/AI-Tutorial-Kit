# Tech Stack

## Overview

CLI tool for calculating sums of prime numbers, built with bare Python for direct control and simplicity.

## Languages

Python (3.9+)

Rationale: Excellent for algorithmic problems like prime number calculations. Rich math libraries available (sympy for advanced needs), fast iteration, and simple distribution.

## Framework

Bare Python

Rationale: No framework overhead needed for CLI tool. Direct argument handling via sys.argv or manual parsing. Maximum control and minimal dependencies.

## Package Manager

pip

Rationale: Standard Python package manager. Simple requirements.txt for dependency tracking. Works everywhere Python is installed.

## Authentication

N/A

No authentication requirements for CLI tool.

## Infrastructure & Deployment

Single Python script

Rationale: User runs script directly: `python prime_calculator.py [args]`. No server, no deployment infrastructure needed. Portable across platforms where Python is available.

## Decision Relationships

- Bare Python means no framework lock-in; can add frameworks later if needs evolve
- pip + requirements.txt enables reproducible environments
- Single-file distribution keeps deployment simple
