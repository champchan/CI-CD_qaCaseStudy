# QA Engineer Case Study

## Author
**JD Montana**

## Project Documentation
Each User Story in this project is clearly sectioned with comments, from User Story 1 through 3.

- Each User Story contains a test set, which includes specific test cases and scenarios.
- The tests are designed for Chrome's interface to ensure simplicity and clarity.

## Test Execution Guide

To manually execute the automated tests on your local PC using Playwright, you have two options:

### Option 1: Execute Tests with Playwright's User Interface

1. **Open Terminal**  
   Launch the terminal or command prompt on your computer.

2. **Navigate to Project Directory**  
   Use the following path to access the root directory of this project:
   `cd ~\.vscode\projects\qa_Engineer_Case_Study`

3. **Run the Playwright UI**  
   Execute the following command:
   `npx playwright test --ui`  
   This command opens Playwright's UI testing tool, allowing you to see the tests in action through a visual window of the site while the automated tests run.

4. **Explore the Tests**  
   In Playwright's UI, navigate to the left panel to view all associated tests for the `qa_Engineer_Case_Study` project. You will see three test sets, named as follows:
   - **US.01 Test-Case.1**: Add a computer to the system
   - **US.02 Test-Case.2**: Filter computer database by search bar
   - **US.03 Test-Case.3**: Edit details of a specific computer

5. **Expand Test Sets**  
   Hover over these test sets to expand and display the test cases/scenarios within each set.

6. **Execute Tests**  
   - **Run Entire Test Set**: Hover over the test set name and click the play button to execute the entire test set.
   - **Run Individual Test Case**: Expand the test set, hover over the specific test case you want to run, and click the play button.

### Option 2: Execute Tests via Command Line

1. **Open Terminal**  
   Launch the terminal or command prompt on your computer.

2. **Navigate to Project Directory**  
   Use the following path to access the root directory of this project:  
   `cd ~\.vscode\projects\qa_Engineer_Case_Study`

3. **Run Playwright Tests**  
   Execute the following command:  
   `npx playwright test`  
   This will run Playwright's browser testing tool. You can see all tests executed and have the option to open a trace to dive into the details of the test execution.

4. **Explore Test Sets**  
   Hover over the test sets to view their contents or open the trace to see a visual representation of the test execution.

5. **Execute Tests**  
   - **Run Entire Test Set**: Hover over the test set name and click the play button to execute the entire test set.
   - **Run Individual Test Case**: Expand the test set, hover over the specific test case you want to run, and click the play button.
