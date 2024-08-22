import {test, expect} from '@playwright/test'



/**
 * Author: JD Montana
 * 
 * Test-Execution HOW-TO:
 * 
 * 1. Open terminal 
 * 
 * 2. Navigate to root directory of this project ie.- ~\.vscode\projects\qa_Engineer_Case_Study
 * 
 * 3. Execute the fallowing command:
 *    - 'npx playwright test --ui' 
 *    - This will open Playwrights U.I. testing tool. You can see the tests live with a visual window of the site while automated tests are executed
 * 
 * 4. Inside Playwrights ui, when you navigate to the laft panel, you'll see all associated tests for the 'qa_Engineer_Case_Study' project
 *    - You will see 3 test-sets displayed with the fallowing names below:   
 *                - US.01 Test-Case.1: Add a computer to the system
 *                - US.02 Test-Case.2: Filter computer database by search-bar
 *                - US.03 Test-Case.3: Edit details of a specific computer
 * 
 * 5. When you hover over these test-sets, you can expand the contents to display the test-cases/scenarios inside each test set
 * 
 * 6. You can either execute the entire test-set or execute each test-case individually 
 *                - Entire Test-set:      Hover over the test-set name, click play button to execute entire test-set
 *                - Individual Test-case: Expand the test set, hover over the specific test-case you want to run the test, and click the play button 
 */




test.beforeEach(async ({page})=>{
    await page.goto('https://computer-database.gatling.io/computers')
})





// ***************************************************************************
//                              USER-STORY.01:                              **
// Add a computer with introduction and discontinuation dates to the system **
// ***************************************************************************

test.describe('US.01: Add a new computer to the system', ()=>{
    
  test.beforeEach(async({page})=>{
    await page.locator('#add').click()
  })

  // US.01 TEST-SCENARIO.1:
  // - Successfully add a new computer with valid introduction and disccontinuation dates
  test('US.01 Test-Scenario-1: Successfully add a new computer with valid introduction and disccontinuation dates', async({page})=>{
    const computerNameInput = page.locator('#name')
    await computerNameInput.fill('Test 1') 
    
    const calenderIntroDate = page.locator('#introduced')
    await calenderIntroDate.fill('2020-01-01')

    const calenderExpireDate = page.locator('#discontinued')
    await calenderExpireDate.fill('2025-01-01')

    const companyDropDownList = page.locator('#company')
    companyDropDownList.selectOption({label:"Apple Inc."})
    
    const addComputerBttn = page.getByRole('button', { name: 'Create this computer' });
    await addComputerBttn.click();

    const successMssg = await page.locator('.alert-message.warning')
    await expect(successMssg).toHaveText("Done ! Computer Test 1 has been created")
        
  })

  
  // US.01 TEST-SCENARIO.2:
  // - Attempt to add a new computer with discontinuation date before introduction date
  test('US.01 Test-Scenario-2: Attempt to add a new computer with discontinuation date before introduction date', async({page})=>{
    const computerNameInput = page.locator('#name')
    await computerNameInput.fill('Test 2') 
    
    const calenderIntroDate = page.locator('#introduced')
    await calenderIntroDate.fill('2025-01-01')

    const calenderExpireDate = page.locator('#discontinued')
    await calenderExpireDate.fill('2020-01-01')

    const companyDropDownList = page.locator('#company')
    companyDropDownList.selectOption({label:"ASUS"})
    
    const addComputerBttn = page.getByRole('button', { name: 'Create this computer' });
    await addComputerBttn.click();

    const errorValidationMssg = page.locator('div.clearfix.error span.help-inline')
    await expect(errorValidationMssg).toHaveText("Discontinued date is before introduction date")

  })

})




// ***************************************************************************
//                              USER-STORY.02:                              **
//           Successfully filter computers by exact name match              **
// ***************************************************************************

test.describe('US.02: Filter computer database by search-bar', ()=>{
    
  // US.02 TEST-SCENARIO.1: 
  // - Successfully filter computers by exact name match
  test('US.02 Test-Scenario-1: Successfully filter computers by exact name match', async({page})=>{
    
    const searchBoxInput = page.locator("#searchbox")
    await searchBoxInput.fill('ASCI Blue Pacific')
    
    const searchBttn = page.locator('#searchsubmit')
    await searchBttn.click()

    const rows = page.locator('tbody tr')
    
    for(let row of await rows.all()){
      const cellValue = await row.locator('td').first().textContent()

      if(cellValue !== null && cellValue.trim() !==""){
        expect(cellValue.trim()).toContain("ASCI Blue Pacific")
      }else{
        throw new Error('The cell value is null or empty')
      }
      
    }

  })


  // US.02 TEST-SCENARIO.2: 
  // - Filter Computers with Partial Name Match
  test('US.02 Test-Scenario-2: Filter Computers with Partial Name Match', async ({ page }) => {

    const searchBoxInput = page.locator("#searchbox");
    await searchBoxInput.fill('ASCI');

    const searchBttn = page.locator('#searchsubmit');
    await searchBttn.click();

    // Locate the parent <li> element that contains the "Next" button
    const nextButtonContainer = page.locator('li.next');

    let hasNextPage = true;

    while (hasNextPage) {
        const rows = page.locator('tbody tr');
        await rows.first().waitFor({ state: 'visible', timeout: 60000 });

        for (let row of await rows.all()) {
            const cellValue = await row.locator('td').first().textContent();

            if (cellValue !== null && cellValue.trim() !== "") {
                expect(cellValue.trim()).toContain("ASCI");
            } else {
                throw new Error('The cell value is null OR incorrect match search');
            }
        }

        // Get the class attribute of the next button's parent <li> element
        const nextButtonClass = await nextButtonContainer.getAttribute('class');

        // Check if the "Next" button's parent <li> element has the "disabled" class
        if (nextButtonClass && nextButtonClass.includes('disabled')) {
            hasNextPage = false; // No more pages to navigate, so exit loop
        } else {
            // Click the next button and wait for the page to load
            await Promise.all([
                nextButtonContainer.locator('a').click({ timeout: 60000 }),
                page.waitForURL('**/computers?p=*', { timeout: 60000 })
            ]);
        }
    }

    console.log('Test passed: All pages containing "ASCI" were successfully iterated. Reached end of list');

  });


  


  // US.02 TEST-SCENARIO.3: 
  // - Attempt to search with two letter minimum
  test('US.02 Test-Scenario.3: Attempt to search with two letter minimum', async ({ page, context }) => { 

    const searchBoxInput = page.locator("#searchbox");
    await searchBoxInput.fill('AS');

    const searchBttn = page.locator('#searchsubmit');
    await searchBttn.click();


    // Locate the parent <li> element that contains the "Next" button
    const nextButtonContainer = page.locator('li.next');

    let hasNextPage = true;

    while (hasNextPage) {
        const rows = page.locator('tbody tr');
        await rows.first().waitFor({ state: 'visible', timeout: 60000 });

        for (let row of await rows.all()) {
            const cellValue = await row.locator('td').first().textContent();

            if (cellValue !== null && cellValue.trim() !== "") {
                const trimmedValue = cellValue.trim();
                const firstTwoChars = trimmedValue.slice(0, 2).toUpperCase();

                // Validate that the first two characters contain "AS"
                if (firstTwoChars === "AS") {
                    expect(firstTwoChars).toBe("AS");
                } else {
                    throw new Error(`The cell value "${trimmedValue}" does not start with "AS".`);
                }
            } else {
                throw new Error('The cell value is null or an incorrect match for the search.');
            }
        }

        // Get the class attribute of the next button's parent <li> element
        const nextButtonClass = await nextButtonContainer.getAttribute('class');

        // Check if the "Next" button's parent <li> element has the "disabled" class
        if (nextButtonClass && nextButtonClass.includes('disabled')) {
            hasNextPage = false; // No more pages to navigate, so exit the loop
        } else {
            // Click the next button and wait for the page to load
            await Promise.all([
                nextButtonContainer.locator('a').click({ timeout: 60000 }),
                page.waitForURL('**/computers?p=*', { timeout: 60000 })
            ]);
        }
    }

    console.log('Test passed: All pages containing "AS" were successfully iterated through. Reached end of computer item list');

  });

})




// ***************************************************************************
//                              USER-STORY.03:                              **
//           Edit details of a specific computer in the system              **
// ***************************************************************************
test.describe('US.03: Edit details of a specific computer', ()=>{

  // US.03 TEST-SCENARIO.1: 
  // - Positive Text-Case: To successfully update/edit a computer's details   /** NOTE: Fail, details not updated to the database after saving **/
  test('US.03 Test-Scenario-1: Successfully update / edit computer details', async({page})=>{

    const searchBoxInput = page.locator("#searchbox")
    await searchBoxInput.fill('ASCI Blue Pacific')
    
    const searchBttn = page.locator('#searchsubmit')
    await searchBttn.click()

    const rows = page.locator('tbody tr')
    let found = false;

    for(let i =0; await rows.count(); i++){
      const cellValue = await rows.nth(i).locator('td').first().textContent()

      if(cellValue !== null && cellValue.trim() === 'ASCI Blue Pacific'){
        found = true;

        await rows.nth(i).locator('td a').click()
        break;
      }
      
    }

    if(!found){
      throw new Error('The computer "ASCI Blue Pacific" was not found in the list')
    }

    //Updating the computer details on edit page

    const computerNameInput = page.locator('#name')
    const introducedDateInput = page.locator('#introduced')
    const discontinuedDateInput = page.locator('#discontinued')
    const companyDropDownList = page.locator('#company')

    const newComputerName = ('ASCI Blue Pacific')
    const newIntroducedDateInput = ('2023-01-01')
    const newDiscontinuedDateInput = ('2029-01-01')
    const newCompanyDropDownList = ('ASUS')

    await computerNameInput.fill(newComputerName)
    await introducedDateInput.fill(newIntroducedDateInput)
    await discontinuedDateInput.fill(newDiscontinuedDateInput)
    await companyDropDownList.selectOption({label: newCompanyDropDownList})

    //Save computer to the computer database
    const saveButton = page.locator('.actions input[type="submit"]')
    await saveButton.click()

    const confirmationMessage = page.locator('.alert-message.warning');
    await expect(confirmationMessage).toContainText(`Done !  Computer ${newComputerName} has been updated`);

    // Validate the updated details are now in the computer database
    
    // Search for the updated computer
    await searchBoxInput.fill(newComputerName)
    await searchBttn.click()

    // Validate the first row in the search results contains the updated details
    const updatedRow = rows.first();

    const updatedComputerName = await updatedRow.locator('td').nth(0).textContent()
    const updatedIntroducedDate = await updatedRow.locator('td').nth(1).textContent()
    const updatedDiscontinuedDate = await updatedRow.locator('td').nth(2).textContent()
    const updatedCompanyName = await updatedRow.locator('td').nth(3).textContent()

    if(updatedComputerName?.trim() !== newComputerName){
      throw new Error(`Computer name does not match. Expected: ${newComputerName}, Found: ${updatedComputerName?.trim()}`)
    }

    if(updatedIntroducedDate?.trim() !== newIntroducedDateInput){
      throw new Error(`Introduced date does not match. Expected: ${newIntroducedDateInput}, Found: ${updatedIntroducedDate?.trim()}`)
    }

    if(updatedDiscontinuedDate?.trim() !== newDiscontinuedDateInput){
      throw new Error(`Discontinued date does not match. Expected: ${newDiscontinuedDateInput}, Found: ${updatedDiscontinuedDate?.trim()}`)
    }

    if(updatedCompanyName?.trim() !== newCompanyDropDownList){
      throw new Error(`Company name does not match. Expected: ${newCompanyDropDownList}, Found: ${updatedCompanyName?.trim()}`)
    }

  }) 


  // US.03 TEST-SCENARIO.3: 
  // - Edit / update a computer with invalid data
  /** NOTE: Fail because validation message is as shown: "Failed to refine type : Predicate isEmpty() did not fail. 
   *        Not a user friendly mssg. The user won't understand the meaning.
   *        AND no validation message regarding the introduction-dates and discontinued-dates */
  test('US.03 Test-Scenario-2: Edit / update a computer with invalid data', async({page})=>{
    
    const searchBoxInput = page.locator("#searchbox")
    await searchBoxInput.fill('ASCI Blue Pacific')
    
    const searchBttn = page.locator('#searchsubmit')
    await searchBttn.click()

    const rows = page.locator('tbody tr')
    let found = false;

    for(let i =0; await rows.count(); i++){
      const cellValue = await rows.nth(i).locator('td').first().textContent()

      if(cellValue !== null && cellValue.trim() === 'ASCI Blue Pacific'){
        found = true;

        await rows.nth(i).locator('td a').click()
        break;
      }
      
    }

    if(!found){
      throw new Error('The computer "ASCI Blue Pacific" was not found in the list')
    }

    //Updating the computer details on edit page

    const computerNameInput = page.locator('#name')
    const introducedDateInput = page.locator('#introduced')
    const discontinuedDateInput = page.locator('#discontinued')
    const companyDropDownList = page.locator('#company')

    const newComputerName = ('ASCI Blue Pacific')
    const newReverseIntroducedDateInput = ('2029-01-01')
    const newReverseDiscontinuedDateInput = ('2023-01-01')
    const newCompanyDropDownList = ('ASUS')

    await computerNameInput.fill(newComputerName)
    await introducedDateInput.fill(newReverseIntroducedDateInput)
    await discontinuedDateInput.fill(newReverseDiscontinuedDateInput)
    await companyDropDownList.selectOption({label: newCompanyDropDownList})

    //Save computer to the computer database
    const saveButton = page.locator('.actions input[type="submit"]')
    await saveButton.click()

    // Error Message Validation
    const errorValidationMssg = page.locator('div.clearfix.error span.help-inline')
    await expect(errorValidationMssg).toHaveText("Discontinued date is before introduction date")


  })


})

