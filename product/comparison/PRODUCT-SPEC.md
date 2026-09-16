# Vehicle comparison — rough product specification

## Problem

A reviewer currently opens vehicle inspections one at a time. We want a separate page for comparing a small selection without losing their place.

## Proposed feature

Choose vehicles, compare vehicle facts and inspection information side by side, and save a named Comparison Report. Find saved reports on the comparison page and open one later.

Use the existing sample records. There is no price, valuation or recommendation data in this project. Preserve the existing search, inspection and report pages.

## Decisions for engineering and product

- How many vehicles can be selected? What if a vehicle is selected twice?
- Which facts and inspection details belong in the comparison? How should missing information look?
- What makes a report name valid? Can two reports share a name?
- Does a saved report preserve what the reviewer saw or reflect later data changes?
- What survives reload and server restart? What can be changed after saving?

The mock-up does not settle these questions. Agree on behavior and acceptance checks before implementation.
