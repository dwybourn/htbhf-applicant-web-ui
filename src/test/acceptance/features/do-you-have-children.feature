Feature: Do you have any children who are 3 years old or younger?
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to select whether or not I have children who are 3 years old or younger

  Background:
    Given I have entered my details up to the do you have children three or younger page

  Scenario: Yes and No are displayed
    Then Yes and No options are displayed on the do you have children three or younger page

  Scenario: Do not select an option on the do you have children three or younger page
    When I do not select an option
    And I click continue
    Then I am informed that I need to select an option for do you have children three or younger

  Scenario: Select the No option on the do you have children three or younger page
    When I say No to the do you have children three or younger question
    And I click continue
    Then I am shown the are you pregnant page

  Scenario: Select the Yes option and I am asked to enter my children's dates of birth
    When I say Yes to the do you have children three or younger question
    And I click continue
    Then I am shown the add your childrens dates of birth page