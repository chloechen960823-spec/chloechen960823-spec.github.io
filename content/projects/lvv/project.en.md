# LVV Cross-border Shipping iPad System

> Status: v0.1 synchronized draft  
> Source of truth: `project.zh-CN.md`  
> Last updated: 2026-07-16

## Project record

| Field | Current information |
| --- | --- |
| Full name | FTL × La Vallée Village B2C iPad Parcel Shipping System |
| Project type | Professional project; 0→1 product design and front-end delivery |
| Status | Prototype completed and front end developed, but not deployed at the LVV store |
| Reason it was not adopted | No clear long-term maintenance and operational ownership; the store continued using the legacy desktop system |
| Role | Lead Product Designer |
| Duration | Approximately 2–3 months; exact dates to be confirmed |
| Team | Lead Product Designer, another Product Designer, product/project lead, logistics and business stakeholders, external front-end developer |
| Device | Shared in-store iPad |
| Languages | English, French and Chinese |

## One-line definition

A multilingual iPad shipping system that translates complex cross-border logistics rules into a progressive flow completed collaboratively by store staff and customers.

## Recommended portfolio title

**Staff-assisted shipping at La Vallée Village**

**A multilingual iPad prototype that turns cross-border parcel rules into a guided in-store experience.**

## Context

FTL planned to offer an in-store parcel service near the exit of La Vallée Village, helping international visitors send luxury purchases to hotels or overseas addresses.

FTL already had a legacy desktop ordering system, which I had also contributed to. The new LVV initiative explored a more premium, staff-assisted iPad experience. Staff could guide the process while customers directly entered sensitive information such as delivery addresses.

The challenge was not to resize a desktop form. It was to redefine responsibility, explain logistics trade-offs, prevent data errors and create a clear handoff between order creation, payment, carriers and tracking.

## North star

Enable staff and customers to complete a complex international parcel order together in-store without requiring either person to understand every logistics rule in advance.

## Confirmed research and evidence

- Stakeholder discovery and requirement discussions;
- On-site observation of the LVV circulation, exit and planned store location while the store was under construction;
- Iterative team reviews of the flow, wireframes and high-fidelity prototype;
- Internal flow testing and usability checks;
- Design handoff followed by a completed front-end implementation.

## Validation limits

- No formal store-staff interviews;
- No usability test with real customers;
- No test in a live LVV store environment;
- No post-launch behavior or business data.

## Key product decisions

### 01 — Start with destination

Destination determines available carriers, delivery time, price, insurance and required information. Asking for it first narrows the rest of the experience before customers enter details that may become irrelevant.

### 02 — Use a progressive seven-step flow

The experience is divided into Destination, Weight, Services, Item, Contact, Insurance and Finish. Persistent progress, return, cancel and confirmation controls help users focus on one decision and recover after interruptions.

### 03 — Design a shared-control experience

Full self-service would transfer logistics complexity to customers, while staff-only operation would increase workload and require staff to enter private data. The proposed model lets staff guide the flow and customers enter sensitive information directly.

### 04 — Turn carrier selection into an understandable trade-off

Carrier options expose service, delivery speed and starting price in a consistent structure, supported by labels such as “Lowest price” and “Fastest.”

### 05 — Structure high-risk product information

Brand, description, quantity and optional photos are separated to reduce ambiguous free text and create a clearer record for high-value goods.

### 06 — Keep status and exits visible

The interface continuously shows progress and provides Return, Cancel order and disabled Confirm states. This supports interruption recovery and reduces premature submission.

### 07 — Make the service boundary explicit

The completion screen exposes the order number, amount and next staff-assisted step. Payment, carrier fulfillment and tracking continue outside the product.

## Delivered scope

- End-to-end user flow;
- Wireframes;
- English, French and Chinese interface direction;
- High-fidelity iPad prototype;
- Form, button, selector, stepper and status components;
- Core input and error states;
- Internal reviews and testing;
- Development handoff;
- Front-end implementation.

### Why I created a project-level component system

**Decision**

The seven-step flow repeatedly used progress states, Return / Cancel / Confirm actions, form and selection states, and multilingual controls. Designing each screen independently would allow the same interaction to drift visually and behaviorally. I therefore translated recurring rules into reusable project-level components and states.

**Value in this project**

- Kept complete, current and upcoming states consistent across seven steps;
- Preserved a predictable hierarchy for return, cancel and continue actions;
- Allowed English, French and Chinese content to share flexible structures;
- Gave design review and front-end implementation a shared state language;
- Made rule changes easier to assess across repeated screens.

**Evidence boundary**

In retrospect, this is more accurately a project-level component system than a mature design system validated across products and long-term operations. It supported design handoff and front-end implementation, but there is no evidence that it improved development speed or store performance. The portfolio re-presents the original component logic for clarity; it is not a redesign that shipped at the time.

## Honest project outcome

The product was designed and developed, but it was not put into operation at the LVV store. The portfolio must therefore describe delivery scope and decision quality, not claim user or business impact.

The non-adoption also revealed a product lesson: maintenance responsibility and operational ownership must be treated as product requirements, not post-launch details.

## Current UI issues

- Low-contrast gray text weakens hierarchy;
- Display serif headings do not always support a high-frequency operational interface;
- The stepper is visually dense and unfinished states are too faint;
- Disabled actions do not explain why they are unavailable;
- Inputs, cards and the bottom action bar compete for similar visual weight;
- Shared-device handoff between staff and customer is not explicitly designed;
- The completion handoff needs more specific next-step guidance.

## 2026 presentation strategy

The case study should show both:

1. **Original prototype** — evidence of the actual project and delivered flow.
2. **Focused refinement** — 3–4 selected screens improved later and clearly labeled as a retrospective refinement.

## Recommended web storytelling

1. **Hero** — value proposition, role, status and interactive iPad demo.
2. **Context** — LVV store setting, legacy desktop system and service ambition.
3. **Frame** — actors, shared device, languages, logistics rules and system boundary.
4. **Map** — translate rules into a destination-first seven-step flow.
5. **Decide** — shared control, carrier choice architecture and error prevention.
6. **Prototype** — demonstrate 4–5 critical interactions using real Figma assets.
7. **Validate** — stakeholder discovery, site visit, team review and internal testing, with clear limits.
8. **Deliver** — components, handoff and developed front-end.
9. **Learn** — why deployment readiness includes maintenance and operational ownership.
10. **Next case** — link to the legacy desktop shipping system or another project.

## Claims that must not be used

- Deployed successfully at the LVV store;
- Reduced ordering time from six minutes to 2.5 minutes;
- Reduced address or weight error rate;
- Improved staff satisfaction;
- Validated with real users;
- Any survey percentage or business metric without recoverable evidence.

## Open questions

- Exact start and end dates;
- Precise responsibility of the second Product Designer;
- Stakeholder discovery participants and frequency;
- Internal testing participants, findings and resulting changes;
- Whether screenshots or a recording of the developed front end still exist;
- Whether the maintenance and ownership issue can be stated publicly;
- Whether the legacy desktop system should be a separate case or part of this story.
