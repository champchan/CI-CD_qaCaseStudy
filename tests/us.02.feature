Feature: Filter computers by their names


User-Story.02: As an inventory manager,
  I want to filter computers by their names by entering at least two letters in the search field,
  So that I can easily track similar or exact product lines.


Scenario 1: Successfully filter computers by exact name match
    Given I am on the "Computers" list page
    When I enter "ASCI Blue Pacific" in the "Filter by computer name" search field
    And I click the  "Filter by name" button
    Then I should see a list of computers wih names exactly matching "ASCI Blue"
    And the list should contain "ASCI Blue Pacific" (if present in the database)


Scenario 2: Filter Computers with Partial Name Match 
    Given I am on the "Computers" list page
    When I enter "ASCI" in the "Filter by computer name" search field
    And I click the  "Filter by name" button
    Then I should see a list of computers wih names matching "ASCI Blue"
    And the list should contain "ASCI Blue Pacific", "ASCI Blue Mountain", "ASCI Purple", "ASCI Red", "ASCI Thors Hammer", and "ASCI White" (if present in the database)



Scenario 3: Attempt to search with two letter minimum 
    Given I am on the "Computers" list page
    When I enter "AS" in the "Filter by computer name" search field
    And I click the  "Filter by name" button
    Then I should see a list of computers with names all starting with the letters "AS"
