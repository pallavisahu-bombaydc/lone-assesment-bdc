# LoanReady

A 3-minute **Loan Readiness Check** for self-employed customers of a mid-sized NBFC.

> Know what you may qualify for before you apply.

This prototype is **help first, not a loan form**. It shows an indicative range, the documents to keep ready, and what happens next — without claiming guaranteed approval or running a credit enquiry.

## The problem

Self-employed users often drop off digital loan journeys because they:

- do not know whether they are eligible
- cannot see how much they may borrow
- are unsure which documents are needed now vs later
- do not trust what happens after they submit details
- feel they are filling a form instead of getting help

**LoanReady** addresses that before a formal application.

## What it does

1. **Business** — occupation (shop, contractor, freelancer, professional, and similar) and how long the work has been running. Products in this check: **Business / MSME** and **Loan Against Property**.
2. **Income** — average monthly revenue, expenses, and existing EMI.
3. **Result** — indicative range, example monthly plans, and a next step: **Apply now**, **Wait**, or **Talk first**.
4. **Documents** — readiness as **Needed**, **Ready**, or **May be later**, driven by checklist ticks.
5. **Next** — what happens after apply, lead capture, shareable summary, and a **demo** application tracker.

Also included: Hindi / English, save progress on this device, what-if sliders on the result, and a Loan Assistant with short answers.

**Demo profile:** Rahul, 36, interior contractor, 5+ years in business. Use **Try a demo profile** on the home page to see a sample result without filling the form.

## Run locally

Needs [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

```bash
npm run build    # production build
npm run preview  # preview the build
```

## Stack

React 19, Vite, JavaScript (no TypeScript), React Router, Tailwind CSS. Eligibility, documents, and tracking use **local mock data** only. Progress is stored in `localStorage` on this device.

## Prototype limits

- Estimates are **indicative**. Final eligibility depends on verification and lending criteria.
- No live CIBIL / bureau pull, no banking APIs, and nothing is sent to a real lender.
- The application tracker is a **demo**. Attachments store **file name only**.

## Principle

Do not make customers apply to discover whether they should apply.
