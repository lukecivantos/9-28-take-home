# Pave Take Home

**The Problem:** Restaurant Group of San Francisco may be sued for unfair labor practices. They want to understand all their employees' compensation across their restaurants. Help our client visualize pay differences among their employees.

**Criteria:**

- How well the product solves the customer’s problem
- What tradeoffs you make and why (e.g. speed vs quality)
- Code quality
- Communication of your end product and process

**Deliverables:**

- Loom Video:
- Short README.md giving a high level overview of the project & build steps
- GitHub repository link - instructions to access the data.

---

### What kinds of practices should we look into?

- Gender disparities
- Disparities with leveling
- Bonus vs Salary
- Disparities with employment type
- Disparities in Department
- Geographic Differences
- Name Disparities

### Some notes on the data:

- All the employees are in the US
- Notably the roughly 500 employees are split up across about 100 cities all in the US. I'm going to focus moreso on other disparities.
- We need to resolve an issue where "full time" and "fullTime" don't match

--

### Initial go at what I want to display:

In order to focus on a few items I'm going to shoot at creating:

- Bar chart of gender salary by level with selector for bonus
- Line chart of employment Type with selector for level
- A display of pay by department

With extra time I'll add additional statistics if possible.

---

## Running the Visualization locally:

- Clone the repository
- Open terminal and cd into **9-28-take-home**
- From terminal run `yarn start`
- To build run `yarn build`
