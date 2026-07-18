# Roadmap

This document tracks the planned evolution of Frakx Services Store, versioned
alongside Angular's major releases. Each milestone is scoped around what the
codebase actually needs next — not just a version-number relabeling of
features that already exist.

## Angular 17 — Foundation & Catalog *(current)*

- [ ] Fix the "Add to Cart" bug (currently adds the same product regardless of which one is selected)
- [ ] Finish core cart actions: add, remove, update quantity, view running total
- [x] Rebrand catalog to the 4 new service categories (Gastronomy, Software Development, Multimedia Production, Drone Services)
- [ ] Polish product listing and detail pages

## Angular 18 — Real Auth & Order History

- [ ] Harden authentication: move off plain-text password storage in `db.json` toward a properly hashed/mocked auth flow
- [ ] Tie orders to the logged-in `userId` (field already exists in the data model, not yet enforced end-to-end)
- [ ] Basic order history page so users can see what they've booked

## Angular 19 — Payment Integration

- [ ] Remove plain-text card data (`cardNumber`, `expiryDate`, `cvv`) currently stored in `db.json`
- [ ] Integrate a test-mode payment gateway (Stripe test mode)
- [ ] Add order confirmation / receipt flow

## Angular 20 — Admin Space Enhancements

- [ ] Expand existing admin CRUD panel with order management (view/update order status)
- [ ] Basic sales dashboard: revenue by category, low-stock alerts
- [ ] Confirm `auth.guard.ts` actually blocks non-admin routes server-side, not just hides UI elements

## Angular 21 / 22 — Framework Upgrade

- [ ] Sequentially upgrade the project through `ng update` (17 → 18 → 19 → 20 → 21 → 22), verifying build and functionality at each step — Angular does not support skipping major versions
- [ ] Adopt relevant modern features as they stabilize (e.g. signal-based components, zoneless change detection) where they meaningfully simplify existing code

---

**Note:** version numbers above track Angular's release cadence for
documentation purposes. A feature is only marked complete once implemented
and verified in the actual codebase.
