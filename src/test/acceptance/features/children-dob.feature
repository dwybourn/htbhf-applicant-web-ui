Feature: Add your children’s dates of birth
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to provide my children’s dates of birth

  Scenario: Children’s dates of birth is not navigable via the back button if I’ve said I have no children
    Given I have entered my details up to the do you have children three or younger page
    And I have said No to the do you have children three or younger question
    When I am shown the are you pregnant page
    Then The back link points to the Do you have any children who are three years old or younger page

  Scenario: Children’s dates of birth is navigable via the back button if I’ve said I have children
    Given I have entered my details up to the add your childrens dates of birth page
    And I submit the details of my child who is three or younger
    When I am shown the are you pregnant page
    Then The back link points to the Add your children’s dates of birth page

  Scenario: Enter two children's details
    Given I have entered my details up to the add your childrens dates of birth page
    When I enter the details of my two children who are three or younger
    And I click continue
    Then I am shown the are you pregnant page

  Scenario: Enter one child's details without a name, name is optional
    Given I have entered my details up to the add your childrens dates of birth page
    When I enter the details of my child who is three or younger without a name
    And I click continue
    Then I am shown the are you pregnant page