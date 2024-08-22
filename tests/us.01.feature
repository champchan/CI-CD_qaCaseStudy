Feature: Add a new computer to the system


User-Story.01: As an inventory manager,
  I want to add a computer to the system, including its introduction and discontinuation dates,
  So that I can track product lifecycles, identify outdated equipment, and make informed decisions about purchasing, upgrades, and support.



Scenario 1: Successfully add a new computer with valid introduction and disccontinuation dates
    Given I am on the "Add a computer" page
    When I enter "Test 1" in the "Computer name" field
    And I enter "2020-01-01" in the "Introduced date" field
    And I enter "2025-01-01" in the discontinued date field
    And I select "Apple Inc." from the "Company" drop down 
    And I click the "Create this computer" button
    Then I should see a confirmation message "Done! Computer Test Computer 1 has been created"
    And the computer "Test 1" should be present in the computer database


Scenario 2: Attempt to add a new computer with discontinuation date before introduction date
    Given I am on the "Add a computer" page
    When I enter "Test 2" in the "Computer name" field
    And I enter "2025-01-01" in the "Introduced date" field
    And I enter "2020-01-01" in the discontinued date field
    And I select "ASUS" from the "Company" drop down 
    And I click the "Create this computer" button
    Then I should see a validation error message "Discontinued date is before introduction date"
    And "Test 2" is not added in the computer database
