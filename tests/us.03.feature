Feature: Edit the details of a specfic computer


User-Story.03: As an inventory manager,
  I want to edit the details of a specific computer in the system,
  So that I can keep the information up to date and accurate.


Scenario 1: Successfully edit a computer's details
    Given I am on the "Computers" list page
    When I enter "ASCI Blue Pacific" in the "Filter by computer name" search field
    And I click the  "Filter by name" button
    And I click the  "ASCI Blue Pacific" computer from the filtered list 
    Then I should be on the "Edit computer" page for the "ASCI Blue Pacific"
    When I update the "Computer name" field to "ASCI Blue Pacific 2024"
    And I update the "Introduced date" field to "2023-01-01"
    And I update the "Discontinued date" field to "2029-01-01"
    And I select "ASUS" from the "Company" drop down 
    And I click the "Save this computer" button
    Then I should see a confirmation message "Done! Computer ASCI Blue Pacific 2024 has been updated"
    And the updated details for "ASCI Blue Pacific 2024" should be present in the computer database
    

Scenario 2: Attempt to edit a computer with invalid data
    Given I am on the "Computers" list page
    When I enter "ASCI Blue Pacific" in the "Filter by computer name" search field
    And I click the  "Filter by name" button
    And I click the  "ASCI Blue Pacific" computer from the filtered list 
    Then I should be on the "Edit computer" page for the "ASCI Blue Pacific"
    When I update the "Computer name" field to ""
    And I update the "Introduced date" field to "2029-01-01"
    And I update the "Discontinued date" field to "2023-01-01"
    And I select "ASUS" from the "Company" drop down 
    And I click the "Save this computer" button
    Then I should see a validation error message "Computer name is required" and "Dicontinued date cannot be before introduced date"
    And the computer details shold not be updated in the computer database

